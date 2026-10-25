import {
  Routes,
  Route,
} from "react-router";

import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
