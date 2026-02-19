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

  const [videoUrl, setVideoUrl] = useState(null);
const [video, setVideo] = useState(null);


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/api/posts/${postId}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setImageName(res.data.imageName);
setVideoUrl(res.data.videoUrl);

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

  const updateMedia = async () => {
  if (!image && !video)
    return alert("Please select image or video");

  const formData = new FormData();

  try {
    if (video) {
      formData.append("video", video);
      await API.post(`/api/posts/${postId}/video`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else {
      formData.append("image", image);
      await API.post(`/api/posts/${postId}/image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }

    alert("Media updated successfully ✅");
    window.location.reload();
  } catch {
    alert("Failed to update media ❌");
  }
};


  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-post">
      <h2>Edit Post</h2>

{(imageName || videoUrl) && (
  <div className="image-wrapper">
    <button
      className="back-btn"
      onClick={() => navigate("/myposts")}
    >
      ←
    </button>

    {videoUrl ? (
      <video
  className="edit-post-image"
  controls
  playsInline
  preload="auto"
  poster={videoUrl
    ?.replace("/upload/", "/upload/so_0/")
    ?.replace(".mp4", ".jpg")}
>
  <source
    src={videoUrl?.replace(
      "/upload/",
      "/upload/f_mp4,vc_h264/"
    )}
    type="video/mp4"
  />
  Your browser does not support the video tag.
</video>

    ) : (
      <img
        className="edit-post-image"
        src={imageName}
        alt="post"
      />
    )}
  </div>
)}



      <input
        type="file"
        accept="image/*,video/*"

        className="ep-file"
        onChange={(e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.type.startsWith("video")) {
    setVideo(file);
    setImage(null);
  } else {
    setImage(file);
    setVideo(null);
  }
}}

      />

      <button className="ep-btn" onClick={updateMedia}>
  Update Media
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
