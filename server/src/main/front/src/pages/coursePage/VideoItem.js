import { useEffect, useState } from "react";
import styles from "./ListItem.module.css"
import styles2 from "./VideoItem.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';

import ProgressBar from 'react-bootstrap/ProgressBar';

const VideoItem = (props) => {
  const navigate = useNavigate()
  const [daysRemaining, setDaysRemaining] = useState()
  const [fileExtension, setFileExtension] = useState()
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [videoLength, setVideoLength] = useState("00:00")

  const handleDeleteVideoFile = async (event) => {
    if (event) {
      event.stopPropagation()
    }
    if (confirm("삭제 하시겠습니까?") === true) {
      try {
        const response = await axios.delete(`/api/videoMaterial/${props.videoId}`)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    props.reRender()
  }

  const checkURL = () => {
    if (props.url === "video") {
      watchVideo()
    }
  }

  const removeExtension = (filename) => {
    const lastIndex = filename.lastIndexOf('.');
    if (lastIndex === -1) return filename; // 확장자가 없다면 그대로 반환
    return filename.substring(0, lastIndex);
  }

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

    const newWindow = window.open("/videoplayer", "_blank", "width=800,height=600");

    try {
      const response = await axios.get(`/api/course/stream/${props.videoId}`, {
        responseType: 'blob' // 바이너리 데이터로 응답 받기
      })
      const videoBlob = new Blob([response.data], { type: mimeType }) // Blob 객체 생성
      const videoUrl = URL.createObjectURL(videoBlob) // Blob URL 생성
      console.log("response", response)
      

      // 새 창이 로드된 후 메시지 전송
      newWindow.onload = function () {
        // response.headers에서 'playback-time' 헤더의 값을 안전하게 가져오기
        const playbackTime = response.headers['playback-time'] ? response.headers['playback-time'] : null;
        // postMessage를 사용하여 새 창에 메시지 전송
        newWindow.postMessage({
          videoUrl: videoUrl,
          videoName: videoName,
          videoId: props.videoId,
          memberId: memberInfoDto.memberId,
          playbackTime: playbackTime
        }, '*');
      }
      newWindow.onclose = props.reRender()

    } catch (error) {
      alert("동영상을 불러올 수 없습니다.")
      console.log(error)
    }
  }

  useEffect(() => {
    if (props.url === "video") {
      const duration = props.videoLength
      let minute
      let second
      if (Math.floor(duration / 60) / 10 === 0) {
        minute = `0${Math.floor(duration / 60)}`
      } else {
        minute = Math.floor(duration / 60)
      }
      if (Math.floor(duration % 60) / 10 === 0) {
        second = `0${Math.floor(duration % 60)}`
      } else {
        second = Math.floor(duration % 60)
      }


      setVideoLength(`${minute}:${second}`)
    }
    setMemberInfoDto(props.memberInfoDto)
  })

  return (
    <>
      <div className={styles.listItem} onClick={checkURL}>
        <div className={styles.flex}>
          <div className={styles.first}>
            {props.url === 'video' && (
              <h3 className={`${styles.fontSize} ${styles.blue}`}>{videoLength !== null ? videoLength : `00:00`}</h3>
            )}
          </div>
          <div className={styles.content}>
            <div className={styles.second}>
              {props.url === 'video' && (
                <h3 className={styles.fontSize}>{removeExtension(props.title)}</h3>
              )}
            </div>
            <div className={`${styles.third} ${styles2.progressBar}`}>
              {props.url === 'video' ?
                <div className={`progress ${styles2.progress}`} role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                  <div className={`progress-bar ${styles2.progressBarPercent}`} style={{width:`${props.percent}%`}}></div>{props.percent}%
                </div> :
                <h3 className={`${styles.fontSize} ${styles.width}`}>{props.contents}</h3>
              }
            </div>
          </div>
        </div>
        <div className={styles.fourth}>
          {props.url === 'video' && (
            <>
              {
                props.memberInfoDto.memberType === "STUDENT" ? null :
                  <button type="button"
                    className={`btn btn-primary ${styles.deleteBtn}`}
                    onClick={(e) => handleDeleteVideoFile(e)}>
                    <IoClose data-tooltip-content='삭제' data-tooltip-id='tooltip' size={25} />
                  </button>
              }
            </>
          )}
        </div>
      </div>
      <Tooltip
        id='tooltip'
        backgroundColor='gray'
        place="top"
        arrowColor='transparent'
      />
    </>
  )
}

export default VideoItem