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

    const watchVideo = () => {
        try {
            const newWindow = window.open("/videoplayer", "_blank", "width=800,height=600");
            newWindow.onload = function () {
                newWindow.postMessage({
                    videoId: props.videoId,
                    memberId: memberInfoDto.memberId,
                    playbackTime: props.playbackTime,
                }, '*')
            }
            const checkWindowClosed = setInterval(() => {
                if (newWindow.closed) {
                    clearInterval(checkWindowClosed);
                    props.reRender();
                }
            }, 500); // 500ms 간격으로 창의 닫힘 상태를 체크

        } catch (error) {
            alert("동영상을 불러올 수 없습니다.")
            console.log(error)
        }
    }

    useEffect(() => {
        if (props.url === "video") {
            const duration = props.videoLength
            let hour = 0
            let minute
            let second
            if (Math.floor(duration / 3600) >= 1) {
                let remain = Math.floor(duration / 60)
                let h = Math.floor(duration / 3600)
                hour = `0${Math.floor(duration / 3600)}`

                if ((remain - h * 60) / 10 < 1) {
                    minute = `0${(remain - h * 60)}`
                } else {
                    minute = remain - h * 60
                }

                if (Math.floor(duration % 60) / 10 < 1) {
                    second = `0${Math.floor(duration % 60)}`
                } else {
                    second = Math.floor(duration % 60)
                }

            } else {
                hour = Math.floor(duration / 3600)
                if (Math.floor(duration / 60) / 10 < 1) {
                    minute = `0${Math.floor(duration / 60)}`
                } else {
                    minute = Math.floor(duration / 60)
                }

                if (Math.floor(duration % 60) / 10 < 1) {
                    second = `0${Math.floor(duration % 60)}`
                } else {
                    second = Math.floor(duration % 60)
                }
            }

            if (hour > 0) {
                setVideoLength(`${hour}:${minute}:${second}`)
            } else {
                setVideoLength(`${minute}:${second}`)
            }

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
                                <div className={`progress ${styles2.progress}`}
                                    role="progressbar"
                                    aria-label="Basic example"
                                    aria-valuenow="0"
                                    aria-valuemin="0"
                                    aria-valuemax="100">
                                    <div className={
                                        `progress-bar
                                        ${styles2.progressBarPercent}
                                        ${props.memberInfoDto.memberType === "PROFESSOR" || props.percent >= 80 ?
                                            styles2.greenColor : styles2.redColor}
                                    `}
                                        style={{ width: `${props.percent}%` }}></div>{props.percent}%
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
                                props.memberInfoDto.memberType === "PROFESSOR" && props.editFlag === true ? <button type="button"
                                    className={`btn btn-primary ${styles.deleteBtn}`}
                                    onClick={(e) => handleDeleteVideoFile(e)}>
                                    <IoClose data-tooltip-content='삭제' data-tooltip-id='tooltip' size={25} />
                                </button> : null

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