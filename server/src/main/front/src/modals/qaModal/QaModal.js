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
  const [attachFiles, setAttachFiles] = useState([]) // 업데이트 할 파일들 (new files)
  const [prevFiles, setPrevFiles] = useState([]) // 받아온 파일들
  const [comment, setComment] = useState("")
  const [startFlag, setStartFlag] = useState(false)
  const data = props.props
  const commentss = data.comment
  const [responseComment, setResponseComment] = useState("")
  const [commentData, setCommentData] = useState([])

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

  // 파일 삭제 함수
  const handleDeleteFile = (index) => {
    // 배열에서 index에 해당하는 요소를 제거합니다.
    const newFiles = attachFiles.filter((_, i) => i !== index)
    const fileCount = newFiles.length
    setAttachFiles(newFiles) // 상태를 업데이트합니다.

    if (fileCount === 1) {
      // 파일이 하나만 선택된 경우, 파일 이름을 표시
      setFileDescription(newFiles[0].name);
    } else if (fileCount > 1) {
      // 여러 파일이 선택된 경우, "파일 n개" 형식으로 표시
      setFileDescription(`이미지 ${fileCount}개`);
    } else {
      // 파일이 선택되지 않은 경우
      setFileDescription('');
    }
  }

  // 파일 삭제 함수
  const handleDeletePrevFile = (index, event) => {
    if (event) {
      event.stopPropagation()
    }
    console.log("실행")
    // 배열에서 index에 해당하는 요소를 제거합니다.
    const newFiles = prevFiles.filter((_, i) => i !== index)
    const fileCount = newFiles.length
    setPrevFiles(newFiles) // 상태를 업데이트합니다.
  }
  const parseCommentString = (commentString) => {
    if (!commentString) {
      return []
    }

    const comments = []
    const commentPairs = commentString.split("writer:").filter(Boolean)

    commentPairs.forEach(pair => {
      const [writer, content] = pair.split("content:")
      if (writer && content) {
        comments.push({ writer: writer.trim(), content: content.trim() })
      }
    })

    console.log(comments)
    return comments
  }

  const makeComment = async () => {
    try {
      console.log("writer:", data.memberInfoDto.memberName)
      console.log("content:", comment)

      // 댓글을 서버에 전송
      const response = await axios.post(`/api/course/qna/${data.qnaId}/comment`, null, {
        params: {
          comment: `${responseComment} writer:${data.memberInfoDto.memberName} content:${comment}`
        }
      })

      console.log(response)

      // 서버로부터 받은 새로운 댓글 문자열을 파싱하여 댓글 객체 배열로 변환
      const newComments = parseCommentString(`writer:${data.memberInfoDto.memberName} content:${comment}`)

      // 기존 댓글 데이터에 새 댓글을 추가
      setCommentData(prevCommentData => [...prevCommentData, ...newComments])
      setComment("")
      data.reRender()
      console.log(newComments)
    } catch (error) {
      console.log(error)
    }
  }


  const downloadFile = async (index) => {
    const fileName = props.props.materials[index].fileName
    const fileSplit = fileName.split(".")
    const length = fileSplit.length
    const extension = fileSplit[length - 1]
    try {
      // axios.get 메소드를 사용하여 비동기 요청을 수행하고, 응답을 response 변수에 저장
      const response = await axios.get(`/api/course/files/download/${fileName}`
        , {
          responseType: 'blob', // 파일 다운로드를 위해 응답 타입을 blob으로 설정
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요
        })

      // 서버에서 받은 응답 데이터를 Blob 객체로 감싸고, 그 객체를 사용하여 다운로드할 수 있는 URL 생성
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data], { type: `application/${extension}` }))

      // 'a' 요소를 생성하여 link라는 이름의 상수에 할당 (이 요소는 다운로드 링크를 나타냄)
      const link = document.createElement('a')

      // 'a' 요소의 href 속성을 다운로드할 URL인 downloadUrl로 설정
      link.href = downloadUrl

      // 'a' 요소의 download 속성을 설정하여 파일 이름을 지정
      link.setAttribute('download', `${fileName}`)

      // 'a' 요소를 문서의 본문(body)에 추가
      document.body.appendChild(link);

      // 'a' 요소를 클릭하여 다운로드를 시작
      link.click()

      // 'a' 요소를 문서에서 제거
      link.remove()

    } catch (error) {
      console.error('Error while downloading the PDF:', error);
      alert("파일을 받을 수 없습니다.")
    }
  }

  const handleClose = (event) => {
    // setAnswerFlag(false)
    setFileDescription('')
    setAttachFiles([])
    event.stopPropagation()
    setStartFlag(!startFlag)
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

  useEffect(() => {
    const inputDate = data?.createdAt
    const data1 = formatDate(inputDate);
    setFormattedDate(data1)
    setResponseComment(data?.comment)
    setPrevFiles(data?.materials)
    setCommentData(parseCommentString(data?.comment))
    console.log(props)
  }, [startFlag]) // 모달이 닫히면 다시 렌더링이 일어남

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
            {
              data.writer === data.memberName ?
                <>
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
                    multiple>
                  </input>
                </>
                : null
            }
          </div>
          {prevFiles.length > 0 ?
            prevFiles.map((material, i) => (
              <div className={styles2.fileItem} onClick={() => downloadFile(i)}>
                <h3 style={{ fontSize: "1.25rem" }}>L {material.fileName}</h3>
                <button type="button"
                  className={`btn btn-primary ${styles2.fileDeleteBtn}`}
                  onClick={(e) => handleDeletePrevFile(i, e)}>
                  <IoClose size={20} />
                </button>
              </div>
            )) : null
          }
          {
            attachFiles?.map((material) => (
              <div className={styles2.fileItem}>
                <h3 style={{ fontSize: "1.25rem" }}>L {material.name}</h3>
                <button type="button"
                  className={`btn btn-primary ${styles2.fileDeleteBtn}`}
                  onClick={() => handleDeleteFile(i)}>
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
            {
              // 댓글이 있을 시에 출력
              commentData?.length > 0 ?
                commentData.map((comment) => (
                  <div className={`${styles2.comment} ${console.log(props)}
                  ${comment.isProfessor === true ? styles2.profComment : null}`}>
                    <h4 className={styles.commentWriter}>{comment.writer}</h4>
                    <h4 className={styles.commentContent}>{comment.content}</h4>
                  </div>
                ))
                : null
            }
          </div>
        </div>
        <textarea
          rows={1}
          className="form-control"
          placeholder="댓글을 입력하세요..."
          value={comment}
          style={{ overflowY: "hidden" }} // 세로 스크롤 제거
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={`btn btn-primary ${styles.goBtn}`} onClick={makeComment}>댓글 남기기</button>
      </div>
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`} onClick={handleClose}>닫기</button>
        {
          data.writer === data.memberName ?
            <>
              <button className={`btn btn-primary ${styles.goBtn}`}>수정 하기</button>
            </>
            : null
        }
      </div>
    </Modal>
  );
};

export default QaModal;
