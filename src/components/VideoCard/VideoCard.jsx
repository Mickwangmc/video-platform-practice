import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import style from "./style.css";

const cx = classnames.bind(style);

const VideoCard = (props) => {
  const { videoContent, handleFavoriteToggle } = props;
  const {
    snippet: {
      localized: { title, description },
    },
    contentDetails: { duration },
    id,
  } = videoContent;

  return (
    <div>
      <Link to={`/watch/${id}`}>
        <div>
          <h5>{title}</h5>
          <p>{description}</p>
          <p>{duration}</p>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
