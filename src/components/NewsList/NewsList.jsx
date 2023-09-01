import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const newsUrl = process.env.REACT_APP_SERVER_URL + "/api/news";

    fetch(newsUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNews(data);
      })
      .catch((err) => console.log(err));
  }, []);

    return (
        <>

        <h3>NEWS</h3>
        {
            news.map((news, index)=>{
                return <NewsCard key = {index} data = {news}/> 
                
            })
        }

        </>
    )
}

export default NewsList;
