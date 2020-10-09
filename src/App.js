import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import Context from './Context';
import { MyFavorites } from './MyFavorites';
import { VideoList } from './VideoList';
import { Watch } from './Watch';
import classnames from 'classnames';
import style from './App.css';

const cx = classnames.bind(style);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [videoTotalResults, setVideoTotalResults] = useState(0);
  const [pageTokens, setPageTokens] = useState({ PREV: "", NEXT: "" });

  const currentMyFavoritesList = JSON.parse(
    window.localStorage.getItem("myFavoritesList")
  );

  /**
   * @param {string} type          API type, could be "videos" or "search" in current usage
   * @param {string} idListString  look for specific videos with type videos.
   * @param {string} pageToken     look for specific results
   */
  const loadVideoList = async ({
    type = "videos",
    idListString = "",
    pageToken = "",
  } = {}) => {
    console.log("type: ", type, "; idListString: ", idListString, "; pageToken:", pageToken);

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/${type}?part=snippet%2CcontentDetails${
          type === "videos"
            ? idListString
              ? `&id=${idListString}`
              : "&chart=mostPopular"
            : ""
        }${
          pageToken ? `&pageToken=${pageToken}` : ""
        }&regionCode=TW&maxResults=12&key=${
          process.env.REACT_APP_GOOGLE_API_KEY
        }`
      );
      console.log(response.data);
      const {
        items,
        nextPageToken,
        prevPageToken,
        pageInfo: { totalResults },
      } = response.data;

      setVideoList(idListString ? [...videoList, ...items] : items);
      setVideoTotalResults(totalResults);
      setPageTokens({
        PREV: prevPageToken || pageTokens.PREV,
        NEXT: nextPageToken || pageTokens.NEXT
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaginate = (type) => {
    loadVideoList({
      pageToken: pageTokens[type],
    });
  };

  const handleFavoriteToggle = (videoId) => {
    const hasAnyFavorite = currentMyFavoritesList && currentMyFavoritesList.length > 0;
    let newMyFavoritesList = [];

    if (hasAnyFavorite && currentMyFavoritesList.includes(videoId)) {
      newMyFavoritesList = currentMyFavoritesList.filter(
        (favoriteVideoId) => favoriteVideoId !== videoId
      );
    } else {
      newMyFavoritesList = hasAnyFavorite
        ? [...currentMyFavoritesList, videoId]
        : [videoId];
    }

    window.localStorage.setItem(
      "myFavoritesList",
      JSON.stringify(newMyFavoritesList)
    );
  };

  const store = {
    isLoading,
    videoTotalResults,
    videoList,
    // videoList: mockData,
    currentMyFavoritesList,
    setVideoList,
    loadVideoList,
    handlePaginate,
    handleFavoriteToggle,
  };

  return (
    <Context.Provider value={store}>
      <div className="App">
        <Router>
          <nav>
            <Link to="/">
              <div>Video List</div>
            </Link>
            <Link to="/myfavorites">
              <div>My Favorites</div>
            </Link>
          </nav>
          <Switch>
            <Route exact path="/" component={VideoList}></Route>
            <Route path="/myfavorites" component={MyFavorites}></Route>
            <Route path="/watch/:videoId" component={Watch}></Route>
          </Switch>
        </Router>
      </div>
    </Context.Provider>
  );
}

export default App;
