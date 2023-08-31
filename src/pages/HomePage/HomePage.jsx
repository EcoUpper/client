import "./HomePage.css";
import { useState, useEffect } from "react";


function HomePage() {

  const [news, setNews] = useState([]);

  useEffect(()=>{
    const newsUrl = process.env.REACT_APP_SERVER_URL + "/app/news/"

    fetch(newsUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log(data);
    })
    .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <h1>Home page</h1>
     
     <NewsList/>

    </div>
  );
}

export default HomePage;
