import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";


import AllPosts from "./pages/AllPosts";
import MyPosts from "./pages/MyPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetails from "./pages/PostDetails";
import MyComments from "./pages/MyComments";
import TagPosts from "./pages/TagPosts";




import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ALL PAGES WITH NAVBAR */}
      <Route element={<Layout />}>
        <Route path="/allposts" element={<AllPosts />} />

        <Route path="/posts" element={<AllPosts />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/myposts" element={<MyPosts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit-post/:postId" element={<EditPost />} />
        <Route path="/my-comments" element={<MyComments />} />
       <Route path="/tags/:tag" element={<TagPosts />} />

      </Route>
    </Routes>
  );
}

export default App;
