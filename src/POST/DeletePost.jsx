
import React,{useContext,useState} from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function DeletePost({ blogId, onDelete }) {


const { auth } = useContext(AuthContext);
const [message, setMessage] = useState("");
const {reloadPage} = useContext(AuthContext)

  const handleDelete = async () => {
    // console.log(commentId)
    reloadPage()
    try {
      await axios.delete(`http://localhost:8000/api/auth/posts/${blogId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log("post deleted:", blogId);
      setMessage("post deleted successfully.");
      onDelete(blogId);
    } catch (error) {
      console.error("Error deleting post:", error.message);
      setMessage("Delete unsuccessful.");
    }
  };

  return (
    <button
      className="text-red-500 text-sm"
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

export default DeletePost;

