import { useEffect, useState } from "react";
import Sidebar from "../../../sidebar/Sidebar";
import styles from "../doQuiz/DoQuiz.module.css";
import { Bs1Square, Bs2Square, Bs3Square, Bs4Square } from 'react-icons/bs'
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizAnswer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state.props // 이곳에서 사용될 데이터
  console.log(data)
  const enrollmentId = data.enrollmentId
  console.log("enrollmentId : ", enrollmentId)
  const optionIcon = [<Bs1Square size={27} />, <Bs2Square size={27} />, <Bs3Square size={27} />, <Bs4Square size={27} />]
  const quizId = location.state.props.quizId
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [indexOfOptions, setIndexOfOptions] = useState(0)
  const [questions, setQuestions] = useState([])
  const [answer, setAnswer] = useState({})

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

  const backToPreviousPage = () => {
    sessionStorage.clear() // 페이지 이동시 세션스토리지에 저장된 모든 정보 삭제
    navigate(-1); // 이전 페이지로 이동
  }

  const fetchQuizAnswer = async () => {
    try {
      const quizResponse = await axios.get(`http://localhost:5000/get-quiz/${quizId}`, {
        withCredentials: true, // 세션 쿠키를 사용하기 위해 필요
        credentials: 'include', // credentials를 포함하는 요청으로 설정
      })
      // const answerResponse = await axios.get()

      console.log("quizAnswer response : ", quizResponse)
      const questionData = quizResponse.data.questions.map((quiz) => quiz)
      setQuestions(questionData)
      console.log("questionData : ", questionData)

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

  return (
    <div className={`background`}>
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
                  {questions[indexOfOptions] && questions[indexOfOptions]?.type === "choice" ?
                    (optionIcon.map((num, i) => {
                      questions[indexOfOptions].options[i] === questions[indexOfOptions].answer ?
                      console.log("hi")
                        // <div className={styles.correct} key={i}>
                        //   {num}
                        //   {questions[indexOfOptions].options[i] && (
                        //     <h3 className={styles.optionText}>{questions[indexOfOptions].options[i]}</h3>
                        //   )}
                        // </div>
                        : 
                        // : <div className={styles.wrong} key={i}>
                        //   {num}
                        //   {questions[indexOfOptions].options[i] && (
                        //     <h3 className={styles.optionText}>{questions[indexOfOptions].options[i]}</h3>
                        //   )}
                        // </div>
                        console.log("eeee")
                    }))
                    :
                    (<textarea
                      value={answer[questions[indexOfOptions]?.id] || ''}
                    ></textarea>)
                  }
                  {/* {i번째 보기가 정답인 경우 style.correct, 
                          오답인 경우 style.wrong 클래스 넣으면 됨 유저가 찍은 답을 먼저 
                          wrong클래스 넣고 그다음 정답을 correct넣으면 알아서 초록색으로 될껴} */}
                  {/* {optionIcon.map((num, i) => {
                    return (
                      <div className={styles.answerOption}>
                        {num}
                        
                        <h3 className={styles.optionText}>{i}번 보기</h3>
                      </div>
                    )
                  })} */}
                </div>
                <p className={styles.answerContainer}>해설 생성 가능</p>
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
              <h3 className={styles.fontSize5xl}>남은 시간</h3>
              <h3 className={styles.fontSize31xl}>3 : 17</h3>
            </div>
            <div className={styles.numberNav}>
              {/* 문제 받아오는 코드 작성 후 만들 예정 */}
              asd
            </div>
            <div className={styles.notice}>
              <h3 className={styles.fontSizeBase}>주의 사항</h3>
              <h3 className={styles.fontSizeBase}>asdf</h3>
            </div>
            <div className={styles.answerFeatureBtns}>
              <button type="button" className={`btn btn-primary ${styles.featureBtn}`}>해설 생성</button>
              <button type="button" className={`btn btn-primary ${styles.featureBtn}`}>관련 문제 더 풀어보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizAnswer;
