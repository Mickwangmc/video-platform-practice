import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import { MyFavorites } from './MyFavorites';
import { VideoList } from './VideoList';
import { Watch } from './Watch';
import classnames from 'classnames';
import style from './App.css';

const cx = classnames.bind(style);

function App() {
  const [videoList, setVideoList] = useState([]);
  const [videoTotalResults, setVideoTotalResults] = useState(0);
  const [pageTokens, setPageTokens] = useState({ PREV: '', NEXT: '' });

  useEffect(() => {
    loadVideoList();
  }, [])

  const loadVideoList = async ({ idListString = "", pageToken = "" } = {}) => {
    console.log("idListString: ", idListString, ", pageToken:", pageToken);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&${
          idListString ? `id=${idListString}` : "chart=mostPopular"
        }${
          pageToken ? `&pageToken=${pageToken}` : ""
        }&regionCode=TW&maxResults=12&key=${
          process.env.REACT_APP_GOOGLE_API_KEY
        }`
      );
      // console.log(response.data);
      const {
        items,
        nextPageToken,
        prevPageToken,
        pageInfo: { totalResults },
      } = response.data;
      setVideoList(items);
      setVideoTotalResults(totalResults);
      setPageTokens({ NEXT: nextPageToken || "", PREV: prevPageToken || "" });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaginate = (type) => {
    loadVideoList({
      pageToken: pageTokens[type],
    });
  };

  const handleFavoriteToggle = (videoId) => {
    const currentMyFavoritesList = JSON.parse(window.localStorage.getItem('myFavoritesList'));
    console.log(currentMyFavoritesList);
    let newMyFavoritesList = [];

    if (currentMyFavoritesList.includes(videoId)) {
      newMyFavoritesList = currentMyFavoritesList.filter(
        (favoriteVideoId) => favoriteVideoId !== videoId
      );
    } else {
      newMyFavoritesList = [...currentMyFavoritesList, videoId];
    }
    console.log(newMyFavoritesList);

    window.localStorage.setItem(
      "myFavoritesList",
      JSON.stringify(newMyFavoritesList)
    );
  };

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">List</Link>
          <Link to="/myfavorites">My Favorites</Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <VideoList
              videoTotalResults={videoTotalResults}
              videoList={videoList}
              setVideoList={setVideoList}
              handlePaginate={handlePaginate}
              handleFavoriteToggle={handleFavoriteToggle}
            />
          </Route>
          <Route path="/myfavorites">
            <MyFavorites handleFavoriteToggle={handleFavoriteToggle} />
          </Route>
          <Route path="/watch/:videoId">
            <Watch handleFavoriteToggle={handleFavoriteToggle} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
