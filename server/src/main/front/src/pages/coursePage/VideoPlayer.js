import React from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css"
import { useRef, useState, useEffect } from "react"
import LoadingPage from "../mainPage/LoadingPage"
import axios from "axios"

const VideoPlayer = () => {
  const [memberId, setMemberId] = useState('')
  const [playbackTime, setPlaybackTime] = useState(0)
  const [videoId, setVideoId] = useState(null)
  const [videoUrl, setVideoUrl] = useState()
  const [videoDuration, setVideoDuration] = useState(0) // 영상 길이(초단위)
  const [playedSeconds, setPlayedSeconds] = useState(0) // 현재 재생 시간
  const [isReady, setIsReady] = useState(false) // 비디오 준비 상태 관리
  const playerRef = useRef(null) // ReactPlayer 컴포넌트에 대한 ref를 생성

  // 동영상 길이가 결정될 때 호출될 함수
  const handleDuration = (duration) => {
    console.log('Video duration in seconds:', duration)
    setVideoDuration(duration)
  }

  // 동영상 재생 시간이 업데이트될 때 호출될 함수
  const handleProgress = (state) => {
    if (playedSeconds > state.playedSeconds) {
      return
    }
    console.log('Played seconds:', state.playedSeconds)
    setPlayedSeconds(state.playedSeconds)
  }

  const calcPercent = (long, playedSecond) => {
    const percent = playedSecond / long * 100
    console.log(percent)
    return percent
  }

  const fetchVideo = async () => {
    try {
      console.log(`/api/course/stream/${videoId}`)
      const response = await axios.get(`/api/course/stream/${videoId}`, {
        responseType: 'blob' // 바이너리 데이터로 응답 받기
      })
      const mimeType = response.data.type
      const videoBlob = new Blob([response.data], { type: mimeType }) // Blob 객체 생성
      const videoUrl = URL.createObjectURL(videoBlob) // Blob URL 생성
      setVideoUrl(videoUrl)
      console.log("response", response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // ListItem에서의 postMessage를 받아오는 함수
    const handleMessage = (event) => {
      // 'videoId'가 있을때만 처리
      if (event.data && event.data.videoId) {
        console.log('Received message:', event.data)
        setVideoId(event.data.videoId)
        setMemberId(event.data.memberId)
        setPlaybackTime(event.data.playbackTime)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    // 모달이 종료되기전에 실행되는 함수
    const handleBeforeUnload = (event) => {
      const percent = calcPercent(videoDuration, playedSeconds)

      const jsonData = {
        memberId: memberId,
        videoMaterialId: videoId,
        playbackTime: playedSeconds,
        percent: percent,
      }

      // jsonData를 콘솔에 출력
      console.log(jsonData);

      // Blob 객체를 생성하여 Content-Type을 application/json으로 설정
      const blob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

      // navigator.sendBeacon을 사용해 서버에 데이터 전송
      navigator.sendBeacon(`/api/course/save-time`, blob);

      // 사용자에게 경고 메시지를 표시
      const confirmationMessage = '이 페이지를 떠나면 변경사항이 저장되지 않을 수 있습니다.';
      event.returnValue = confirmationMessage; // Chrome에서는 필요
      return confirmationMessage; // 대부분의 다른 브라우저에서는 필요
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [memberId, videoId, playedSeconds]); // 의존성 배열에 변수를 추가

  useEffect(() => {
    if (videoId !== null) {
      fetchVideo()
    }
  }, [videoId])

  const handleReady = () => {
    if (isReady === true) {
      return
    }
    if (playerRef.current) {
      playerRef.current.seekTo(playbackTime) // 10초 지점으로 이동
    }
    setIsReady(true)
  }



  // if (videoUrl === undefined) {
  //   console.log(videoUrl)
  //   return <LoadingPage />
  // }

  return (
    <div className={styles.player}>
      <div className={styles.inner}>
        <ReactPlayer
          ref={playerRef} // ReactPlayer 컴포넌트에 ref 연결
          url={videoUrl}
          playing={false} // 비디오 준비 상태에 따라 재생 여부 결정
          controls={true} // 비디오 컨트롤 표시
          volume={0.8} // 초기 볼륨 설정 (0.0 ~ 1.0)
          loop={false} // 비디오 루프 재생
          width='800px'         // 플레이어 크기 (가로)
          height='600px'
          onDuration={handleDuration} // 동영상이 로드될 때 실행
          onProgress={handleProgress} // 재생 시간이 업데이트될 때 호출
          onReady={handleReady} // 비디오가 준비되었을 때 호출되는 함수
        />
      </div>
    </div>
  )
}

export default VideoPlayer