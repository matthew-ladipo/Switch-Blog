import React, { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import CreatePost from "./CreatePost";
import BackDrop from "../MODULE/BackDrop";
import DeletePost from "./DeletePost";
import { FaCircleUser } from "react-icons/fa6";
import { LiaComment } from "react-icons/lia";
import { FcLike } from "react-icons/fc"; // Like icon
import img2 from "../images/image-about-dark.jpg";

function PostsList({ search }) {
  const { auth } = useContext(AuthContext);
  const [showPopup, setShowpopup] = useState(false);
  const [viewComents, setViewComents] = useState(false);
  const [message, setMessage] = useState("");
  const [blogs, setBlogs] = useState([]);

  const [likes, setLikes] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then((response) => {
        setBlogs(response.data.data.posts.posts);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

  function show() {
    setShowpopup(true);
  }

  function close() {
    setShowpopup(false);
  }

  const handleLike = (postId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: prevLikes[postId] ? prevLikes[postId] + 1 : 1,
    }));
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:8000/api/auth/posts/${postId}`)
      .then((response) => {
        // Filter out the deleted post from the blogs array
        setBlogs(blogs.filter((blog) => blog._id !== postId));
        console.log("Post deleted:", response.data);
      })
      .catch((error) => {
        console.error("There was an error deleting the post!", error);
      });
  };


  const handleDeletePost = (deletedPostId) => {
    setBlogs(blogs.filter((blog) => blog._id !== deletedPostId));
  };

  return (
    <>
      <header className="bg-gray-800 py-6">
        <p className="text-center text-5xl font-bold text-white">
          SWITCH <span className="text-indigo-500">Blog</span>
        </p>
      </header>

      <div className="container mx-auto py-10 px-4">
        <button
          className="fixed top-12 right-10 flex items-center bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full shadow-lg"
          onClick={show}
        >
          <MdOutlineAdd className="mr-2" />
          <span>Create New Post</span>
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 md:px-8">
  {blogs
    ?.filter((blog) => {
      return search.toLowerCase() === ""
        ? blog
        : blog.user.name.toLowerCase().includes(search);
    })
    .map((blog, index) => (
      <div
        key={blog._id || index}
        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300"
      >
        <img
          className="w-full h-[200px] object-cover md:h-[250px]"
          alt="Random image"
          src="https://random-image-pepebigotes.vercel.app/api/random-image"
        />
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <FaCircleUser className="text-gray-400 text-xl sm:text-3xl" />
            <div>
              <p className="text-sm font-semibold">{blog.user.name}</p>
              <p className="text-xs text-gray-500">
                {formatDateTime(blog.createdAt)}
              </p>
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 uppercase">
            {blog.title}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-5">
            {blog.content.slice(0, 100)}...
          </p>
          <div className="flex justify-between items-center">
            <Link
              to={`/post/${blog._id}`}
              className="text-sm text-gray-500 flex items-center"
            >
              <LiaComment className="mr-1" /> Comment
            </Link>
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center text-sm text-gray-500"
                onClick={() => handleLike(blog._id)}
              >
                <FcLike className="text-lg" />
                <span className="ml-1 text-xs sm:text-sm font-medium">
                  {likes[blog._id] || 0}{" "}
                  {likes[blog._id] === 1 ? "Like" : "Likes"}
                </span>
              </button>
              <DeletePost blogId={blog._id} onDelete={handleDeletePost} />
            </div>
          </div>
        </div>
      </div>
    ))}
</div>

      </div>

      {showPopup && <BackDrop onCancel={close} />}
      {showPopup && <CreatePost onCancel={close} />}
    </>
  );
}

export default PostsList;
