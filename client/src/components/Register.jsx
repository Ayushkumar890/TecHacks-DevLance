import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"
export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [accountType, setAccountType] = useState("Developer");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setMessage("Passwords do not match");
      setMessageColor("text-red-500");
      return;
    }

    if (password1.length < 8) {
      setMessage("Password must be at least 8 characters");
      setMessageColor("text-red-500");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/user/postregister",
        {
          email,
          linkedin,
          password1,
          password2,
          accountType,
        },
        {
          withCredentials: true, // needed if your server sets cookies
        }
      );

      setMessage("Registration successful! Please check your email.");
      setMessageColor("text-green-500");

      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Something went wrong. Try again.";
      setMessage(errMsg);
      setMessageColor("text-red-500");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>
      <div className="flex justify-center items-center mt-10 mb-10 ">
        <form className="bg-white shadow-md rounded-lg p-8 max-w-md w-full" onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="text-2xl font-bold text-center mb-2">Register to Devlance</p>
            <span className="text-gray-600 text-sm block text-center">
              Get started with DevLance, an elite developer's freelance platform for the elite ones.
            </span>
          </div>

          {/* Email */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700"
              type="email"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* LinkedIn URL */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">LinkedIn URL</label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700"
              type="text"
              placeholder="LinkedIn URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">Password (min. 8 characters)</label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700"
              type="password"
              placeholder="Password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
            <input
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700"
              type="password"
              placeholder="Confirm Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>

          {/* Account Type */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">Account Type</label>
            <select
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
            >
              <option value="Developer">Developer</option>
              <option value="Client">Client</option>
            </select>
          </div>

          {/* Message */}
          {message && (
            <p className={`text-sm mt-2 text-center font-medium ${messageColor}`}>{message}</p>
          )}

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-900"
            >
              Register
            </button>
          </div>

          {/* Login Redirect */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
