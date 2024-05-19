import { useEffect, useState } from "react"
import Sidebar from "../../../sidebar/CourseSidebars"
import styles from "../doQuiz/DoQuiz.module.css"
import { Bs1Square, Bs2Square, Bs3Square, Bs4Square } from 'react-icons/bs'
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import LoadingPage from "../../mainPage/LoadingPage"
import ReactMarkdown from 'react-markdown'
import RelatedQuizModal from "../../../modals/quizModal/RelatedQuizModal"

const QuizAnswer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state.props // 이곳에서 사용될 데이터
  const enrollmentId = data.enrollmentId
  const optionIcon = [<Bs1Square size={27} />, <Bs2Square size={27} />, <Bs3Square size={27} />, <Bs4Square size={27} />]
  const quizId = location.state.props.quizId
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [indexOfOptions, setIndexOfOptions] = useState(0) // 문제 번호
  const [questions, setQuestions] = useState([])
  const [answer, setAnswer] = useState({})
  const [explane, setExplane] = useState("")
  const [relatedQuiz, setRelatedQuiz] = useState({})
  const [explanes, setExplanes] = useState({}) // explanes를 상태로 관리
  const [score, setScore] = useState(0)
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    console.log("open")
    setModalIsOpen(true)
  }

  const closeModal = (event) => {
    console.log("close")
    setModalIsOpen(false)
    setRelatedQuiz({}) // 관련 퀴즈 누를 때 마다 다른 퀴즈 나옴
    if (event) {
      // 이벤트 버블링을 막음
      event.stopPropagation()
    }
  }

  // const minusIndex = () => {
  //   if (indexOfOptions == 0) {
  //   } else {
  //     setIndexOfOptions(indexOfOptions - 1)
  //   }
  //   setExplane(explanes.get(indexOfOptions -1)) // 설명 초기화
  // }

  // const plusIndex = () => {
  //   if (indexOfOptions == questions.length - 1) {
  //   } else {
  //     setIndexOfOptions(indexOfOptions + 1)
  //   }
  //   setExplane(explanes.get(indexOfOptions + 1)) // 설명 초기화
  // }

  const minusIndex = () => {
    if (indexOfOptions > 0) {
      const newIndex = indexOfOptions - 1;
      setIndexOfOptions(newIndex);
      // explanes 객체에서 newIndex 키의 존재를 검사하고 값을 설정
      const explanation = newIndex in explanes ? explanes[newIndex] : "";
      setExplane(explanation);
    }
  };

  const plusIndex = () => {
    if (indexOfOptions < questions.length - 1) {
      const newIndex = indexOfOptions + 1;
      setIndexOfOptions(newIndex);
      // explanes 객체에서 newIndex 키의 존재를 검사하고, 값을 설정
      const explanation = newIndex in explanes ? explanes[newIndex] : "";
      setExplane(explanation);
    }
  };

  const backToPreviousPage = () => {
    sessionStorage.clear() // 페이지 이동시 세션스토리지에 저장된 모든 정보 삭제
    navigate(-1); // 이전 페이지로 이동
  }

  const changeQuestion = (index) => {
    setIndexOfOptions(index)
    const explanation = index in explanes ? explanes[index] : "";
    setExplane(explanation);
  }

  const getExplane = async () => {
    setExplane("해설 생성 중..");
    try {
      const question = {
        answer: questions[indexOfOptions].answer,
        id: questions[indexOfOptions].id,
        options: questions[indexOfOptions].options,
        question: questions[indexOfOptions].question,
        type: questions[indexOfOptions].type,
      };
      // question 객체를 JSON 문자열로 만들고, 이를 다시 string으로 만듭니다.
      const questionString = JSON.stringify(question);
      console.log("sending question : ", questionString)

      // URLSearchParams를 사용하여 form 데이터를 생성합니다.
      const formData = new URLSearchParams();
      formData.append('question', questionString);

      const response = await fetch(`http://43.200.202.59:5000/aimodule/get-explane`, {
        method: 'POST',
        body: formData,  // form-data 형식으로 Body 설정
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',  // Header 설정 수정
        },
      });

      const reader = response.body.getReader();
      let explaneText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const chunk = new TextDecoder().decode(value);
        for (let char of chunk) {
          explaneText += char;
          setExplane(explaneText); // 화면에 한 글자씩 출력
          await new Promise(resolve => setTimeout(resolve, 10)); // 글자 사이의 딜레이
        }
      }

      setExplanes(prevExplanes => ({
        ...prevExplanes,
        [indexOfOptions]: explaneText
      })); // 상태 업데이트
    } catch (error) {
      console.log(error);
      setExplane("오류가 발생했습니다.");
    }
  };


  const getRelatedQuiz = async () => {
    openModal()
    try {
      const formData = new FormData()
      const question = {
        answer: questions[indexOfOptions].answer,
        id: questions[indexOfOptions].id,
        options: questions[indexOfOptions].options,
        question: questions[indexOfOptions].question,
        type: questions[indexOfOptions].type,
      }
      formData.append("question", JSON.stringify(question))
      const response = await axios.post(`http://43.200.202.59:5000/aimodule/related-quiz`, formData)
      console.log(response)
      setRelatedQuiz(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const fetchQuizAnswer = async () => {
    try {
      const quizResponse = await axios.get(`http://43.200.202.59:5000/aimodule/get-quiz/${quizId}`, {
        withCredentials: true, // 세션 쿠키를 사용하기 위해 필요
        credentials: 'include', // credentials를 포함하는 요청으로 설정
      })
      console.log("quizResponse : ", quizResponse)

      // 학생일때만 업데이트
      if (location.state.props.memberInfoDto.memberType === "STUDENT") {
        const userAnswer = await axios.get(`/api/answers/${quizId}`, {
          withCredentials: true, // 세션 쿠키를 사용하기 위해 필요
        })
        console.log("answerResponse : ", userAnswer)
        const answer = userAnswer.data.answerDto.answers
        const score = userAnswer.data.answerDto.score
        console.log("userAnswer : ", answer)
        setScore(score)
        setAnswer(answer)
      }

      if (location.state.props.memberInfoDto.memberType === "PROFESSOR") {
        let answerData = {}

        quizResponse.data.questions.map((question, i) => (
          answerData[`${i + 1}`] = question.answer
        ))

        setScore(100)
        setAnswer(answerData)
      }

      const questionData = quizResponse.data.questions.map((quiz) => quiz)

      setQuestions(questionData)

      console.log("questionData : ", questionData)
      console.log("memberinfoDto :", location.state.props.memberInfoDto)
      setMemberInfoDto(location.state.props.memberInfoDto)
      setDivision(location.state.props.courseDto.division)
      setLectureName(location.state.props.courseDto.lectureName)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchQuizAnswer()
  }, [])

  if (!questions) return <LoadingPage />;

  return (
    <div className={`background`}>
      <RelatedQuizModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        relatedQuiz={relatedQuiz} />
      <Sidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <div className={`mycontainer`}>
        <div className={`bg`}>
          <div className={styles.right}>
            <div className={styles.quizInfo}>
              <h3 className={styles.fontSize5xl}>{data.quizName}</h3>
              <div className={styles.quizInfoRight}>
                <h3 className={styles.fontSize5xl}>{data.courseDto.lectureName}</h3>
                <h3 className={styles.fontSize5xl}>{data.courseDto.division}</h3>
                <button type="button"
                  onClick={backToPreviousPage}
                  className={`btn btn-primary ${styles.backBtn}`}>나가기</button>
              </div>
            </div>
            <div className={styles.rightBottom}>
              <div className={styles.answerQuizContainer}>
                {questions.length > 0 && questions[indexOfOptions] && (
                  <h3 className={styles.question}>{questions[indexOfOptions].question}</h3>
                )}
                <h3 className={styles.questionNumber}>{indexOfOptions + 1} of {questions.length}</h3>
                <div className={styles.choice}>
                  {/* 정답 출력하는 부분 */}
                  {
                    questions[indexOfOptions] && questions[indexOfOptions]?.type === "choice" ?
                      (
                        optionIcon.map((num, i) => {
                          // 현재 옵션이 정답이면 무조건 초록색
                          return (questions[indexOfOptions].options[i] === questions[indexOfOptions].answer) ?
                            <div className={`${styles.answerOption} ${styles.correct}`} key={i}>
                              {num}
                              {questions[indexOfOptions].options[i] && (
                                <h3 className={styles.optionText}>{questions[indexOfOptions].options[i]}</h3>
                              )}
                            </div> :
                            // 정답이 아니고 유저가 고른 답이면 빨간색
                            questions[indexOfOptions].options[i] === answer[indexOfOptions + 1] ?
                              <div className={`${styles.answerOption} ${styles.wrong}`} key={i}>
                                {num}
                                {questions[indexOfOptions].options[i] && (
                                  <h3 className={styles.optionText}>{questions[indexOfOptions].options[i]}</h3>
                                )}
                              </div> :
                              // 그것도 아니면 기본
                              <div className={styles.answerOption} key={i}>
                                {num}
                                {questions[indexOfOptions].options[i] && (
                                  <h3 className={styles.optionText}>{questions[indexOfOptions].options[i]}</h3>
                                )}
                              </div>
                        })
                      )
                      :
                      (<>
                        <textarea
                          value={answer[questions[indexOfOptions]?.id] || ''}
                          readOnly
                          className={`${questions[indexOfOptions]?.answer === answer[indexOfOptions + 1] ?
                            styles.correct : styles.wrong}`}
                        ></textarea>
                        <h4>정답 : {questions[indexOfOptions]?.answer}</h4>
                      </>)
                  }
                </div>
                <div className={styles.answerContainer}>
                  {explane === "" ? <p>해설 생성 가능</p> :
                    <ReactMarkdown >{explane}</ReactMarkdown>}
                </div>
                <div className={styles.buttons}>

                  <button type="button"
                    className={`btn btn-secondary`}
                    style={{ border: 'none' }}
                    onClick={minusIndex}>이전 문제</button>
                  <button type="button"
                    className={`btn btn-primary ${styles.featureBtn}`}
                    onClick={plusIndex}>다음 문제</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.left}>
            <div className={styles.leftTime}>
              <h3 className={styles.fontSize5xl}>점수</h3>
              <h3 className={styles.fontSize31xl}>{score}</h3>
            </div>
            <div className={styles.numberNav}>
              {Array.from({ length: questions.length }).map((_, i) => {
                return (
                  <div className={`${styles.quizNavBtn} ${questions[i].answer === answer[i + 1] ?
                    styles.correct : styles.wrong}`}
                    onClick={() => changeQuestion(i)}>
                    <h3>{i + 1}</h3>
                  </div>
                )
              })}
            </div>
            <div className={styles.notice}>
              <h3 className={styles.fontSizeBase}>주의 사항</h3>
              <h3 className={styles.fontSizeBase}></h3>
            </div>
            <div className={styles.answerFeatureBtns}>
              <button type="button" className={`btn btn-primary ${styles.featureBtn}`} onClick={getExplane}>해설 생성</button>
              <button type="button" className={`btn btn-primary ${styles.featureBtn}`} onClick={getRelatedQuiz}>관련 문제 더 풀어보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizAnswer;
