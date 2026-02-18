
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaSmile,
  FaTrash,
  FaEdit
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import API from "../api/api";
import "../styles/PostDetails.css";

const PostDetails = () => {
  const { postId } = useParams();
  const commentsRef = useRef(null);

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [showEmojiFor, setShowEmojiFor] = useState(null);
  const navigate = useNavigate();

  const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;

  return new Date(date).toLocaleDateString();
};




  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  const loadPost = async () => {
    const res = await API.get(`/api/posts/${postId}`);
    setPost({
      ...res.data,
      likeCount: res.data.likeCount ?? 0,
      liked: Boolean(res.data.liked)
    });
  };

  const loadComments = async () => {
    const res = await API.get(`/api/comments/post/${postId}`);
    setComments(res.data);
  };

  const togglePostLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to like");

    const res = await API.post(`/api/posts/like/${postId}`);
    const liked = res.data;

    setPost(prev => ({
      ...prev,
      liked,
      likeCount: liked
        ? prev.likeCount + 1
        : Math.max(prev.likeCount - 1, 0)
    }));
  };

  const toggleCommentLike = async (id) => {
    await API.post(`/api/comments/like/${id}`);
    loadComments();
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    await API.post(`/api/comments/post/${postId}`, { content: newComment });
    setNewComment("");
    setShowEmojiFor(null);
    loadComments();
  };

  const addReply = async (id) => {
    if (!replyText.trim()) return;
    await API.post(`/api/comments/reply/${id}`, { content: replyText });
    setReplyText("");
    setReplyTo(null);
    setShowEmojiFor(null);
    loadComments();
  };

  const updateComment = async (id) => {
    await API.put(`/api/comments/${id}`, { content: editText });
    setEditingId(null);
    setEditText("");
    loadComments();
  };

  const deleteComment = async (id) => {
    await API.delete(`/api/comments/${id}`);
    loadComments();
  };

  const onEmojiClick = (emojiData) => {
    showEmojiFor === "comment"
      ? setNewComment(p => p + emojiData.emoji)
      : setReplyText(p => p + emojiData.emoji);
  };

  const renderComment = (c, isReply = false) => (
    <div key={c.id} className={`comment ${isReply ? "reply" : ""}`}>
      <div className="comment-header">
  <div className="comment-user">
    <b>{c.userName}</b>
    <span className="comment-time">
      {timeAgo(c.createdAt)}
    </span>
  </div>


        {c.owner && (
          <div className="hover-actions">
            <FaEdit onClick={() => { setEditingId(c.id); setEditText(c.content); }} />
            <FaTrash onClick={() => deleteComment(c.id)} />
          </div>
        )}
      </div>

      {editingId === c.id ? (
        <div className="edit-box">
          <input value={editText} onChange={e => setEditText(e.target.value)} />
          <button onClick={() => updateComment(c.id)}>Save</button>
        </div>
      ) : (
        <p>{c.content}</p>
      )}

      <div className="comment-actions">
        <span onClick={() => toggleCommentLike(c.id)}>
          {c.liked ? <FaHeart className="liked" /> : <FaRegHeart />} {c.likes}
        </span>

        {!isReply && (
          <span onClick={() => setReplyTo(p => (p === c.id ? null : c.id))}>
            Reply
          </span>
        )}
      </div>

      {replyTo === c.id && (
        <div className="reply-box">
          <FaSmile onClick={() => setShowEmojiFor(p => (p === c.id ? null : c.id))} />
          <input
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={() => addReply(c.id)}>Post</button>

          {showEmojiFor === c.id && (
            <div className="emoji-wrapper reply-emoji">
              <EmojiPicker onEmojiClick={onEmojiClick} height={260} />
            </div>
          )}
        </div>
      )}

      {c.replies?.map(r => renderComment(r, true))}
    </div>
  );

  if (!post) return null;

  return (
    <div className="post-page">
      <div className="post-card">

        <div className="image-wrapper">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          {post.videoUrl ? (
  <video
    src={post.videoUrl}
    controls
    style={{ width: "100%" }}
  />
) : post.imageName ? (
  <img
    src={post.imageName}
    alt="post"
  />
) : null}

        </div>

        <div className="post-actions">
          <span onClick={togglePostLike}>
            {post.liked ? <FaHeart className="liked" /> : <FaRegHeart />} {post.likeCount}
          </span>
          <span onClick={() => commentsRef.current.scrollIntoView({ behavior: "smooth" })}>
            <FaComment /> {comments.length}
          </span>
        </div>

        <h4>{post.title}</h4>

        <p className="post-content">
  {post.content.split(" ").map((word, i) =>
    word.startsWith("#") ? (
      <span
  key={i}
  className="hashtag"
  onClick={() => navigate(`/tags/${word.substring(1)}`)}
>
  {word}{" "}
</span>

    ) : (
      word + " "
    )
  )}
</p>


        <div className="comments-section" ref={commentsRef}>
          {comments.map(c => renderComment(c))}
        </div>

        <div className="add-comment">
          <FaSmile onClick={() => setShowEmojiFor(p => (p === "comment" ? null : "comment"))} />
          <input
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={addComment}>Post</button>

          {showEmojiFor === "comment" && (
            <div className="emoji-wrapper">
              <EmojiPicker onEmojiClick={onEmojiClick} height={300} />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PostDetails;

