import React from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

function Dashboard() {
  const [reload, setReload] = React.useState(false);
  const handleNewPost = () => setReload(!reload);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
      <PostForm onPostCreated={handleNewPost} />
      <PostList key={reload} />
    </div>
  );
}

export default Dashboard;
