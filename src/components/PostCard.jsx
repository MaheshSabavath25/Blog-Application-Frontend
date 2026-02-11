import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CommentModal from "./CommentModal";

import { FaHeart, FaRegHeart, FaRegComment, FaBookmark } from "react-icons/fa";
import API from "../api/api";
import "../styles/post-card.css";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(post.liked || false);
  const [likes, setLikes] = useState(post.likeCount || 0);
  const [showComments, setShowComments] = useState(false);

  const [animate, setAnimate] = useState(false);

  const toggleLike = async () => {
    try {
      await API.post(`/api/likes/${post.id}`);
      setLiked(!liked);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    } catch {
      alert("Like failed");
    }
  };

  return (
    <div className="post-card">
      {/* 👤 HEADER */}
      <div className="post-header">
        <span className="username">{post.user?.name || "user"}</span>
        <span className="dots">⋮</span>
      </div>

      {/* 🖼 IMAGE */}
      {post.imageName && (
        <div className="post-image-wrapper">
          <img
            src={`http://localhost:8080/api/posts/image/${post.imageName}`}
            alt="post"
          />
        </div>
      )}

      {/* ❤️ 💬 🔖 ACTIONS */}
      <div className="post-actions">
        <div className="left-actions">
          <span
            className={`like-icon ${animate ? "pop" : ""}`}
            onClick={toggleLike}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </span>

          <span onClick={() => setShowComments(true)}>
  <FaRegComment />
</span>

        </div>

        <FaBookmark className="bookmark" />
      </div>

      {/* ❤️ COUNT */}
      <div className="likes-count">{likes} likes</div>

      {/* 📝 CONTENT */}
      <div className="post-text">
        <b>{post.title}</b>
        <p>
          {post.content.length > 100
            ? post.content.substring(0, 100) + "..."
            : post.content}
        </p>
      </div>
      {showComments && (
  <CommentModal
    postId={post.id}
    onClose={() => setShowComments(false)}
  />
)}


      {/* 👀 VIEW */}
      <button
        className="view-btn"
        onClick={() => navigate(`/posts/${post.id}`)}
      >
        View Post
      </button>
    </div>
  );
};

export default PostCard;
