import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setMessage("fill all field");
      }
      else {
        const response = await axios.post("https://devlance-veiu.onrender.com/user/postlogin", { email, password }, { withCredentials: true });

        if (response) {
          setMessageType("success")
          navigate(response.data.redirect);
        } else {
          setMessage(response.data.message || "Login failed");
          setMessageColor("text-red-500");
        }
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageColor("text-red-500");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="relative w-full max-w-md">
          {/* Glass morphism card */}
          <div className="backdrop-blur-lg bg-white/80 border border-white/20 shadow-2xl rounded-2xl p-8 transform transition-all duration-500 hover:scale-[1.02]">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-600 text-sm">
                Sign in to DevLance - Where elite developers connect
              </p>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    placeholder="name@company.com"
                    className={`w-full pl-12 pr-4 py-3 bg-gray-50/50 border rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent ${focusedField === 'email'
                      ? 'border-blue-300 focus:ring-blue-500/20 bg-white'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    placeholder="Enter your password"
                    className={`w-full pl-12 pr-12 py-3 bg-gray-50/50 border rounded-xl text-gray-700 placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:border-transparent ${focusedField === 'password'
                      ? 'border-blue-300 focus:ring-blue-500/20 bg-white'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`flex items-center space-x-2 p-3 rounded-xl text-sm font-medium transition-all duration-300 ${messageType === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r mt-6 from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
              style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
            >
              <div className="flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </div>


          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-200 hover:underline">
                <Link to="/register">

                  Create Account
                </Link>
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}