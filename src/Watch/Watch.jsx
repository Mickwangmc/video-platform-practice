import React from "react";
import { useParams } from "react-router";
import classnames from "classnames";
import style from "./style.css";

const cx = classnames.bind(style);

const Watch = (props) => {
  const { videoList, handleFavoriteToggle } = props;
  const { videoId } = useParams();
  const targetVideoObj = videoList.find((videoObj) => videoObj.id === videoId);
  const {
    snippet: {
      localized: { title, description },
    },
    contentDetails: { duration },
  } = targetVideoObj;


  return <div>Watch</div>;
};

export default Watch;
