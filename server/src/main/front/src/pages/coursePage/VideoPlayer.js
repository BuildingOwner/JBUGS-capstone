import React from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css"

const VideoPlayer = (props) => {

  return (
    <div className={styles.player}>
      <div className={styles.inner}>
        <ReactPlayer url={props.videoUrl} />
      </div>
    </div>
  )
}

export default VideoPlayer