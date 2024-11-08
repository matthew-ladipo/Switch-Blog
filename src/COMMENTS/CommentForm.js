import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { IoMdClose } from "react-icons/io";

const CommentForm = ({ blogId, onCancel }) => {
  const { auth } = useContext(AuthContext);
  const { reloadPage } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/comments/${blogId}`,
        {
          data: {
            content: content,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setMessage("Comment posted successfully!");
      console.log("Comment added:", response.data);
    } catch (error) {
      setMessage("Failed to post comment.");
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <>
      <div className="fixed z-[11] top-16 left-1/2 transform -translate-x-1/2 w-full max-w-md md:max-w-lg lg:max-w-xl p-4 md:p-8 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Create Your Comment</h3>
          <div onClick={onCancel} className="cursor-pointer text-2xl">
          
            <IoMdClose />
          </div>
        </div>
        <form
          onSubmit={handleCommentSubmit}
          className="w-full bg-white p-4 md:p-6 rounded-lg "
        >
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Comment
            </label>
            <textarea
              placeholder="Write your comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:ring focus:border-blue-500"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              onClick={reloadPage}
              className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Post
            </button>
          </div>
          {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        </form>
      </div>
    </>
  );
};

export default CommentForm;
