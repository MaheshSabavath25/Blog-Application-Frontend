// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";
// import "../styles/allposts.css";

// const PAGE_SIZE = 5;

// const AllPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [searchMode, setSearchMode] = useState(false);

//   const navigate = useNavigate();

//   // 🔹 Fetch paginated posts
//   const fetchPosts = async (pageNumber) => {
//     setLoading(true);
//     try {
//       const res = await API.get(
//         `/api/posts/paged?page=${pageNumber}&size=${PAGE_SIZE}`
//       );
//       setPosts(res.data.content);
//       setTotalPages(res.data.totalPages);
//       setPage(res.data.number);
//       setSearchMode(false);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔍 Search posts by keyword
//   const searchPosts = async () => {
//     if (!search.trim()) {
//       fetchPosts(0);
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await API.get(`/api/posts/search/${search}`);
//       setPosts(res.data);
//       setSearchMode(true);
//     } catch {
//       alert("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(0);
//   }, []);

//   if (loading) return <h3 style={{ textAlign: "center" }}>Loading posts...</h3>;

//   return (
//     <div className="feed-container">
//       {/* 🔍 SEARCH BAR */}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search posts by keyword..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button onClick={searchPosts}>Search</button>
//       </div>

//       {/* 📰 POSTS FEED */}
//       {posts.map((post) => (
//         <div className="post-card" key={post.id}>
          
//           {/* 👤 USERNAME */}
//           <div className="post-header">
//             {post.user?.name || "Unknown User"}
//           </div>

//           {/* 🖼 IMAGE (INSTAGRAM STYLE) */}
//           {post.imageName && (
//             <div className="image-wrapper">
//               <img
//                 src={`http://localhost:8080/api/posts/image/${post.imageName}`}
//                 alt="post"
//               />
//             </div>
//           )}

//           {/* 📝 CONTENT */}
//           <div className="post-body">
//             <h4>{post.title}</h4>
//             <p>
//               {post.content.length > 120
//                 ? post.content.substring(0, 120) + "..."
//                 : post.content}
//             </p>

//             <button
//               className="view-btn"
//               onClick={() => navigate(`/posts/${post.id}`)}
//             >
//               View Post
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* 🔁 PAGINATION */}
//       {!searchMode && totalPages > 1 && (
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <button disabled={page === 0} onClick={() => fetchPosts(page - 1)}>
//             ⬅ Prev
//           </button>

//           <span>
//             Page <b>{page + 1}</b> of <b>{totalPages}</b>
//           </span>

//           <button
//             disabled={page === totalPages - 1}
//             onClick={() => fetchPosts(page + 1)}
//           >
//             Next ➡
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPosts;import { useEffect, useState } from "react";


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/api";
// import "../styles/allposts.css";

// const PAGE_SIZE = 5;

// const AllPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [searchMode, setSearchMode] = useState(false);

//   const navigate = useNavigate();

//   const fetchPosts = async (pageNumber) => {
//     setLoading(true);
//     try {
//       const res = await API.get(
//         `/api/posts/paged?page=${pageNumber}&size=${PAGE_SIZE}`
//       );
//       setPosts(res.data.content);
//       setTotalPages(res.data.totalPages);
//       setPage(res.data.number);
//       setSearchMode(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const searchPosts = async () => {
//     if (!search.trim()) {
//       fetchPosts(0);
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await API.get(`/api/posts/search/${search}`);
//       setPosts(res.data);
//       setSearchMode(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts(0);
//   }, []);

//   if (loading) return <h3 className="loading">Loading posts...</h3>;

//   return (
//     <div className="feed-container">
//       {/* SEARCH */}
//       <div className="search-bar">
//         <input
//           placeholder="Search posts by keyword..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button onClick={searchPosts}>Search</button>
//       </div>

//       {/* POSTS */}
//       {posts.map((post) => (
//         <div className="post-card" key={post.id}>
//           <div className="post-header">
//             {post.user?.name || "Unknown User"}
//           </div>

//           {post.imageName && (
//             <div className="post-image">
//               <img
//                 src={`http://localhost:8080/api/posts/image/${post.imageName}`}
//                 alt="post"
//               />
//             </div>
//           )}

//           <div className="post-body">
//             <h4>{post.title}</h4>
//             <p>
//               {post.content.length > 120
//                 ? post.content.substring(0, 120) + "..."
//                 : post.content}
//             </p>

//             <button
//               className="view-btn"
//               onClick={() => navigate(`/posts/${post.id}`)}
//             >
//               View Post →
//             </button>
//           </div>
//         </div>
//       ))}

//       {!searchMode && totalPages > 1 && (
//         <div className="pagination">
//           <button disabled={page === 0} onClick={() => fetchPosts(page - 1)}>
//             ⬅ Prev
//           </button>

//           <span>
//             Page <b>{page + 1}</b> of <b>{totalPages}</b>
//           </span>

//           <button
//             disabled={page === totalPages - 1}
//             onClick={() => fetchPosts(page + 1)}
//           >
//             Next ➡
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllPosts;


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
          ? res.data.content
          : [...prev, ...res.data.content]
      );

      setTotalPages(res.data.totalPages);
      setPage(res.data.number);
      setSearchMode(false);
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
      { threshold: 1 }
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

          {post.imageName && (
            <div className="post-image">
              <img
                src={`https://blog-application-backend-4si6.onrender.com/api/posts/image/${post.imageName}`}
                alt="post"
              />
            </div>
          )}

          <div className="post-body">
            <h4>{post.title}</h4>
            <p>
              {post.content.length > 120
                ? post.content.substring(0, 120) + "..."
                : post.content}
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

