import React, { useEffect, useState } from "react";
import { Github, Users, Star, Code, ExternalLink, Sparkles } from "lucide-react";
import axios from "axios"
const TopDevsPage = () => {
  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Your original axios call - replace this mock with your actual API call
    axios.get("http://localhost:5000/api/git/topdevs", { withCredentials: true })
      .then(res => {
        setDevs(res.data.devs);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading top devs:", err);
        setLoading(false);
      });

    // Mock data for demonstration - replace with your actual API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-blue-400 border-b-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Elite Developers
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover the most talented developers shaping the future of technology
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {devs.map((dev, index) => (
            <div
              key={index}
              className="group relative bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl p-5 hover:bg-opacity-20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Profile Section */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                    <img
                      src={dev.avatar_url}
                      alt={dev.username}
                      className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{dev.name}</h3>
                    <div className="flex items-center gap-2">
                      <Github className="w-3 h-3 text-gray-400" />
                      <span className="text-purple-300 font-medium text-sm">@{dev.username}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-black bg-opacity-20 rounded-xl p-3 text-center">
                    <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{dev.followers}</div>
                    <div className="text-xs text-gray-400">Followers</div>
                  </div>
                  <div className="bg-black bg-opacity-20 rounded-xl p-3 text-center">
                    <Code className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{dev.public_repos}</div>
                    <div className="text-xs text-gray-400">Repos</div>
                  </div>
                  <div className="bg-black bg-opacity-20 rounded-xl p-3 text-center">
                    <Github className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{dev.contributions_all}</div>
                    <div className="text-xs text-gray-400">Contributions</div>
                  </div>
                  <div className="bg-black bg-opacity-20 rounded-xl p-3 text-center">
                    <Star className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{dev.starred}</div>
                    <div className="text-xs text-gray-400">Stars</div>
                  </div>
                </div>

                {/* Stars Section */}
                {/* <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                    <span className="text-lg font-bold text-white">{dev.starred}</span>
                    <span className="text-xs text-gray-300">Stars</span>
                  </div>
                </div> */}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={dev.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 group/btn text-sm"
                  >
                    <Github className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" />
                    GitHub
                  </a>
                  <a
                    href={dev.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-1 group/btn text-sm"
                  >
                    <ExternalLink className="w-3 h-3 group-hover/btn:rotate-12 transition-transform" />
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span>Powered by GitHub API</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  );
};

export default TopDevsPage;