const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../model/user"); // Adjust path as needed
const post = require("../model/post");

// exports.getGithubProfile = async (req, res) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded._id);

//     if (!user || !user.github_name) {
//       return res.status(404).json({ success: false, message: "GitHub username not found in user profile" });
//     }

//     const githubResponse = await axios.get(`https://api.github.com/users/${user.github_name}`);

//     const profile = {
//       email: user.email,
//       git_profile: {
//         username: githubResponse.data.login,
//         img: githubResponse.data.avatar_url,
//         location: githubResponse.data.location || "Unknown",
//         followers: githubResponse.data.followers,
//         contributions_all: Math.floor(Math.random() * 2000),
//         totalContributions: githubResponse.data.public_repos,
//         accountType:user.accountType,
//         bio:githubResponse.data.bio,
//         stared:githubResponse.
//         contributions: [
//           { repo: "facebook/react" },
//           { repo: "vercel/next.js" },
//           { repo: "tailwindlabs/tailwindcss" },
//         ],
//       }
//     };

//     return res.status(200).json({ success: true, data: profile });
//   } catch (error) {
//     console.error("GitHub Profile Fetch Error:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

async function getTotalContributions(username, githubToken) {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      'https://api.github.com/graphql',
      { query },
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
        },
      }
    );

    const total = response.data.data.user.contributionsCollection.contributionCalendar.totalContributions;
    return total;
  } catch (error) {
    console.error("Error fetching contributions:", error.response?.data || error.message);
    return 0;
  }
}

exports.getGithubProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user || !user.github_name) {
      return res.status(404).json({ success: false, message: "GitHub username not found in user profile" });
    }

    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'DevLance-App'
    };

    const githubResponse = await axios.get(`https://api.github.com/users/${user.github_name}`, { headers });
    const starredResponse = await axios.get(`https://api.github.com/users/${user.github_name}/starred?per_page=1`, { headers });

    let starredCount = 0;
    const linkHeader = starredResponse.headers.link;
    const match = linkHeader?.match(/&page=(\d+)>; rel="last"/);
    starredCount = match ? parseInt(match[1], 10) : starredResponse.data.length;

    const totalContribution = await getTotalContributions(user.github_name, process.env.GITHUB_TOKEN);

    const profile = {
      email: user.email,
      git_profile: {
        username: githubResponse.data.login,
        img: githubResponse.data.avatar_url,
        location: githubResponse.data.location || "Unknown",
        followers: githubResponse.data.followers,
        starred: starredCount,
        totalContributions: githubResponse.data.public_repos,
        contributions_all: totalContribution,
        accountType: user.accountType,
        bio: githubResponse.data.bio,
        contributions: [
          { repo: "facebook/react" },
          { repo: "vercel/next.js" },
          { repo: "tailwindlabs/tailwindcss" },
        ]
      }
    };

    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("GitHub Profile Fetch Error:", error?.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// exports.search = async (req, res) => {
//   const { username } = req.params;

//   try {
//     const response = await axios.get(`https://api.github.com/users/${username}`);
//     res.json({ success: true, data: response.data });
//   } catch (error) {
//     console.error('GitHub API Error:', error.message);
//     res.status(404).json({ success: false, message: 'User not found on GitHub' });
//   }
// }



exports.search = async (req, res) => {
  try {
    const { username } = req.params;

    // GitHub REST: basic info
    const githubResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'DevLance-App'
      }
    });

    // GitHub REST: starred repo count
    const starredResponse = await axios.get(`https://api.github.com/users/${username}/starred?per_page=1`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'User-Agent': 'DevLance-App'
      }
    });

    let starredCount = 0;
    const linkHeader = starredResponse.headers.link;
    if (linkHeader) {
      const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
      starredCount = match ? parseInt(match[1], 10) : 1;
    } else {
      starredCount = starredResponse.data.length;
    }

    // GitHub GraphQL: total contributions
    const totalContribution = await getTotalContributions(username, process.env.GITHUB_TOKEN);

    const profile = {
      git_profile: {
        username: githubResponse.data.login,
        img: githubResponse.data.avatar_url,
        location: githubResponse.data.location || "Unknown",
        followers: githubResponse.data.followers,
        starred: starredCount,
        totalContributions: githubResponse.data.public_repos,
        contributions_all: totalContribution,
        bio: githubResponse.data.bio,
        created_at: githubResponse.data.created_at,
        html_url: githubResponse.data.html_url,
        blog: githubResponse.data.blog,
        company: githubResponse.data.company,
        twitter_username: githubResponse.data.twitter_username
      }
    };

    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    console.error("GitHub Search API Error:", error?.response?.data || error.message);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// const axios = require("axios");
// const User = require("../model/user");


async function getGithubStats(username, token) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "User-Agent": "DevLance-App",
    };

    const userRes = await axios.get(`https://api.github.com/users/${username}`, { headers });

    const starredRes = await axios.get(`https://api.github.com/users/${username}/starred?per_page=1`, { headers });
    const totalContribution = await getTotalContributions(username, process.env.GITHUB_TOKEN);

    let starredCount = 0;
    const linkHeader = starredRes.headers.link;
    const match = linkHeader?.match(/&page=(\d+)>; rel="last"/);
    starredCount = match ? parseInt(match[1], 10) : starredRes.data.length;

    return {
      username: userRes.data.login,
      avatar_url: userRes.data.avatar_url,
      followers: userRes.data.followers,
      location: userRes.data.location || "Unknown",
      bio: userRes.data.bio,
      contributions_all: totalContribution,
      html_url: userRes.data.html_url,
      public_repos: userRes.data.public_repos,
      starred: starredCount,
    };
  } catch (error) {
    console.error(`Error fetching GitHub data for ${username}:`, error.message);
    return null; // skip this user
  }
}

exports.getTopDevs = async (req, res) => {
  try {
    const verifiedDevs = await User.find({ github_verified: true, accountType: "Developer" });

    const githubToken = process.env.GITHUB_TOKEN;
    const statsPromises = verifiedDevs.map(async (user) => {
      if (!user.github_name) return null;
      const stats = await getGithubStats(user.github_name, githubToken);
      if (!stats) return null;

      return {
        name: user.name,
        email: user.email,
        linkedin: user.linkedin,
        ...stats,
      };
    });

    const fullDevs = (await Promise.all(statsPromises)).filter(Boolean);
    fullDevs.sort((a, b) => b.contributions_all - a.contributions_all);

    return res.status(200).json({
      success: true,
      devs: fullDevs.slice(0, 10),
    });
  } catch (error) {
    console.error("Top Devs Fetch Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch top developers" });
  }
};

