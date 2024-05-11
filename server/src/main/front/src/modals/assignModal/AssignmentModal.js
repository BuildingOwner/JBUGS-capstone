import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal"
import styles from "../quizModal/QuizInfoModal.module.css"
import styles2 from "./AssignmentModal.module.css"
import Info from "../modalComponents/Info";
import { LuFilePlus2 } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const AssignmentModal = (props) => {
  Modal.setAppElement("#root")

  const [fileDescription, setFileDescription] = useState('');

  const handleFileChange = (event) => {
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
      onRequestClose={props.onRequestClose}>
      <div className={styles.top}>
        <h3 className={styles.title}>공지 제목</h3>
        <button type="button" className={`btn btn-primary ${styles.closeBtn} ${styles.closeBtn2}`} onClick={props.onRequestClose}><IoClose /></button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <div className={styles.contents}>
          <Info title={"종료 일시"} content={"2024-10-10"} />
          <Info title={"마감 기한"} content={"2024-10-10"} />
        </div>
        <div className={styles.contents}>
          <Info title={"제출 여부"} content={<h3 className={`${styles.box} ${styles.red}`}>미제출</h3>} /> {/*미제출은 red, 제출완료는 green*/}
          <Info title={"최종 수정 일시"} content={"2024-10-10"} />
        </div>
        <div className={styles.contents}>
          <Info title={"설명"} content={"설명임"} />
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
          <div className={styles2.fileItem}>
            <h3 style={{ fontSize: "1.25rem" }}>L 파일 이름</h3>
            <button type="button" className={`btn btn-primary ${styles2.fileDeleteBtn}`}>
              <IoClose size={20} />
            </button>
          </div>
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
      />
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`} onClick={props.onRequestClose}>닫기</button>
        <button className={`btn btn-primary ${styles.goBtn}`}>해설 보기</button>
      </div>
    </Modal>
  );
};

export default AssignmentModal;
