import React, { useState } from "react";
import axios from "axios";

function PostForm({ onPostCreated }) {
    const [blog, setBlog] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const profileUrl = sessionStorage.getItem("profileUrl");
            const res = await axios.post(
                "https://techacks-devlance.onrender.com/api/post/create",
                { blog ,profileUrl},
                { withCredentials: true }
            );
            if (res.data.success) {
                onPostCreated();
                setBlog("");
            }
        } catch (error) {
            console.error("Error creating post:", error.response?.data?.message);
        }
    };

    return (
        <div className="relative mb-10">
            {/* Background gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl -z-10" />

            <form
                onSubmit={handleSubmit}
                className="relative p-8 rounded-3xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-60" />
                <div className="absolute top-8 right-8 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        <svg className="w-7 h-7 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            Share your thoughts
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                            Connect with the developer community
                        </p>
                    </div>
                </div>

                {/* Input Area */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-sm" />
                    <textarea
                        value={blog}
                        onChange={(e) => setBlog(e.target.value)}
                        className="relative w-full p-6 border-2 border-gray-200 dark:border-gray-600 rounded-2xl resize-none focus:outline-none focus:border-transparent focus:ring-4 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 dark:bg-gray-700/50 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-inner"
                        rows={5}
                        placeholder="What's on your mind? Share your latest project, insights, or just say hello to the community..."
                        required
                    />

                    {/* Character counter */}
                    <div className="absolute bottom-4 right-6 flex items-center gap-2">
                        <div className={`text-xs font-medium px-2 py-1 rounded-full ${blog.length > 400
                                ? 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30'
                                : 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-700'
                            }`}>
                            {blog.length}/500
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 transform disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!blog.trim()}
                    >
                        {/* Button shine effect */}
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />

                        {/* Button content */}
                        <span className="relative flex items-center gap-3">
                            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            <span className="text-lg">Publish Post</span>
                        </span>

                        {/* Button glow */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 blur transition-opacity duration-300" />
                    </button>
                </div>

                {/* Decorative bottom elements */}
                <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50" />
                <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-50" />
            </form>
        </div>
    );
}

export default PostForm;