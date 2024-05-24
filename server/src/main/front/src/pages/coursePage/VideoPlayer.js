import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = (props) => {

    return (
        <ReactPlayer url={props.videoUrl}/>
    )
}

export default VideoPlayer