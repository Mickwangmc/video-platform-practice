import React, { useEffect } from "react";
import { VideoContainer } from '../components/VideoContainer';
import classnames from "classnames";
import style from "./style.css";

const cx = classnames.bind(style);

const MyFavorites = (props) => {
  const {
    videoList,
    loadVideoList,
    handlePaginate,
    handleFavoriteToggle,
  } = props; 

  const myFavoritesList = JSON.parse(
    window.localStorage.getItem("myFavoritesList")
  );

  useEffect(() => {
    const idListString = myFavoritesList.reduce((accu, favoriteId, idx) => {
      return idx === 0 ? favoriteId :`${accu}%2C${favoriteId}`
    }, "");

    loadVideoList({ 
      type = "videos",
      idListString,
    });
  }, [myFavoritesList]);


  return (
    <div>
      <h2>My Favorites</h2>
      <VideoContainer videoList={videoList} handleFavoriteToggle={handleFavoriteToggle}/>
      <div>
        <button onClick={() => handlePaginate("PREV")}>PREV</button>
        <button onClick={() => handlePaginate("NEXT")}>NEXT</button>
      </div>
    </div>
  );
};

export default MyFavorites;