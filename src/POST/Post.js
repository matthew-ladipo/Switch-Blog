import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import img2 from "../images/image-about-dark.jpg";
import Comments from "../COMMENTS/Comments"; // Assuming Comments component exists

const PostPage = () => {
  const { blogId } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${blogId}`)
      .then((response) => {
        setPost(response.data.data.post);
      })
      .catch((error) => {
        console.error("Error fetching the post data:", error);
      });
  }, [blogId]);

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  if (!post) {
    return <p>Loading post...</p>;
  }

  return (
    <>
      <div className="bg-gray-100 py-10">
        <p className="text-center text-4xl font-semibold text-gray-800 mb-10">
          SWITCH <span className="text-indigo-500">Blog</span>
        </p>
        <div className="flex justify-center items-center">
          <div className="bg-white  rounded-lg p-10 w-full max-w-4xl">
            <div className="flex items-center gap-4 mb-5">
              <FaCircleUser className="text-3xl text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">
                  {formatDateTime(post.createdAt)}
                </p>
                <p className="text-sm text-gray-500">{post.user.name}</p>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-700 mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-5">
              {post.content}
            </p>

            <img
              className="w-full h-96 object-cover rounded-lg mb-10"
              src="https://random-image-pepebigotes.vercel.app/api/random-image"
              alt="Post"
            />

            <div className="flex items-center gap-3 mb-5">
              <button
                className={`flex items-center text-lg ${isLiked ? "text-red-500" : "text-gray-500"
                  }`}
                onClick={handleLike}
              >
                <FcLike className="text-xl" />
                <span className="ml-2">
                  {likes} {likes === 1 ? "Like" : "Likes"}
                </span>
              </button>
            </div>

            <div className="border-t pt-10">
              <h3 className="text-xl font-semibold text-gray-700 mb-5">
                Comments
              </h3>
              <div className="bg-gray-50 border border-gray-200 p-5 rounded-md shadow-sm">
                <Comments blogId={blogId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
