import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/edit-post.css";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageName, setImageName] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/api/posts/${postId}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImageName(res.data.imageName);
      } catch {
        alert("Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const updatePost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty");
      return;
    }

    try {
      await API.put(`/api/posts/${postId}`, { title, content });
      alert("Post updated successfully ✅");
      navigate(`/posts/${postId}`);
    } catch {
      alert("Failed to update post ❌");
    }
  };

  const updateImage = async () => {
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      await API.post(`/api/posts/${postId}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image updated successfully ✅");
      window.location.reload();
    } catch {
      alert("Failed to update image ❌");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-post">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2>Edit Post</h2>

      {imageName && (
        <img
          className="edit-post-image"
          src={`http://localhost:8080/api/posts/image/${imageName}`}
          alt="post"
        />
      )}

      <input
        type="file"
        accept="image/*"
        className="ep-file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="ep-btn" onClick={updateImage}>
        Update Image
      </button>

      <hr />

      <input
        type="text"
        className="ep-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post Title"
      />

      <textarea
        rows="6"
        className="ep-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post Content"
      />

      <button className="ep-btn" onClick={updatePost}>
        Update Post
      </button>
    </div>
  );
};

export default EditPost;
