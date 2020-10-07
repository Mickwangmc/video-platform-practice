import React from "react";
import { VideoCard } from '../VideoCard'
import classnames from "classnames";
import style from "./style.css";

const cx = classnames.bind(style);

const VideoContainer = (props) => {
  const { videoList, handleFavoriteToggle } = props;

  return (
    <div>
      {
        videoList.map((videoObj) => {
          return (
            <VideoCard
              key={videoObj.id}
              videoContent={videoObj}
              handleFavoriteToggle={handleFavoriteToggle}
            />
          );
        })
      }
    </div>
  );
};

export default VideoContainer;
