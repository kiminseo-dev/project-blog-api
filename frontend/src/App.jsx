import {
  Routes,
  Route,
} from "react-router";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blogs" element={<Blogs />} />
    </Routes>
  );
}

export default App;
