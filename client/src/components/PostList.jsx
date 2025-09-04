import React, { useEffect, useState } from "react";
import axios from "axios";

function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://devlance-veiu.onrender.com/api/post/all", { withCredentials: true });
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-8">
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 rounded-full mb-6 shadow-2xl animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
            No posts available
          </h3>
          <p className="text-lg text-gray-500 dark:text-gray-400">Be the first to share something amazing!</p>
        </div>
      ) : (
        posts
          .slice()
          .reverse()
          .map((post, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border border-gray-200/50 dark:border-gray-700/50"
            >
              {/* Animated gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

              {/* Floating particles */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }} />

              <div className="relative p-8">
                {/* Enhanced Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                    <img
                      src={post.owner_img}
                      alt="user"
                      className="relative w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-xl transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-3 border-white dark:border-gray-800 shadow-lg animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {post.owner_username}
                    </h3>
                    <a
                      href={post.owner_linkedin}
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105 group/link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-4 h-4 group-hover/link:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="relative mb-6">
                  <div className="absolute -left-6 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-40" />
                  <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed whitespace-pre-line pl-8 font-medium">
                    {post.blog}
                  </p>
                </div>

                {/* Enhanced Interaction Bar */}
                {/* <div className="flex items-center justify-between pt-6 border-t border-gray-200/60 dark:border-gray-700/60">
                  <div className="flex items-center gap-8">
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 hover:scale-110 group/heart">
                      <svg className="w-5 h-5 group-hover/heart:fill-current group-hover/heart:scale-125 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="font-semibold">Like</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="font-semibold">Comment</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-all duration-300 hover:scale-110">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      <span className="font-semibold">Share</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                    <span className="font-medium">Just now</span>
                  </div>
                </div> */}
              </div>
            </div>
          ))
      )}
    </div>
  );
}

export default PostList;