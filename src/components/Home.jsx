import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { LiaComment } from "react-icons/lia";
import { FcLike } from "react-icons/fc";
import { AiTwotoneDelete } from "react-icons/ai";

const Home = ({ search }) => {
  const { auth } = useContext(AuthContext);
  const [viewComents, setViewComents] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts/")
      .then((response) => {
        setBlogs(response.data.data.posts.posts);
      })
      .catch((error) => {
        console.error("There was an error fetching the posts!", error);
      });
  }, []);

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

  return (
    <>
     
      <header className="bg-gray-600 py-8 text-center">
        <h1 className="text-white text-5xl font-bold">
          SWITCH <span className="text-indigo-400">Blog</span>
        </h1>
      </header>
      
      <div className="container flex justify-center items-center mx-auto py-10 px-4">
        <div className="space-y-10 ">
          {blogs?.map((blog, index) => (
            <div
              key={blog._id || index}
              className="border flex  flex-col md:flex-row border-gray-300 rounded-lg overflow-hidden shadow-lg"
            >
            
              <div className="flex-shrink-0">
                <img
                  className="w-full  md:w-64 h-48 md:h-auto object-cover"
                  alt="Random"
                  src="https://random-image-pepebigotes.vercel.app/api/random-image"
                />
              </div>

           
              <div className="p-5 flex flex-col justify-between">
                <div>
               
                  <div className="flex items-center gap-3 mb-3">
                    <FaCircleUser className="text-gray-400 text-2xl" />
                    <div>
                      <p className="text-sm font-semibold">{blog.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {formatDateTime(blog.createdAt)}
                      </p>
                    </div>
                  </div>

                 
                  <h3 className="text-lg md:text-xl font-bold mb-2 uppercase">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-5">
                    {blog.content.slice(0, 100)}...
                  </p>
                </div>

           
                <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                  <Link
                    to={`/post/${blog._id}`}
                    className="text-sm font-semibold text-gray-600 hover:text-indigo-500"
                  >
                    Comment
                  </Link>
                  <div className="flex items-center gap-5">
                    <button
                      className="flex items-center text-sm text-gray-500"
                      onClick={() => handleLike(blog._id)}
                    >
                      <FcLike className="text-lg" />
                      <span className="ml-1 text-xs">
                        {likes[blog._id] || 0}{" "}
                        {likes[blog._id] === 1 ? "Like" : "Likes"}
                      </span>
                    </button>
                    <button>
                      <AiTwotoneDelete className="text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

  
      </div>{" "}
      <div className="text-center my-10">
        <Link to="/postlist">
          <button className="relative px-10 py-4 bg-gray-700 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-out">
            View All Posts
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
