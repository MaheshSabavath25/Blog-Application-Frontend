import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/myposts.css";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();

  // 🔹 Load my posts
  const loadMyPosts = async () => {
    try {
      const res = await API.get("/api/posts/user/me");
      setPosts(res.data);

      if (res.data.length > 0) {
        setUser(res.data[0].user); // username + about
      }
    } catch {
      alert("Failed to load posts");
    }
  };

  // 🔹 Delete post
  const deletePost = async (postId) => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await API.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((p) => p.id !== postId));
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    loadMyPosts();
  }, []);

  return (
    <div className="profile-wrapper">

      {/* 👤 PROFILE HEADER */}
      {user && (
        <div className="profile-header">
          <div className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{user.name}</h3>
            <p className="about">{user.about || "No bio added"}</p>
          </div>
        </div>
      )}

      {/* 🟦 POSTS GRID */}
      <div className="posts-grid">
        {posts.map((post) => (
          <div className="grid-post" key={post.id}>

           {/* 🖼 IMAGE OR 🎥 VIDEO */}
{post.videoUrl ? (
  <video
  src={post.videoUrl}
  muted
  playsInline
  preload="metadata"
  onClick={() => navigate(`/posts/${post.id}`)}
/>

) : post.imageName ? (
  <img
    src={post.imageName}
    alt="post"
    onClick={() => navigate(`/posts/${post.id}`)}
  />
) : null}


            {/* ⋮ MENU */}
            <div
              className="menu-btn"
              onClick={() =>
                setOpenMenuId(openMenuId === post.id ? null : post.id)
              }
            >
              ⋮
            </div>

            {openMenuId === post.id && (
              <div className="menu-box">
                <button onClick={() => navigate(`/edit-post/${post.id}`)}>
                  Edit
                </button>
                <button onClick={() => deletePost(post.id)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="empty">No posts yet</p>
      )}
    </div>
  );
};

export default MyPosts;
