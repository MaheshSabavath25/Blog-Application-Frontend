import { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/my-comments.css";

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const fetchMyComments = async () => {
    try {
      const res = await API.get("/api/comments/me");
      setComments(res.data);
    } catch {
      alert("Failed to load your comments");
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await API.delete(`/api/comments/${commentId}`);
      fetchMyComments();
    } catch {
      alert("Delete failed");
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
      fetchMyComments();
    } catch {
      alert("Update failed");
    }
  };

  useEffect(() => {
    fetchMyComments();
  }, []);

  if (loading) return <p>Loading your comments...</p>;

  return (
    <div className="my-comments">
      <h2>My Comments</h2>

      {comments.length === 0 && (
        <p className="empty">You have not written any comments yet.</p>
      )}

      {comments.map((comment) => (
        <div key={comment.id} className="my-comment-card">
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
            <>
              <p className="comment-text">{comment.content}</p>
              <small className="comment-time">
                {new Date(comment.createdAt).toLocaleString()}
              </small>

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
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyComments;
