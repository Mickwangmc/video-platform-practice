import React, { useEffect, useState, useRef } from "react";
import videojs from "video.js";
import { BsFillPlayFill } from 'react-icons/bs';
import classnames from "classnames";
import style from "./style.scss";

const cx = classnames.bind(style);

const ASPECT_RATIO = 16 / 9;

const Player = (props) => {
  const playerRef = useRef(null);
  const { videoSrc } = props;
  const [isPlaying, setIsPlaying] = useState(true);

  const isMobile = window.innerWidth < 960;

  let player;

  const handleContinue = () => {
    setIsPlaying(true);
    playerRef.current.play();
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleCurrentTimeChange = (type) => {
    const currentTime = player.currentTime();

    player.currentTime(
      type === "FORWARD" ? currentTime + 15 : currentTime - 15
    );
  };

  const handleVolueChange = (type) => {
    const currentVolume = player.volume();

    player.volume(type === "UP" ? currentVolume + 0.1 : currentVolume - 0.1);
  };

  const handleKeyDown = e => {
    switch(e.keyCode) {
      case 38:
        handleVolueChange("UP");
        break;
      case 40:
        handleVolueChange('DOWN');
        break;
      case 39:
        handleCurrentTimeChange('FORWARD');
        break;
      case 37:
        handleCurrentTimeChange('BACKWARD');
        break;
    }
  };

  useEffect(() => {
    player = videojs(
      playerRef.current,
      {
        sources: [
          {
            src:
              "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
            type: "application/x-mpegURL",
          },
        ],
        width: isMobile ? window.outerWidth : Math.min(window.outerWidth * 0.8, 960),
        height: isMobile
          ? window.outerWidth / ASPECT_RATIO
          : Math.min(window.outerWidth / ASPECT_RATIO, 960) * 0.8,
        controls: true,
      },
      () => {}
    );

    player.on("pause", handlePause);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      player.dispose();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={cx("video-container")} data-vjs-player>
      {!isPlaying && (
        <div className={cx("video-ad")}>
          <div className={cx("pause-button-container")}>
            <button className={cx("pause-button")} onClick={handleContinue}>
              <BsFillPlayFill />
            </button>
          </div>
        </div>
      )}

      <video
        id="my-video"
        className="video-js vjs-big-play-centered"
        ref={playerRef}
        style={{ margin: 'auto' }}
      />
    </div>
  );
};

export default Player;