import "./HomePage.css"
import "./../../components/NewsList/News.css"
import NewsList from "./../../components/NewsList/NewsList"
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function HomePage() {

  const { user } = useContext(AuthContext)

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (

    <>
      <div className="news-container">
        {user ? <h1>Welcome, {user.username}!</h1> 
        :
        <h1>Welcome to EcoUpper</h1>
        }
        <h4 className="subheading">Explore the latest buzz about climate change. <br /> Dive into the most current climate updates and discover what's been happening on our planet.</h4>
        <NewsList />
        <button onClick={scrollToTop}>Back to top</button>
      </div>
    </>
  );
}

export default HomePage;
