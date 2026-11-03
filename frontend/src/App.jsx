import { Routes, Route } from "react-router";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import BlogCreate from "./pages/BlogCreate";
import Blog from "./pages/Blog";
import Author from "./pages/Author";
import AuthorBlog from "./AuthorBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/author" element={<Author />} />
      <Route path="/author/blogs/create" element={<BlogCreate />} />
      <Route path="/author/blogs/:id" element={<AuthorBlog />} />
      <Route path="/blogs/:id" element={<Blog />} />
    </Routes>
  );
}

export default App;
