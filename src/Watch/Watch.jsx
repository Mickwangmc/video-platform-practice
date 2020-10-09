import React, { useContext, useRef } from "react";
import { useParams } from "react-router";
import Context from "../Context";
import Player from './Player';
import classnames from "classnames";
import style from "./style.scss";

const cx = classnames.bind(style);

const Watch = () => {
  const { videoList, currentMyFavoritesList, handleFavoriteToggle } = useContext(
    Context
  );

  const { videoId } = useParams();
  // const targetVideoObj = videoList.find((videoObj) => videoObj.id === videoId);
  // const {
  //   snippet: {
  //     localized: { title, description },
  //   },
  //   contentDetails: { duration },
  // } = targetVideoObj;


  return (
    <div>
      <Player />
    </div>
  );
};

export default Watch;
