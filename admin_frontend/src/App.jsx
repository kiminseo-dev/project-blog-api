import { Routes, Route } from "react-router";

import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
