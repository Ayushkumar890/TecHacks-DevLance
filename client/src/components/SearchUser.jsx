import React, { useState } from "react";
import axios from "axios";
import { 
  Search, 
  User, 
  MapPin, 
  Users, 
  BookOpen, 
  ExternalLink, 
  Github,
  AlertCircle,
  Loader2,
  Calendar,
  Activity,
  GitBranch,
  Trophy
} from "lucide-react";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [user, setUserData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!username.trim()) {
      setErrorMsg("Please enter a username");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      const res = await axios.get(`http://localhost:5000/api/git/search/${username}`);
      setUserData(res.data.data);
    } catch (error) {
      setUserData(null);
      setErrorMsg("GitHub user not found. Please check the username and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 shadow-lg shadow-purple-500/25">
            <Github className="text-white" size={32} />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            GitHub User Search
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover and explore GitHub profiles with detailed insights and statistics
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-gray-400" size={20} />
              </div>
              <input
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                type="text"
                placeholder="Enter GitHub username (e.g., octocat)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white font-semibold hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Search size={20} />
              )}
              <span>{loading ? "Searching..." : "Search"}</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-2xl p-4 mb-8 animate-fade-in">
            <div className="flex items-center space-x-3">
              <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
              <p className="text-red-300">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* User Profile Results */}
        {user && (
          <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl animate-fade-in">
            {/* Profile Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8 mb-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-1 shadow-2xl shadow-purple-500/25">
                  <img
                    src={user.git_profile.img}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {user.git_profile.username}
                </h2>
                <p className="text-xl text-purple-300 mb-4">@{user.git_profile.username}</p>
                
                {user.git_profile.bio && (
                  <p className="text-gray-300 mb-4 max-w-2xl">{user.git_profile.bio}</p>
                )}

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {user.git_profile.location && (
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                      <MapPin size={16} className="text-purple-400" />
                      <span className="text-white text-sm">{user.git_profile.location}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <Users size={16} className="text-pink-400" />
                    <span className="text-white text-sm">{user.git_profile.followers} followers</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                    <BookOpen size={16} className="text-indigo-400" />
                    <span className="text-white text-sm">{user.git_profile.public_repos} repos</span>
                  </div>
                  {user.git_profile.created_at && (
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                      <Calendar size={16} className="text-green-400" />
                      <span className="text-white text-sm">
                        Joined {new Date(user.git_profile.created_at).getFullYear()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <a
                  href={user.git_profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105"
                >
                  <Github size={18} />
                  <span>View GitHub Profile</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Stats Grid */}
             <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<Activity className="text-green-400" size={24} />}
              value={user.git_profile.contributions_all}
              label="Total Contributions last year"
              gradient="from-green-500/20 to-emerald-500/20"
              iconBg="bg-green-500/20"
            />
            <StatCard
              icon={<GitBranch className="text-blue-400" size={24} />}
              value={user.git_profile.totalContributions}
              label="Repositories"
              gradient="from-blue-500/20 to-cyan-500/20"
              iconBg="bg-blue-500/20"
            />
            <StatCard
              icon={<Users className="text-purple-400" size={24} />}
              value={user.git_profile.followers}
              label="Followers"
              gradient="from-purple-500/20 to-pink-500/20"
              iconBg="bg-purple-500/20"
            />
            {user && user.git_profile.contributions_all <= 100 &&

              <StatCard
                icon={<Trophy className="text-yellow-400" size={24} />}
                value="Basic"
                label="Developer Level"
                gradient="from-yellow-500/20 to-orange-500/20"
                iconBg="bg-yellow-500/20"
              />
            }
            {user && user.git_profile.contributions_all > 100 && user.git_profile.contributions_all <= 300 &&

              <StatCard
                icon={<Trophy className="text-yellow-400" size={24} />}
                value="Medium"
                label="Developer Level"
                gradient="from-yellow-500/20 to-orange-500/20"
                iconBg="bg-yellow-500/20"
              />
            }
            {user && user.git_profile.contributions_all > 300 &&

              <StatCard
                icon={<Trophy className="text-yellow-400" size={24} />}
                value="Pro"
                label="Developer Level"
                gradient="from-yellow-500/20 to-orange-500/20"
                iconBg="bg-yellow-500/20"
              />
            }
          </section>

            {/* Additional Info */}
            {(user.git_profile.company || user.git_profile.blog || user.git_profile.twitter_username) && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.git_profile.company && (
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <User className="text-purple-400" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Company</p>
                        <p className="text-white font-medium">{user.git_profile.company}</p>
                      </div>
                    </div>
                  )}
                  {user.git_profile.blog && (
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <ExternalLink className="text-indigo-400" size={20} />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Website</p>
                        <a 
                          href={user.git_profile.blog} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-purple-300 transition-colors"
                        >
                          {user.git_profile.blog}
                        </a>
                      </div>
                    </div>
                  )}
                  {user.git_profile.twitter_username && (
                    <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="p-2 bg-pink-500/20 rounded-lg">
                        <span className="text-pink-400 font-bold">@</span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Twitter</p>
                        <p className="text-white font-medium">@{user.git_profile.twitter_username}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

// Stat Card Component
function StatCard({ icon, value, label, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </div>
      
      <div>
        <p className="text-3xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors duration-300">
          {value}
        </p>
        <p className="text-gray-300 text-sm font-medium">{label}</p>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
}

export default SearchUser;