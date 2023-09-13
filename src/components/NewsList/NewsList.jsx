import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import Loading from "../../components/Loading/Loading"


function NewsList() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const newsUrl = process.env.REACT_APP_SERVER_URL + "/api/news";

    fetch(newsUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNews(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    news.length===0? <Loading/> :
    <>
    <div className="newsPage">
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
