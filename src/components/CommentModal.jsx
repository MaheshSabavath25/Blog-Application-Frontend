import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/comment-modal.css";

const CommentModal = ({ postId, onClose }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const loadComments = async () => {
    try {
      const res = await API.get(`/api/comments/post/${postId}`);
      setComments(res.data);
    } catch {
      alert("Failed to load comments");
    }
  };

  const addComment = async () => {
    if (!content.trim()) return;

    try {
      await API.post(`/api/comments/post/${postId}`, { content });
      setContent("");
      loadComments();
    } catch {
      alert("Comment failed");
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="comment-modal">
        <div className="modal-header">
          <h3>Comments</h3>
          <span onClick={onClose}>✖</span>
        </div>

        <div className="comments-list">
          {comments.length === 0 && (
            <p className="empty">No comments yet</p>
          )}

          {comments.map((c) => (
            <div key={c.id} className="comment">
              <b>{c.userName}</b>
              <p>{c.content}</p>
            </div>
          ))}
        </div>

        <div className="comment-input">
          <input
            placeholder="Add a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={addComment}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
