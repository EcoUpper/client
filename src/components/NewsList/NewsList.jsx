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
    <div className="newsPage">
        <div>
          <h3>News EDIT TITLE</h3>
        </div>
        <div className="newsInnerContainer">
          {
            news.map((news, index) => {
              return <NewsCard key={index} data={news} />

            })
          }
        </div>
    </div>
    </>
  )
}

export default NewsList;
