import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal"
import styles from "../quizModal/QuizInfoModal.module.css"
import styles2 from "../assignModal/AssignmentModal.module.css"
import Info from "../modalComponents/Info";
import { LuFilePlus2 } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const QaModal = (props) => {
  Modal.setAppElement("#root")
  const [fileDescription, setFileDescription] = useState('')
  const [formattedDate, setFormattedDate] = useState()
  const [attachFiles, setAttachFiles] = useState([])
  const data = props.props
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substring(2); // 연도의 마지막 두 자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = date.getDate().toString().padStart(2, '0'); // 일
    const hours = date.getHours().toString().padStart(2, '0'); // 시간
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분

    // 포맷팅된 문자열 생성
    return `${year}-${month}-${day}`;
  }

  const handleClose = (event) => {
    // setAnswerFlag(false)
    setFileDescription('')
    setAttachFiles([])
    event.stopPropagation()
    props.onRequestClose() // 괄호를 추가하여 함수가 호출되도록 수정
  }

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files) // FileList를 배열로 변환
    setAttachFiles(filesArray)
    console.log(filesArray)
    const files = event.target.files;
    const fileCount = files.length;

    if (fileCount === 1) {
      // 파일이 하나만 선택된 경우, 파일 이름을 표시
      setFileDescription(files[0].name);
    } else if (fileCount > 1) {
      // 여러 파일이 선택된 경우, "파일 n개" 형식으로 표시
      setFileDescription(`이미지 ${fileCount}개`);
    } else {
      // 파일이 선택되지 않은 경우
      setFileDescription('');
    }
  }

  const onAnswerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='commentContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const inputDate = data?.createdAt
    const data1 = formatDate(inputDate);
    setFormattedDate(data1)
  }, [])

  return (
    <Modal className={styles.modalContainer}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }
      }}
      isOpen={props.isOpen}
      onRequestClose={handleClose}>
      <div className={styles.top}>
        <h3 className={styles.title}>{data.title}</h3>
        <button type="button" className={`btn btn-primary ${styles.closeBtn} ${styles.closeBtn2}`} onClick={handleClose}><IoClose /></button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <div className={styles.contents}>
          <Info title={"작성자"} content={data.writer} />
          <Info title={"작성일"} content={formattedDate} />
        </div>
        <div className={styles.contents}>
          {/*답변예정은 yellow, 답변완료는 green*/}
          {
            data.qnAStatus === "RESPONSE_EXPECTED" ?
              <Info title={"답변 여부"}
                content={
                  <h3 className={`${styles.box} ${styles.yellow}`}>
                    답변 예정
                  </h3>} />
              : <Info title={"답변 여부"}
                content={
                  <h3 className={`${styles.box} ${styles.green}`}>
                    답변 완료
                  </h3>} />
          }
          {/* 비밀글 받고 출력 */}
          {
            data.secret === true ? <Info title={"공개 여부"} content={"비밀글"} />
              : <Info title={"공개 여부"} content={"공개글"} />
          }

          <Info title={"조회수"} content={data.views} />
        </div>
        <div className={styles.contents}>
          <Info title={"설명"} content={data.content} />
        </div>
        <div className={styles2.contents}>
          <div className={styles2.fileTop}>
            <h3 className={styles2.title}>첨부 파일</h3>
            <label htmlFor="fileInput" className={`btn btn-primary ${styles2.fileBtn}`}>
              <LuFilePlus2 size={20} />
              {fileDescription && <span>{fileDescription}</span>}
            </label>
            <input type="file"
              accept="*"
              id="fileInput"
              className={`form-control ${styles.imageInput}`}
              onChange={handleFileChange}
              style={{ display: "none" }}
              multiple></input>
          </div>
          {
            data.materials?.map((material) => (
              <div className={styles2.fileItem}>
                <h3 style={{ fontSize: "1.25rem" }}>L {material.fileName}</h3>
                <button type="button" className={`btn btn-primary ${styles2.fileDeleteBtn}`}>
                  <IoClose size={20} />
                </button>
              </div>
            ))
          }
          {
            attachFiles?.map((material) => (
              <div className={styles2.fileItem}>
                <h3 style={{ fontSize: "1.25rem" }}>L {material.name}</h3>
                <button type="button" className={`btn btn-primary ${styles2.fileDeleteBtn}`}>
                  <IoClose size={20} />
                </button>
              </div>
            ))
          }
        </div>
        <div className={styles2.contents}>
          <div className={styles2.fileTop}>
            <h3 className={styles2.title}>댓글</h3>
          </div>
          <div className={styles2.commentList}>
            <h3 className={styles2.comment}>댓글이여asdfasdfasdfadsfasdfasdfasdfdsfasdfadfadsfasdfasdfasdfdsfasdfadfadsfasdfasdfasdfdsfasdfadafas</h3>
          </div>
        </div>
      </div>
      <textarea
        rows={1}
        className="form-control"
        placeholder="댓글을 입력하세요..."
        style={{ overflowY: "hidden" }} // 세로 스크롤 제거
        onClick={onAnswerClick}
      />
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`} onClick={handleClose}>닫기</button>
        <button className={`btn btn-primary ${styles.goBtn}`}>수정 하기</button>
      </div>
    </Modal>
  );
};

export default QaModal;
