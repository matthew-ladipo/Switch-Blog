import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { IoMdClose } from "react-icons/io";

const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const { auth } = useContext(AuthContext);

  const reloadPage = () => {
    window.location.reload();
  };

  const createPost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/posts/",
        {
          data: {
            title: title,
            content: content,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setMessage("Post created successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("There was an error creating the post!", error);
      setMessage("Failed to create post.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createPost();
    reloadPage();
  };

  return (
    <div className="fixed z-[11] top-16 left-1/2 transform -translate-x-1/2 w-full max-w-xl md:max-w-3xl lg:max-w-4xl p-4 md:p-8 shadow-lg rounded-md bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Create Your POST</h3>
        <div onClick={props.onCancel} className="cursor-pointer text-2xl">
          <IoMdClose />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white p-4 md:p-6 rounded-lg "
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter the title"
            id="title"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your content"
            id="content"
            className="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring focus:border-blue-500"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Post
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
};

export default CreatePost;
