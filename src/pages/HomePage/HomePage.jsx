import "./HomePage.css"
import "./../../components/NewsList/News.css"
import NewsList from "./../../components/NewsList/NewsList"


function HomePage() {

  return (

    <>
      {/* <div className="treesBackground"></div> */}
      <div className="newsContainer">
        <NewsList />
      </div>
    </>
  );
}

export default HomePage;
