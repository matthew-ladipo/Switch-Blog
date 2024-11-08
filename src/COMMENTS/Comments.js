import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi2";
import DeleteComment from "./DeleteComment";
import BackDrop from "../MODULE/BackDrop"; // Fixed typo from BcakDrop to BackDrop
import CommentForm from "./CommentForm";

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [commentList, setCommentList] = useState(comments);

  // Show/close popup handlers
  function show() {
    setShowPopup(true);
  }
  function close() {
    setShowPopup(false);
  }

  // Add new comment handler
  function addCommentHandler() {
    close();
  }

  // Fetch comments on mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/comments/${blogId}`
        );
        setComments(response.data.data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };
    fetchComments();
  }, [blogId]);

  // Handle delete comment
  const handleDeleteComment = (deletedCommentId) => {
    setCommentList(
      comments.filter((comment) => comment._id !== deletedCommentId)
    );
  };

  return (
    <div className="m-4 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Comments</h2>
      <div className="space-y-6">
        {comments?.map((comment, index) => (
          <div
            key={comment._id || index}
            className="bg-gray-50 border border-gray-200 p-4 rounded-md shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <HiOutlineUserCircle className="text-gray-400 text-3xl" />
              <h5 className="text-sm text-gray-600 font-medium">
                {comment.user.name}
              </h5>
            </div>
            <p className="text-sm text-gray-500 mb-3">{comment.content}</p>
            <div className="flex justify-end">
              <DeleteComment
                commentId={comment._id}
                onDelete={handleDeleteComment}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-6 bg-gray-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50"
        onClick={show}
      >
        Add Comment
      </button>

      {/* Show BackDrop and CommentForm when popup is active */}
      {showPopup && <BackDrop onCancel={close} />}
      {showPopup && (
        <CommentForm blogId={blogId} onCancel={close} />
      )}
    </div>
  );
};

export default Comments;
