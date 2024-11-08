import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin6Fill } from "react-icons/ri";
import AuthContext from "../context/AuthContext";


const DeleteComment = ({ commentId, onDelete }) => {
  const { auth } = useContext(AuthContext);
  const {reloadPage} = useContext(AuthContext)
  const [message, setMessage] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);

  // const reloadPage = () => {
  //   window.location.reload();
  // }

  const handleDelete = async () => {
    // console.log(commentId)
    reloadPage()
    try {
      await axios.delete(`http://localhost:8000/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("Comment deleted:", commentId);
      setMessage("Comment deleted successfully.");
      onDelete(commentId);
    } catch (error) {
      console.error("Error deleting comment:", error.message);
      setMessage("Delete unsuccessful.");
    }
  };

  return (
    <>
      <div>
        <div onClick={handleDelete}  style={{ cursor: "pointer" }} className="">
          <RiDeleteBin6Fill />
        </div>
      </div>
    </>
  );
};

export default DeleteComment;
