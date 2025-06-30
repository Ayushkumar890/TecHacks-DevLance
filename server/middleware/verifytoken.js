const axios = require("axios");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res) => {
    const token = req.cookies.token;
    // console.log("Token exists:", token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token' });
        }
        res.status(200).json({ success: true, user: decoded });
    });
};

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};



exports.GithubVerify = async (req, res) => {
    try {
        const { username } = req.body;
        const token = req.cookies.token;

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required",
            });
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded._id;

        const githubResponse = await axios.get(`https://api.github.com/users/${username}`);
        if (githubResponse.status !== 200) {
            return res.status(404).json({
                success: false,
                message: "GitHub user not found",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    github_verified: true,
                    github_name: username,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found in database",
            });
        }

        return res.status(200).json({
            success: true,
            message: "GitHub account verified successfully",
            redirect: "/posts",
        });

    } catch (error) {
        console.error("GitHub verify error:", error.message);

        if (error.response?.status === 404) {
            return res.status(404).json({
                success: false,
                message: "GitHub user not found",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error during GitHub verification",
        });
    }
};
