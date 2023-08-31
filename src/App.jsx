import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutPage from "./pages/AboutPage/About";
import EventsPage from "./pages/EventsPage/Events";
import MarketPage from "./pages/MarketPage/Market";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PostsPage from "./pages/PostsPage/Posts";
import ProductPage from "./pages/ProductPage/Product.Details";
 
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";


function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/market" element={<MarketPage/>} />
        <Route path="/market/:productId" element={<ProductPage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/posts" element={<PostsPage/>} />
        <Route path="*" element={<NotFoundPage/>} />



        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
