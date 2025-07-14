import { useLocation, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, LogOut, Users, Home } from "lucide-react";
import axios from "axios"
export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [, setLoading] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // Fetch user profile data
    const fetchData = async () => {
      try {
        const response = await axios.get("https://techacks-devlance.onrender.com/api/git/getGithubProfile", {
          withCredentials: true,
        });

        if (response.data.success) {
          setUser(response.data.data);
          const imgUrl = response.data.data.git_profile.img
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
    setLoading(false);
  }, [username]);
  const navItems = [
    {
      label: "Home",
      icon: <Home size={20} />,
      path: "/posts",
    },
    {
      label: "Top Devs",
      icon: <Users size={20} />,
      path: "/topdev",
    },
    {
      label: "Search Dev",
      icon: <Users size={20} />,
      path: "/searchdev",
    },

    {
      label: "Logout",
      icon: <LogOut size={20} />,
      path: "/logout",
      isLogout: true,
      onClick: async () => {
        try {
          await axios.get("https://techacks-devlance.onrender.com/user/logout", {
            withCredentials: true,
          });
          sessionStorage.clear();
          window.location.href = "/login";
        } catch (err) {
          console.error("Logout failed:", err.message);
        }
      },
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button with Glassmorphism */}
      <button
        className="sm:hidden fixed top-3 left-6 z-50 p-3 backdrop-blur-lg border border-white/20 text-white rounded-2xl shadow-xl hover:bg-white/20 transition-all duration-300 hover:scale-110"
        onClick={toggleSidebar}
      >
        <Menu size={24} />
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container with stunning glassmorphism */}
      <aside
        className={`fixed pt-10 md:pt-0 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900  overflow-hidden z-40 top-0 left-0 h-full w-80 transition-all duration-500 ease-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
      >
        {/* Content */}
        <div className="relative h-full px-6 py-8 overflow-y-auto">
          {/* Brand/Logo area with glow effect */}
          <div className="mb-12 pb-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/25" />
              <h2 className="text-xl font-bold bg-gradient-to-r from-black dark:from-white to-gray-700 dark:to-gray-300 bg-clip-text text-transparent">
                DevLance
              </h2>
            </div>
            {user && (
              <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                <p className="text-sm text-gray-300">Welcome back</p>
                <p className="text-white font-medium">{user.git_profile.username || 'client'}</p>
                <span className="text-xs px-2 py-1 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-full text-purple-200 border border-purple-400/20">
                  {user.git_profile.accountType || 'Developer'}
                </span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <ul className="space-y-3">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setIsOpen(false);
                    if (item.isLogout && item.onClick) {
                      item.onClick();
                    }
                  }}
                  className={`group flex items-center p-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${isActive(item.path)
                    ? "bg-gradient-to-r from-indigo-500/30 to-pink-500/30 text-white shadow-lg shadow-purple-500/20 border border-purple-400/30"
                    : item.isLogout
                      ? "text-red-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 hover:text-red-200 hover:shadow-lg hover:shadow-red-500/20 hover:border-red-400/30 border border-transparent"
                      : "text-black dark:text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-lg hover:shadow-white/10 border border-transparent hover:border-white/20"
                    }`}

                >
                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-pink-400 rounded-r-full" />
                  )}

                  {/* Icon with hover glow */}
                  <span className={`w-6 transition-all duration-300 ${isActive(item.path)
                    ? "text-white drop-shadow-lg"
                    : "group-hover:scale-110 group-hover:drop-shadow-lg"
                    }`}>
                    {item.icon}
                  </span>

                  {/* Text with gradient on active */}
                  <span className={`ml-4 font-medium transition-all duration-300 ${isActive(item.path)
                    ? "bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent text-black"
                    : ""
                    }`}>
                    {item.label}
                  </span>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom decorative element */}
          {user && user.git_profile && user.git_profile.accountType === "Developer" ?
            <div className="fixed bottom-0 w-full px-4 py-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="mt-4 flex justify-start">
                {user && user.git_profile && (
                  <Link to="/profile" className="flex items-center space-x-4 text-white">
                    <img
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                      src={user.git_profile.img}
                      alt="User avatar"
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-medium text-sm sm:text-base truncate max-w-[160px] sm:max-w-[230px]">
                        {user.git_profile.username}
                      </span>
                      <span className="text-sm font-bold text-gray-400 truncate max-w-[160px] sm:max-w-[230px]">
                        {user.git_profile.followers} Followers
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
            : null}

        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-1000" />
        </div>
      </aside>
    </>
  );
}