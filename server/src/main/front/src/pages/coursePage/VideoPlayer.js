import React from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css"
import { useState, useEffect } from "react"

const VideoPlayer = (props) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [mimeType, setMimeType] = useState('');

  const watchVideo = async () => {
    const videoName = props.videoName.split('.')
    const length = videoName.length
    const extension = videoName[length - 1].toLowerCase() // 확장자명 추출

    // 확장자에 따른 MIME 타입 매핑
    const mimeTypes = {
      'mp4': 'video/mp4',
      'mov': 'video/quicktime',
      'webm': 'video/webm',
      'ogg': 'video/ogg',
      'avi': 'video/x-msvideo',
      'wmv': 'video/x-ms-wmv',
      'flv': 'video/x-flv',
      'mkv': 'video/x-matroska',
    }

    const mimeType = mimeTypes[extension] || 'video/mp4'

    try {
      const response = await axios.get(`/api/course/stream/${props.videoId}`, {
        responseType: 'blob' // 바이너리 데이터로 응답 받기
      })
      const videoBlob = new Blob([response.data], { type: mimeType }) // Blob 객체 생성
      const videoUrl = URL.createObjectURL(videoBlob) // Blob URL 생성

    } catch (error) {
      alert("동영상을 불러올 수 없습니다.")
      console.log(error)
    }
  }

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;

      const { videoUrl, mimeType } = event.data;
      console.log("hi")
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
        {
          console.log("hi")
        }
      </div>
    </div>
  )
}

export default VideoPlayer