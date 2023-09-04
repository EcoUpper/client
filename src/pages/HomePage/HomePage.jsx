import "./HomePage.css";
import NewsList from "./../../components/NewsList/NewsList"

function HomePage() {

  return (
    <div className="news">
      {/* <h1>Home page</h1> */}

      <NewsList />

    </div>
  );
}

export default HomePage;
