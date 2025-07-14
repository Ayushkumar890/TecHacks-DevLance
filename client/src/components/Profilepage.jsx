import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  MapPin,
  Users,
  GitBranch,
  Star,
  Activity,
  Github,
  Mail,
  ExternalLink,
  Code,
  BookOpen,
  Trophy
} from "lucide-react";
import UserPosts from "./UserPosts";

function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://techacks-devlance.onrender.com/api/git/getGithubProfile", {
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.data);
          const imgUrl = response.data.data.git_profile.img;
          sessionStorage.setItem("profileUrl", imgUrl);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6 backdrop-blur-sm bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              to="/posts"
              className="flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Posts</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-white font-semibold">{user.git_profile.username}</p>
                <p className="text-gray-300 text-sm">{user.email}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                <img
                  src={user.git_profile.img || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Hero Section */}
          <section className="relative">
            <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-1 shadow-2xl shadow-purple-500/25">
                    <img
                      src={user.git_profile.img || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
                        Hey! {user.git_profile.username}
                      </h1>
                      <p className="text-xl text-gray-300 mb-4">{user.git_profile.bio}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                      <MapPin size={16} className="text-purple-400" />
                      <span className="text-white text-sm">{user.git_profile.location || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                      <Users size={16} className="text-pink-400" />
                      <span className="text-white text-sm">{user.git_profile.followers} followers</span>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
                      <Mail size={16} className="text-indigo-400" />
                      <span className="text-white text-sm">{user.email}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a href={`https://github.com/${user.git_profile.username}`} target="_blank" rel="noreferrer" className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
                      <Github size={18} />
                      <span>View GitHub</span>
                      <ExternalLink size={16} />
                    </a>
                    <a href={`mailto:${user.email}`} className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">
                      <Mail size={18} />
                      <span>Contact</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

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

          {/* Additional Info Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Activity Overview */}
            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                  <Activity className="text-purple-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Activity Overview</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Code className="text-indigo-400" size={20} />
                    <span className="text-gray-300">Code Commits</span>
                  </div>
                  <span className="text-white font-semibold">{user.git_profile.contributions_all}</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="text-green-400" size={20} />
                    <span className="text-gray-300">Open Source</span>
                  </div>
                  <span className="text-white font-semibold">Active</span>
                </div>

                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Star className="text-yellow-400" size={20} />
                    <span className="text-gray-300">Project Stars</span>
                  </div>
                  <span className="text-white font-semibold">{user.git_profile.starred}+</span>
                </div>
              </div>
            </div>

            {/* Skills & Technologies */}
            <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-xl">
                  <Code className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Skills & Tech Stack</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'Python', 'TypeScript', 'Docker', 'AWS', 'MongoDB'].map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm text-white border border-purple-400/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <div>
      <UserPosts/>
      </div>
    </div>
  );
}


// Enhanced Stat Card component
function StatCard({ icon, value, label, gradient, iconBg }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 ${iconBg} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>

      <div>
        <p className="text-3xl font-bold text-white mb-1 group-hover:text-purple-200 transition-colors duration-300">
          {value}
        </p>
        <p className="text-gray-300 text-sm font-medium">{label}</p>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </div>
  );
}

export default ProfilePage;