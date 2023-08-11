import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleBlog from "./components/SingleBlog/SingleBlog";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect } from "react";
function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        {user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/blogs/:blogId"
            element={user ? <SingleBlog /> : <Navigate to="/login" />}
          />
          <Route
            path="/blogs"
            element={user ? <Blog /> : <Navigate to="/login" />}
          />
          <Route
            path="/post"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
