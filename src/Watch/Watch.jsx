import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import Context from "../Context";
import Player from './Player';
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import classnames from "classnames";
import style from "./style.scss";

const cx = classnames.bind(style);

const Watch = () => {
  const { videoList, currentMyFavoritesList, handleFavoriteToggle } = useContext(
    Context
  );
  const [isFavorite, setIsFavorite] = useState(false); 
  const [isShowHint, setIsShowHint] = useState(false);

  const { videoId } = useParams();
  const targetVideoObj = videoList.find((videoObj) => videoObj.id === videoId);
  const {
    snippet: {
      localized: { title, description },
    },
  } = targetVideoObj;
  const playerContainerRef = useRef(null);

  useEffect(() => {
    const hasHintRead = JSON.parse(window.localStorage.getItem("hintRead"));

    if (!hasHintRead) setIsShowHint(true);

    setIsFavorite(
      currentMyFavoritesList && currentMyFavoritesList.includes(videoId)
    );
  }, []);

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    handleFavoriteToggle(videoId);
    setIsFavorite(!isFavorite);
  };

  const handleHintRead = () => {
    setIsShowHint(false);
    window.localStorage.setItem("hintRead", JSON.stringify(true))
  };

  return (
    <div className={cx("watch-page-wrapper")}>
      {isShowHint && (
        <div className={cx("video-hint-bar")}>
          HINT: Press key "RIGHT" to forward, "LEFT" to backward. "UP" and
          "DOWN" can change volume.
          <span onClick={handleHintRead}>OK! Hide this hint.</span>
        </div>
      )}
      <div className={cx("player-container")} ref={playerContainerRef}>
        <Player />
      </div>
      <div className={cx("info-container")}>
        <div className={cx("main-info")}>
          <h2>{title}</h2>
          <button onClick={handleFavoriteClick}>
            {isFavorite ? <BsFillBookmarkFill /> : <BsBookmark />}
          </button>
        </div>
        <p className={cx("sub-info")}>{description}</p>
      </div>
    </div>
  );
};

export default Watch;
