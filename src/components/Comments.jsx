import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/comments.css";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchComments = async () => {
    try {
      const res = await API.get(`/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async () => {
    if (!content.trim()) return alert("Comment cannot be empty");

    try {
      await API.post(`/api/comments/post/${postId}`, { content });
      setContent("");
      fetchComments();
    } catch {
      alert("Failed to add comment ❌");
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await API.delete(`/api/comments/${commentId}`);
      fetchComments();
    } catch {
      alert("You are not allowed to delete this comment");
    }
  };

  const updateComment = async (commentId) => {
    if (!editContent.trim()) return;

    try {
      await API.put(`/api/comments/${commentId}`, {
        content: editContent,
      });
      setEditId(null);
      setEditContent("");
      fetchComments();
    } catch {
      alert("You are not allowed to edit this comment");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="comments">
      <h3>Comments</h3>

      {/* Add Comment */}
      <div className="comment-add">
        <textarea
          rows="3"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        />
        <button className="btn-primary" onClick={addComment}>
          Add Comment
        </button>
      </div>

      {comments.length === 0 && <p className="empty">No comments yet.</p>}

      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <div className="comment-header">
            <span className="comment-user">{comment.userName}</span>
            <span className="comment-time">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>

          {editId === comment.id ? (
            <>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="comment-actions">
                <button
                  className="btn-primary"
                  onClick={() => updateComment(comment.id)}
                >
                  Save
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setEditId(null)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <p className="comment-content">{comment.content}</p>
          )}

          {comment.owner && editId !== comment.id && (
            <div className="comment-actions">
              <button
                className="btn-secondary"
                onClick={() => {
                  setEditId(comment.id);
                  setEditContent(comment.content);
                }}
              >
                Edit
              </button>
              <button
                className="btn-danger"
                onClick={() => deleteComment(comment.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
