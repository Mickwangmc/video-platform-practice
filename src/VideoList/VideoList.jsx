import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import style from "./style.css";

const cx = classnames.bind(style);

const VidoeList = (props) => {
  const {
    videoList,
    videoTotalResults,
    handlePaginate,
    handleFavoriteToggle,
  } = props;

  return (
    <div>
      <p>VidoeList: {videoTotalResults} results</p>
      <div>
        <button onClick={() => handlePaginate("PREV")}>PREV</button>
        <button onClick={() => handlePaginate("NEXT")}>NEXT</button>
      </div>
      {videoList.map((videoObj) => {
        const {
          snippet: {
            localized: { title, description },
            thumbnails: {
              medium: { url },
            },
          },
          contentDetails: { duration },
          id,
        } = videoObj;

        return (
          <div key={id}>
            <h5>{title}</h5>
            <p>{description}</p>
            <p>{duration}</p>
          </div>
        );
      })}
    </div>
  );
};

export default VidoeList;
