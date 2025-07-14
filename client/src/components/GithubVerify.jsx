import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function GithubVerify() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      return setError("Please enter a GitHub username.");
    }

    try {
      const res = await axios.post('https://techacks-devlance.onrender.com/api/auth/githubverify', { username }, { withCredentials: true });
      if (res.data.success) {
        navigate(res.data.redirect);
      }
      setError(res.data.message);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div
      style={{ backgroundImage: "url('/assets/images/bg2.jpg')" }}
      className="h-screen bg-cover bg-center flex items-center justify-center"
    >
      <div className="bg-white bg-opacity-90 shadow-md rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Verify GitHub Username
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded"
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
