import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import Context from './Context';
import { MyFavorites } from './MyFavorites';
import { VideoList } from './VideoList';
import { Watch } from './Watch';
import { MdLocalMovies } from 'react-icons/md';
import { BsBookmarksFill } from 'react-icons/bs';
import classnames from 'classnames';
import style from './app.scss';

const cx = classnames.bind(style);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowAddPrompt, setIsShowAddPrompt] = useState(false);
  const [isShowRemovePrompt, setIsShowRemovePrompt] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [videoTotalResults, setVideoTotalResults] = useState(0);
  const [pageTokens, setPageTokens] = useState({ PREV: "", NEXT: "" });

  const currentMyFavoritesList = JSON.parse(
    window.localStorage.getItem("myFavoritesList")
  );

  const isMobile = window.innerWidth < 960;

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

      setIsShowRemovePrompt(true);

      setTimeout(() => {
        setIsShowRemovePrompt(false);
      }, 1000);
    } else {
      newMyFavoritesList = hasAnyFavorite
        ? [...currentMyFavoritesList, videoId]
        : [videoId];

      setIsShowAddPrompt(true);

      setTimeout(() => {
        setIsShowAddPrompt(false);
      }, 1000);
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
    currentMyFavoritesList,
    setVideoList,
    loadVideoList,
    handlePaginate,
    handleFavoriteToggle,
  };

  const renderNav = () => {
    return (
      <nav>
        <Link to="/">
          <div><MdLocalMovies />Video List</div>
        </Link>
        <Link to="/myfavorites">
          <div><BsBookmarksFill />My Favorites</div>
        </Link>
      </nav>
    )
  }

  return (
    <Context.Provider value={store}>
      <div className="App">
        {isLoading && (
          <div className={cx("loading-mask")}>
            <p>Loading...</p>
          </div>
        )}
        {isShowAddPrompt && (
          <div className={cx("toggle-favorite-prompt")}>
            <span>Added to Favorites!</span>
          </div>
        )}
        {isShowRemovePrompt && (
          <div className={cx("toggle-favorite-prompt")}>
            <span>Removed from Favorites!</span>
          </div>
        )}
        <Router>
          {!isMobile && renderNav()}
          <Switch>
            <Route exact path="/" component={VideoList}></Route>
            <Route path="/myfavorites" component={MyFavorites}></Route>
            <Route path="/watch/:videoId" component={Watch}></Route>
          </Switch>
          {isMobile && renderNav()}
        </Router>
      </div>
    </Context.Provider>
  );
}

export default App;
