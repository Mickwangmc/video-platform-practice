import React, { useEffect } from "react";
import { VideoContainer } from '../components/VideoContainer';
import classnames from "classnames";
import style from "./style.css";

const cx = classnames.bind(style);

const VidoeList = (props) => {
  const {
    videoList,
    videoTotalResults,
    loadVideoList,
    handlePaginate,
    handleFavoriteToggle,
  } = props;

  useEffect(() => {
    loadVideoList({ 
      type = "videos"
    });
  }, []);

  return (
    <div className={cx('video-list-page')}>
      <h2>VideoList</h2>
      <p>{videoTotalResults} results</p>
      <div>
        <button onClick={() => handlePaginate("PREV")}>PREV</button>
        <button onClick={() => handlePaginate("NEXT")}>NEXT</button>
      </div>
      <VideoContainer videoList={videoList} handleFavoriteToggle={handleFavoriteToggle}/>
    </div>
  );
};

export default VidoeList;
