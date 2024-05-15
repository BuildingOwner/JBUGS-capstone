import Sidebar from "../../../sidebar/CourseSidebars";
import styles from "./DoQuiz.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bs1Square, Bs2Square, Bs3Square, Bs4Square } from 'react-icons/bs'
import axios from "axios";
import LoadingPage from "../../mainPage/LoadingPage";

const DoQuiz = (props) => {
  const navigate = useNavigate()
  const data = useLocation().state.props // 이곳에서 사용될 데이터
  console.log("data", data)
  const enrollmentId = data.enrollmentId
  const optionIcon = [<Bs1Square size={27} />, <Bs2Square size={27} />, <Bs3Square size={27} />, <Bs4Square size={27} />]
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [indexOfOptions, setIndexOfOptions] = useState(0)
  const quizId = data.quizId
  const [questions, setQuestions] = useState([])
  const [answer, setAnswer] = useState({})
  const [score, setScore] = useState()
  const [checked, setChecked] = useState({});

  const minusIndex = () => {
    if (indexOfOptions == 0) {
    } else {
      setIndexOfOptions(indexOfOptions - 1)
    }
  }

  const plusIndex = () => {
    if (indexOfOptions == questions.length - 1) {
    } else {
      setIndexOfOptions(indexOfOptions + 1)
    }
  }

  const changeQuestion = (index) => {
    setIndexOfOptions(index)
  }

  const backToPreviousPage = () => {
    sessionStorage.clear() // 페이지 이동시 세션스토리지에 저장된 모든 정보 삭제
    navigate(-1); // 이전 페이지로 이동
  }

  const changeAnswer = (e, i) => {
    let updatedAnswer;
    if (questions[indexOfOptions].type === "choice") {
      // 선택지를 클릭한 경우
      updatedAnswer = {
        ...answer,
        [questions[indexOfOptions].id]: e.target.textContent,
      };
      console.log("questions id : ", questions[indexOfOptions].id)
      setChecked(prevChecked => ({
        ...prevChecked,
        [indexOfOptions]: i
      }))
    } else {
      // textarea에서 입력한 경우
      updatedAnswer = {
        ...answer,
        [questions[indexOfOptions].id]: e.target.value,
      }
      console.log("questions id : ", questions[indexOfOptions].id)
      setChecked(prevChecked => ({
        ...prevChecked,
        [indexOfOptions]: "ok"
      }))
    }

    console.log("updatedAnswer : ", updatedAnswer)
    setAnswer(updatedAnswer)

  }

  const submitQuiz = async () => {
    try {
      const finalScore = await fetchScore(answer)

      // 서버로 전송할 데이터 객체 생성
      const dataToSend = {
        "studentId": data.memberInfoDto.studentId,
        "quizId": data.quizId,
        "answers": answer,
        "score": finalScore,
      }
      console.log("보내는 객체 : ", dataToSend)
      // axios를 사용하여 서버로 데이터 전송
      const response = await axios.post(`/api/answers/${quizId}`, dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("response answer : ", response)
    } catch (error) {
      console.error("Quiz 제출 중 에러 발생:", error);
      if (error.response) {
        // 서버로부터의 응답이 에러에 포함되어 있는 경우
        console.error("Server response:", error.response);
      }
    }
    navigate("/quizlist", { state: { enrollmentId: enrollmentId } })
  }

  const fetchScore = async (studentAnswer) => {
    console.log("questions : ", questions)
    console.log("studentAnswer : ", studentAnswer)

    let scoreCount = 0
    questions.forEach((question) => {
      // question.id를 사용하여 studentAnswer 객체에서 해당 질문의 학생 답안을 찾음
      const studentAns = studentAnswer[question.id]
      // 학생의 답안과 정답을 비교
      if (studentAns === question.answer) {
        scoreCount += 1 // 정답인 경우 scoreCount 증가
        console.log(`${question.id}가 정답`)
      }
    })

    // 최종 점수 계산 및 출력
    const finalScore = 100.00 / questions.length * scoreCount
    const finalScoreInt = Math.round(finalScore);
    console.log("점수 : ", finalScoreInt)
    setScore(finalScoreInt)

    return finalScoreInt
  }

  function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // 배열에 남아있는 요소가 없을 때까지 반복
    while (currentIndex !== 0) {

      // 남은 요소 중에서 무작위로 하나를 선택
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // 현재 요소와 무작위로 선택된 요소를 교환
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array; // 함수는 수정된 배열을 반환하지만, 이는 선택적입니다.
  }

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/aimodule/get-quiz/${quizId}`, {
        withCredentials: true, // 세션 쿠키를 사용하기 위해 필요
        credentials: 'include', // credentials를 포함하는 요청으로 설정
      })
      console.log("quiz가 받은 response : ", response)

      const questionData = response.data.questions.map((quiz) => quiz)
      console.log("questionData : ", questionData)

      shuffleArray(questionData) // 셔플 (오류발생중)
      console.log("셔플 후 questionData : ", questionData)

      setQuestions(questionData)
      setMemberInfoDto(data.memberInfoDto)
      setLectureName(data.courseDto.lectureName)
      setDivision(data.courseDto.division)
    }
    catch (error) {
      if (error.response?.status === 401) {
        navigate("/")
      } else {
        // 다른 종류의 오류 발생
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchQuiz()
  }, [])

  if (!questions) return <LoadingPage />;

  return (
    <div className={`background`}>
      <Sidebar enrollmentId={data.enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <div className={`mycontainer`}>
        <div className={`bg`}>
          <div className={styles.right}>
            <div className={styles.quizInfo}>
              <h3 className={styles.fontSize5xl}>{data.quizName}</h3>
              <div className={styles.quizInfoRight}>
                <h3 className={styles.fontSize5xl}>{data?.courseDto.lectureName}</h3>
                <h3 className={styles.fontSize5xl}>{division}</h3>
                <button type="button"
                  onClick={backToPreviousPage}
                  className={`btn btn-primary ${styles.backBtn}`}>나가기</button>
              </div>
            </div>
            <div className={styles.rightBottom}>
              <div className={styles.quizContainer}>
                {questions.length > 0 && questions[indexOfOptions] && (
                  <h3 className={styles.question}>{questions[indexOfOptions].question}</h3>
                )}
                <h3 className={styles.questionNumber}>{indexOfOptions + 1} of {questions.length}</h3>
                <div className={styles.choice}>
                  {
                    questions[indexOfOptions] && questions[indexOfOptions].type === "choice" ?
                      (optionIcon.map((num, i) => {
                        return (
                          <div className={`${styles.option} ${indexOfOptions in checked && checked[indexOfOptions] == i ? styles.checked : null}`} key={i} onClick={(e) => changeAnswer(e, i)}>
                            {num}
                            {questions[indexOfOptions].options[i] && (
                              <h3 className={styles.optionText}>{questions[indexOfOptions].options[i]}</h3>
                            )}
                          </div>
                        )
                      })) :
                      <textarea
                        value={answer[questions[indexOfOptions]?.id] || ''}
                        onChange={changeAnswer}
                      ></textarea>
                  }
                </div>
                <div className={styles.buttons}>
                  <button type="button"
                    className={`btn btn-secondary`}
                    style={{ border: 'none' }}
                    onClick={minusIndex}>이전 문제</button>
                  {indexOfOptions === questions.length - 1 ?
                    <button type="button"
                      className={`btn btn-primary ${styles.featureBtn} ${styles.done}`}
                      onClick={submitQuiz}>퀴즈 제출</button>
                    : <button type="button"
                      className={`btn btn-primary ${styles.featureBtn}`}
                      onClick={plusIndex}>다음 문제</button>}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.left}>
            <div className={styles.leftTime}>
              <h3 className={styles.fontSize5xl}>남은 시간</h3>
              <h3 className={styles.fontSize31xl}>3 : 17</h3>
            </div>
            <div className={styles.numberNav}>
              {Array.from({ length: questions.length }).map((_, i) => {
                return (
                  <div className={`${styles.quizNavBtn} ${i in checked ? styles.checked : null}`} onClick={() => changeQuestion(i)}>
                    <h3>{i + 1}</h3>
                  </div>
                )
              })}
            </div>
            <div className={styles.notice}>
              <h3 className={styles.fontSizeBase}>주의 사항</h3>
              <h3 className={styles.fontSizeBase}></h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoQuiz;
