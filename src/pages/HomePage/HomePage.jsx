import "./HomePage.css"
import "./../../components/NewsList/News.css"
import NewsList from "./../../components/NewsList/NewsList"
import logo from "../../images/long_logo_dark.png"


function HomePage() {

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (

    <>
      <div className="news-container">
        <h1>Welcome to EcoUpper</h1>
        <h2>Thank you for caring about the environment!</h2>
        <h5>You can read the most recent climate news here to stay up to date</h5>
        <NewsList />
        <button onClick={scrollToTop}>Back to top</button>
      </div>
    </>
  );
}

export default HomePage;
