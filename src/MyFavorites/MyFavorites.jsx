import React, { useEffect, useContext, useState } from "react";
import { Waypoint } from "react-waypoint";
import Context from "../Context";
import { VideoContainer } from '../components/VideoContainer';
import classnames from "classnames";
import style from "./style.css";

const cx = classnames.bind(style);

const VIDEOS_PER_LOAD = 12;

const MyFavorites = () => {
  const {
    isLoading,
    currentMyFavoritesList,
    loadVideoList,
  } = useContext(Context); 
  const [loadedVideoIndex, setLoadedVideoIndex] = useState(0);

  const hasAnyFavorite =
    currentMyFavoritesList && currentMyFavoritesList.length > 0;

  const hasMoreThanOnePageVideos =
    currentMyFavoritesList && currentMyFavoritesList.length > VIDEOS_PER_LOAD;

  useEffect(() => {
    const idListString = hasAnyFavorite
      ? currentMyFavoritesList
          .filter(
            (favoriteId, idx) =>
              idx >= loadedVideoIndex &&
              idx < loadedVideoIndex + VIDEOS_PER_LOAD
          )
          .reduce((accu, favoriteId, idx) => {
            return idx === 0 ? favoriteId : `${accu}%2C${favoriteId}`;
          }, "")
      : "";

    if (idListString && !isLoading) {
      loadVideoList({
        type: "videos",
        idListString,
      });
    }
  }, [hasAnyFavorite, loadedVideoIndex]);

  const loadMoreVideo = () => {
    if (loadedVideoIndex === currentMyFavoritesList.length) return;

    if (!isLoading) {
      setLoadedVideoIndex(
        Math.min(
          currentMyFavoritesList.length,
          loadedVideoIndex + VIDEOS_PER_LOAD
        )
      );
    }
  };

  return (
    <div>
      <h2>My Favorites</h2>
      <p className={cx("videos-total-results")}>
        {hasAnyFavorite
          ? `已收藏 ${currentMyFavoritesList.length} 部影片`
          : "尚未收藏任何影片！"}
      </p>
      <VideoContainer />
      {hasMoreThanOnePageVideos && <Waypoint onEnter={loadMoreVideo} />}
    </div>
  );
};

export default MyFavorites;