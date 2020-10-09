import React, { useContext } from "react";
import Context from "../../Context";
import { VideoCard } from '../VideoCard'
import classnames from "classnames";
import style from "./style.scss";

const cx = classnames.bind(style);

const VideoContainer = () => {
  const { videoList } = useContext(Context);

  return (
    <div className={cx('video-container')}>
      {
        videoList.map((videoObj) => {
          return (
            <VideoCard
              key={videoObj.id}
              videoContent={videoObj}
            />
          );
        })
      }
    </div>
  );
};

export default VideoContainer;
