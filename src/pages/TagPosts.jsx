import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/tag-posts.css";

const TagPosts = () => {
  const { tag } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTagPosts = async () => {
      try {
        const res = await API.get(`/api/posts/tag/${tag}`);
        setPosts(res.data);
      } catch {
        alert("Failed to load hashtag posts");
      } finally {
        setLoading(false);
      }
    };

    fetchTagPosts();
  }, [tag]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="tag-posts">

      <h2 className="tag-title">Posts with #{tag}</h2>

      {posts.length === 0 && (
        <p className="empty">No posts found.</p>
      )}

      {posts.map((post) => (
        <div key={post.id} className="tag-post-card">

         {(post.videoUrl || post.imageName) && (
  <div className="image-wrapper">
    <button
      className="back-btn"
      onClick={() => navigate(-1)}
    >
      ←
    </button>

    {post.videoUrl ? (
      <video
        className="tag-post-image"
        src={post.videoUrl}
        controls
      />
    ) : (
      <img
        src={post.imageName}
        alt="post"
        className="tag-post-image"
      />
    )}
  </div>
)}


          <h3>{post.title}</h3>

          <p>
            {post.content.length > 150
              ? post.content.substring(0, 150) + "..."
              : post.content}
          </p>

          <button
            className="view-btn"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            View Post
          </button>

        </div>
      ))}

    </div>
  );
};

export default TagPosts;
