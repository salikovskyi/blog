import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import './App.css'
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  return (
    <Router>
      <div className="wrapper">
      <nav className="nav">
        <Link to="/" className="link">Home</Link>

        {!isAuth ? (
          <Link to="/login" className="link">Login</Link>
        ) : (
          <>
            <Link to="/createpost" className="link">Create Post</Link>
            <button className="logut" onClick={signUserOut}>Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth}/>} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
