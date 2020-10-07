import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment-duration-format";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import classnames from "classnames";
import style from "./style.scss";

const cx = classnames.bind(style);

const VideoCard = (props) => {
  const { videoContent, handleFavoriteToggle } = props;
  const {
    snippet: {
      localized: { title, description },
      thumbnails: {
        medium: { url },
      },
    },
    contentDetails: { duration },
    id,
  } = videoContent;

  const currentMyFavoritesList = JSON.parse(
    window.localStorage.getItem("myFavoritesList")
  );

  const isFavorite =
    currentMyFavoritesList && currentMyFavoritesList.includes(id);

  const transformDuration = (duration) =>
    moment.duration(duration).format("h:mm:ss").padStart(4, "0:0");

  const handleFavoriteClick = event => {
    event.preventDefault();
    handleFavoriteToggle(id);
  };

  return (
    <div className={cx("video-card")}>
      <Link to={`/watch/${id}`}>
        <div className={cx("video-card__inner")}>
          <div className={cx("video-card__thumbnail--container")}>
            <img src={url} />
            <p>{transformDuration(duration)}</p>
            <button onClick={handleFavoriteClick}>
              {isFavorite ? <BsFillBookmarkFill />: <BsBookmark />}
            </button>
          </div>
          <div className={cx("video-card__content--container")}>
            <h5>{title}</h5>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
