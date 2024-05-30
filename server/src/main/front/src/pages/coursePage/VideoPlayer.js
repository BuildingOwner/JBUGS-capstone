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
  const [percent, setPercent] = useState(0)
  const playerRef = useRef(null) // ReactPlayer 컴포넌트에 대한 ref를 생성

  // 동영상 길이가 결정될 때 호출될 함수
  const handleDuration = (duration) => {
    setVideoDuration(duration)
  }

  const handleProgress = (state) => {
    // 사용자가 재생 위치를 후퇴시키려고 하는 경우, 함수를 종료
    if (playedSeconds > state.playedSeconds) {
      return
    }

    // 동영상 재생 진행률이 80% 미만이고 사용자가 10초 이상 빨리 건너뛰려고 시도하는 경우
    if (percent < 80 && state.playedSeconds > playedSeconds + 5) {
      // 10초 후로 건너뛰기를 방지하기 위해 원래 위치로 되돌림
      playerRef.current.seekTo(playedSeconds)
    } else if (percent >= 80) {
      // 동영상 재생 진행률이 80% 이상인 경우, 사용자가 10초 이상 건너뛰려고 해도 특별한 제한을 두지 않음
      // 정상적인 재생인 경우, 재생된 시간을 업데이트
      setPlayedSeconds(state.playedSeconds)
    } else {
      // 그 외의 모든 경우 (예: 동영상 재생 진행률이 80% 미만이지만 10초 미만으로 건너뛰는 경우)
      // 재생된 시간을 업데이트
      setPlayedSeconds(state.playedSeconds)
    }
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
        setPercent(event.data.percent)
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
      playerRef.current.seekTo(playbackTime)
    }
    setIsReady(true)
  }

  useEffect(() => {
    // 컴포넌트가 마운트될 때 `playbackTime`으로 이동
    if (playerRef.current) {
      playerRef.current.seekTo(playbackTime);
      setPlayedSeconds(playbackTime);
    }
  }, [playbackTime]);
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