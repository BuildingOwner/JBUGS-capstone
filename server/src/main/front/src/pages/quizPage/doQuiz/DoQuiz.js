import Sidebar from "../../../sidebar/Sidebar";
import QuizInfo from "../quizComponents/QuizInfo";
import Option1 from "../quizComponents/Option1";
import styles from "./DoQuiz.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bs1Square, Bs2Square, Bs3Square, Bs4Square } from 'react-icons/bs'
import axios from "axios";

const DoQuiz = () => {
  const optionIcon = [<Bs1Square size={27} />, <Bs2Square size={27} />, <Bs3Square size={27} />, <Bs4Square size={27} />]
  const navigate = useNavigate()
  const data = useLocation().state.props // 이곳에서 사용될 데이터
  const [indexOfOptions, setIndexOfOptions] = useState(0)
  const quizId = data.quizId
  console.log("DoQuiz의 data : ", data)
  const [questions, setQuestions] = useState([])

  const minusIndex = () => {
    if (indexOfOptions == 0) {
    } else {
      setIndexOfOptions(indexOfOptions - 1)
    }
  }

  const plusIndex = () => {
    if (indexOfOptions == 9) {
    } else {
      console.log(questions[indexOfOptions].options)
      setIndexOfOptions(indexOfOptions + 1)
    }
  }

  const backToPreviousPage = () => {
    navigate(-1); // 이전 페이지로 이동
  }

  const submitQuiz = () => {

  }
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/get-quiz/${quizId}`, {
          withCredentials: true, // 세션 쿠키를 사용하기 위해 필요
          credentials: 'include', // credentials를 포함하는 요청으로 설정
        });
        console.log("quiz가 받은 response : ", response)

        const questionData = response.data.questions.map((quiz) => quiz).flat()
        console.log(questionData)
        setQuestions(questionData)
      }
      catch (error) {
        console.error("Error fetching quiz info:", error);
      }
    };

    fetchQuiz();
  }, [indexOfOptions])

  return (
    <div className={`background`}>
      <Sidebar />
      <div className={`mycontainer`}>
        <div className={`bg`}>
          <div className={styles.right}>
            <div className={styles.quizInfo}>
              <h3 className={styles.fontSize5xl}>{data.quizName}</h3>
              <div className={styles.quizInfoRight}>
                <h3 className={styles.fontSize5xl}>{data.lectureName}</h3>
                <h3 className={styles.fontSize5xl}>분반</h3>
                <button type="button" onClick={backToPreviousPage} className={`btn btn-primary ${styles.backBtn}`}>나가기</button>
              </div>
            </div>
            <div className={styles.rightBottom}>
              <div className={styles.quizContainer}>
                {questions.length > 0 && questions[indexOfOptions] && (
                  <h3 className={styles.question}>{questions[indexOfOptions].question}</h3>
                )}
                <h3 className={styles.questionNumber}>{indexOfOptions + 1} of 10</h3>
                <div className={styles.choice}>
                  {questions[indexOfOptions] && questions[indexOfOptions].type === "choice" ? (optionIcon.map((num, i) => {
                    return (
                      <div className={styles.option} key={i}>
                        {num}
                        {questions[indexOfOptions].options[i] && (
                          <h3 className={styles.optionText}>{questions[indexOfOptions].options[i]}</h3>
                        )}
                      </div>
                    )
                  })) : <textarea></textarea>
                  }
                </div>
                <div className={styles.buttons}>
                  <button type="button" className={`btn btn-secondary`} style={{ border: 'none' }} onClick={minusIndex}>이전 문제</button>


                  {indexOfOptions === 9 ? <button type="button" className={`btn btn-primary ${styles.featureBtn}`} onClick={submitQuiz}>퀴즈 제출</button> :
                    <button type="button" className={`btn btn-primary ${styles.featureBtn}`} onClick={plusIndex}>다음 문제</button>}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoQuiz;
