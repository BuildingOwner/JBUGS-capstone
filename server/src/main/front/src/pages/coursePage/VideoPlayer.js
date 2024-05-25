import React from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css"
import { useState, useEffect } from "react"

const VideoPlayer = (props) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [mimeType, setMimeType] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      const { videoUrl, mimeType } = event.data;
      console.log({videoUrl, mimeType})
      setVideoUrl(videoUrl);
      setMimeType(mimeType);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  return (
    <div className={styles.player}>
      <div className={styles.inner}>
        <ReactPlayer
          url={videoUrl}
          playing={true} // 자동 재생 활성화
          controls={true} // 비디오 컨트롤 표시
          volume={0.8} // 초기 볼륨 설정 (0.0 ~ 1.0)
          loop={true} // 비디오 루프 재생
        />
      </div>
    </div>
  )
}

export default VideoPlayer