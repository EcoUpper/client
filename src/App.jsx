import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutPage from "./pages/AboutPage/About";
import EventsPage from "./pages/EventsPage/EventsPage";
import EventDetailsPage from "./pages/EventsPage/EventDetailsPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import PostsPage from "./pages/PostsPage/Posts";
import ProductPage from "./pages/ProductDetailsPage/ProductDetails";
 
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import Footer from "./components/Footer/Footer"


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
        <Route path="/events/:eventId" element={<EventDetailsPage/>}/>
        <Route path="/posts" element={<PostsPage/>} />
        <Route path="*" element={<NotFoundPage/>} />



        <Route
          path="/profile/:userId"
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
      <Footer />
    </div>
  );
}

export default App;
