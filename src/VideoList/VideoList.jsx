import React, { useEffect, useContext } from "react";
import Context from '../Context';
import { VideoContainer } from '../components/VideoContainer';
import classnames from "classnames";
import style from "./style.scss";

const cx = classnames.bind(style);

const VidoeList = () => {
  const {
    videoTotalResults,
    loadVideoList,
    handlePaginate,
  } = useContext(Context);

  useEffect(() => {
    loadVideoList({ 
      type: "videos"
    });
  }, []);

  return (
    <div className={cx("video-list-page")}>
      <h2>VideoList</h2>
      <p className={cx('videos-total-results')}>共有： {videoTotalResults} 部影片</p>
      <VideoContainer />
      <div className={cx('paginate-buttons-container')}>
        <button onClick={() => handlePaginate("PREV")}>PREV</button>
        <button onClick={() => handlePaginate("NEXT")}>NEXT</button>
      </div>
    </div>
  );
};

export default VidoeList;
