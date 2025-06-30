import React, { useEffect, useState } from "react";
import { Edit3, Trash2, X, Check, ExternalLink, Calendar, User } from 'lucide-react';
import axios from "axios";
function UserPosts() {
    const [posts, setPosts] = useState([]);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(null);

    // Simulated API calls - replace with your axios calls
    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        
        setDeleting(postId);
        try {
            // Replace with your axios call:
            await axios.delete(`http://localhost:5000/api/post/delete/${postId}`, {
                withCredentials: true,
            });
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPosts(posts.filter(post => post._id !== postId));
        } catch (err) {
            console.error("Error deleting post:", err.message);
        } finally {
            setDeleting(null);
        }
    };

    const handleEdit = async (postId) => {
        try {
            // Replace with your axios call:
            await axios.put(
                `http://localhost:5000/api/post/edit/${postId}`,
                { blog: editedContent },
                { withCredentials: true }
            );
            
            // Simulate API call
            setPosts(posts.map(post => 
                post._id === postId 
                    ? { ...post, blog: editedContent }
                    : post
            ));
            
            setEditingPostId(null);
            setEditedContent("");
        } catch (err) {
            console.error("Error editing post:", err.message);
        }
    };

    const fetchPosts = async () => {
        try {
            setLoading(true);
            // Replace with your axios call:
            const res = await axios.get("http://localhost:5000/api/post/userpost", { 
                withCredentials: true 
            });
            setPosts(res.data.posts);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error("Error fetching posts:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (post) => {
        setEditingPostId(post._id);
        setEditedContent(post.blog);
    };

    const cancelEdit = () => {
        setEditingPostId(null);
        setEditedContent("");
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 dark:bg-transparent ">
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
                <div className="space-y-6">
                    {posts
                        .slice()
                        .reverse()
                        .map((post, idx) => (
                            <div key={post._id || idx} className="group">
                                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden">
                                    {/* Gradient accent bar */}
                                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
                                    
                                    {/* Header with user info */}
                                    <div className="px-8 pt-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img
                                                    src={post.owner_img}
                                                    alt={post.owner_username}
                                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                                                />
                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                    <User size={16} className="text-gray-500" />
                                                    {post.owner_username}
                                                </h3>
                                                {post.owner_linkedin && (
                                                    <a
                                                        href={post.owner_linkedin}
                                                        className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <ExternalLink size={12} />
                                                        LinkedIn Profile
                                                    </a>
                                                )}
                                            </div>
                                            {post.createdAt && (
                                                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                                    <Calendar size={14} />
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Content area */}
                                    <div className="px-8 py-6">
                                        {editingPostId === post._id ? (
                                            // Edit mode
                                            <div className="space-y-4">
                                                <div className="relative">
                                                    <textarea
                                                        className="w-full p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 resize-none bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                                                        rows={6}
                                                        value={editedContent}
                                                        onChange={(e) => setEditedContent(e.target.value)}
                                                        placeholder="Write your thoughts..."
                                                        autoFocus
                                                    />
                                                    <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                                        {editedContent.length} characters
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center justify-between">
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleEdit(post._id)}
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all duration-200 font-medium shadow-sm"
                                                        >
                                                            <Check size={16} />
                                                            Save Changes
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-800 transition-all duration-200 font-medium"
                                                        >
                                                            <X size={16} />
                                                            Cancel
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        ) : (
                                            // View mode
                                            <div className="space-y-4">
                                                {/* Post content */}
                                                <div className="prose prose-gray dark:prose-invert max-w-none">
                                                    <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed whitespace-pre-line font-normal mb-0">
                                                        {post.blog}
                                                    </p>
                                                </div>
                                                
                                                {/* Action buttons */}
                                                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <button
                                                        onClick={() => startEdit(post)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
                                                    >
                                                        <Edit3 size={14} />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(post._id)}
                                                        disabled={deleting === post._id}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 font-medium disabled:opacity-50"
                                                    >
                                                        {deleting === post._id ? (
                                                            <div className="animate-spin rounded-full h-3 w-3 border border-red-600 border-t-transparent" />
                                                        ) : (
                                                            <Trash2 size={14} />
                                                        )}
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default UserPosts;