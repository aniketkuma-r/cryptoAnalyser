import { useEffect, useState } from 'react';
import './NewsFeed.css';
import axios from 'axios';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://crypto-news16.p.rapidapi.com/news/top/5',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      setArticles(response.data);
    }).catch((error) => {
      // console.error(error);
      alert(error);
    })
  }, []);

  // console.log(articles[0]);
  const firstFiveArticles = articles.slice(0, 5);


  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {firstFiveArticles.map((article, _index) => (
        <div key={_index}>
          <li><a href={article.url}>{article.title}</a></li>
        </div>
      ))}
    </div>
  );
}
export default NewsFeed;