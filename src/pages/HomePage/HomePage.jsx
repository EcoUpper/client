import "./HomePage.css"
import "./../../components/NewsList/News.css"
import NewsList from "./../../components/NewsList/NewsList"


function HomePage() {

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  return (

    <>
      {/* <div className="treesBackground"></div> */}
      <div className="newsContainer">
        <NewsList />
        <button onClick={scrollToTop}>Back to top</button>
      </div>
    </>
  );
}

export default HomePage;
