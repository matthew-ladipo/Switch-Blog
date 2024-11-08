// PostsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function UsersPosts() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the post details by ID
    axios
      .get("http://localhost:8000/api/auth/posts")
      .then((response) => {
        setPost(response.data); // Assuming API response structure
        console.log(response);
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching the post data:", error);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Posts</h1>
      {post.length === 0 ? (
        <p className="text-gray-500">No posts available</p>
      ) : (
        <div className="space-y-4">
          {post.map((post) => (
            <div key={post.id} className="p-4 border border-gray-300 rounded-lg shadow">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-gray-700">{post.body}</p>
              <p className="text-sm text-gray-500">Posted by: {post.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UsersPosts;
