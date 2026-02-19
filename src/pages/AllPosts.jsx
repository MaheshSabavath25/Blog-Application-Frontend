


import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/allposts.css";

const PAGE_SIZE = 5;

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState(false);

  const loaderRef = useRef(null);
  const navigate = useNavigate();

  // 🔹 Fetch paginated posts
  const fetchPosts = async (pageNumber) => {
  setLoading(true);
  try {
    const res = await API.get(
      `/api/posts/paged?page=${pageNumber}&size=${PAGE_SIZE}`
    );

    setPosts((prev) =>
      pageNumber === 0
        ? res.data.content || []
        : [...prev, ...(res.data.content || [])]
    );

    setTotalPages(res.data.totalPages || 0);
    setPage(res.data.number || 0);
    setSearchMode(false);

  } catch (err) {
    console.error("Fetch posts error:", err);
    setPosts([]);   // prevent crash
  } finally {
    setLoading(false);
  }
};


  // 🔍 Search posts
  const searchPosts = async () => {
    if (!search.trim()) {
      fetchPosts(0);
      return;
    }

    setLoading(true);
    try {
      const res = await API.get(`/api/posts/search/${search}`);
      setPosts(res.data);
      setSearchMode(true);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPosts(0);
  }, []);

  // 🔁 Infinite scroll observer
  useEffect(() => {
    if (searchMode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          page < totalPages - 1 &&
          !loading
        ) {
          fetchPosts(page + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [page, totalPages, loading, searchMode]);

  return (
    <div className="feed-container">
      {/* 🔍 SEARCH */}
      <div className="search-bar">
        <input
          placeholder="Search posts by keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={searchPosts}>Search</button>
      </div>

      {/* 📰 POSTS */}
      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <div className="post-header">
            {post.user?.name || "Unknown User"}
          </div>

          {post.videoUrl ? (
  <div className="post-image">
    <video
      controls
      playsInline
      preload="auto"
      poster={post.videoUrl
        .replace("/upload/", "/upload/so_0/")
        .replace(".mp4", ".jpg")}
      width="100%"
    >
      <source
        src={post.videoUrl.replace(
          "/upload/",
          "/upload/f_mp4,vc_h264/"
        )}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </div>
) : post.imageName ? (


  <div className="post-image">
    <img
      src={post.imageName}
      alt="post"
    />
  </div>
) : null}


          <div className="post-body">
            <h4>{post.title}</h4>
    <p>
  {post.content
    ? post.content.length > 120
      ? post.content.substring(0, 120) + "..."
      : post.content
    : ""}
</p>



            <button
              className="view-btn"
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              View Post →
            </button>
          </div>
        </div>
      ))}

      {/* 🔄 SCROLL LOADER */}
      {!searchMode && page < totalPages - 1 && (
        <div ref={loaderRef} className="scroll-loader">
          {loading && <p>Loading more posts...</p>}
        </div>
      )}
    </div>
  );
};

export default AllPosts;

