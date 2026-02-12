
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../styles/create-post.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [newCategory, setNewCategory] = useState(""); // ✅ NEW
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  /* ================= LOAD CATEGORIES ================= */
  useEffect(() => {
    API.get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch(() => alert("Failed to load categories"));
  }, []);

  /* ================= CREATE POST ================= */
  const createPost = async () => {
    if (!title || !content || !categoryId) {
      return alert("All fields are required");
    }

    try {
      let finalCategoryId = categoryId;

      // ✅ CREATE CATEGORY IF USER CHOOSES "NEW"
      if (categoryId === "new") {
        if (!newCategory.trim()) {
          return alert("Please enter category name");
        }

        const categoryRes = await API.post("/api/categories", {
          categoryTitle: newCategory,
          categoryDescription: ""
        });

        finalCategoryId = categoryRes.data.id;
      }

      // ✅ CREATE POST
      const postRes = await API.post(
        `/api/posts/category/${finalCategoryId}`,
        { title, content }
      );

      const postId = postRes.data.id;

      // ✅ IMAGE UPLOAD
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await API.post(
          `/api/posts/${postId}/image`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      alert("Post created successfully ✅");
      navigate("/myposts");

    } catch (err) {
      alert("Failed to create post ❌");
    }
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>

      <input
        className="cp-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="cp-textarea"
        placeholder="Content (hashtags supported)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* ================= CATEGORY ================= */}
      <select
        className="cp-input"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.categoryTitle}
          </option>
        ))}

        <option value="new">➕ Add new category</option>
      </select>

      {/* ================= NEW CATEGORY INPUT ================= */}
      {categoryId === "new" && (
        <input
          className="cp-input"
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
      )}

      <div className="file-upload">
  <label htmlFor="fileInput" className="custom-file-btn">
    {image ? "Image Selected ✓" : "Upload Image"}
  </label>

  <input
    id="fileInput"
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    hidden
  />
</div>


      <button className="cp-button" onClick={createPost}>
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;


