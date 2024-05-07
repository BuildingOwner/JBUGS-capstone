import Sidebar from "../../../sidebar/CourseSidebars";
import styles from "./QuizList.module.css"
import QuizScoreBar from "./QuizScoreBar";
import { LuTriangle } from "react-icons/lu";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import UncompleteQuizItem from "./UncompletedQuizItem";
import QuizListItem from "./QuizListItem";

const QuizList = () => {
  const location = useLocation()
  const enrollmentId = location.state.enrollmentId
  const [memberInfoDto, setMemberInfoDto] = useState('')
  const [lectureName, setLectureName] = useState('')
  const [division, setDivision] = useState('')
  const [quizDtoList, setQuizDtoList] = useState([])
  const [courseDto, setCourseDto] = useState()
  const [completeQuizList, setCompleteQuizList] = useState([])
  const [uncompleteQuizList, setUncompleteQuizList] = useState([])
  const [averageScore, setAverageScore] = useState(0)
  const [selectedWeek, setSelectedWeek] = useState(100)
  const [selectedType, setSelectedType] = useState('all')

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value)
    console.log(e.target.value)
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
    console.log(e.target.value)
  }

  const getAverageScore = (completedQuizzes) => {
    // 평균 점수 구하는 로직
    let scores = 0
    completedQuizzes?.map((quiz) => scores += quiz.quizScore)
    setAverageScore(scores / completedQuizzes.length) // 비동기 확인 해야함
  }
  
  const fetchQuizList = async () => {
    try {
      const response = await axios.get(`/api/course/${enrollmentId}/quizList`)
      console.log("quizList response : ", response)
      const quizList = response.data.quizDtoList.map((quiz) => quiz)

      // useState를 활용하여 완료된 퀴즈와 완료되지 않은 퀴즈 분리
      const completedQuizzes = quizList.filter(quiz => quiz.quizScore !== null)
      const uncompletedQuizzes = quizList.filter(quiz => quiz.quizScore === null)

      getAverageScore(completedQuizzes)

      // 상태 업데이트
      setQuizDtoList(quizList)
      setCompleteQuizList(completedQuizzes)
      setUncompleteQuizList(uncompletedQuizzes)

    } catch (error) {

    }
  }

  useEffect(() => {
    fetchQuizList()
  }, [])

  return (
    <div className={`background`}>
      <Sidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <div className={`mycontainer ${styles.mycontainer}`}>
        <div className={`bg ${styles.bg}`}>
          <div className={`${styles.top}`}>
            <div className={styles.myInfo}>
              <h3 className={styles.title}>퀴즈</h3>
              <div className={styles.scoreBoard}>
                {completeQuizList?.map((quiz, i) =>
                  quiz.quizScore === null ? null :
                    <QuizScoreBar quizName={quiz.quizName} quizScore={quiz.quizScore} key={`quizScoreBar${i}`} />
                )}
              </div>
              <div className={styles.aveInfo}>
                <div className={styles.aveScore}>
                  <h3 className={styles.textSmallGray}>평균 점수</h3>
                  <h3>{averageScore} 점</h3>
                  <div className={styles.myPosition}>
                    <LuTriangle />
                    <h3>23%</h3>
                  </div>
                </div>
                <div className={styles.aveScore}>
                  <h3 className={styles.textSmallGray}>평균 등수</h3>
                  <h3>19 등</h3>
                  <div className={styles.myPosition}>
                    <LuTriangle />
                    <h3>23%</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.topRight}>
              <h3>미응시 퀴즈</h3>
              <div className={styles.uncompleteQuizsContainer}>
                {uncompleteQuizList.map((quiz, i) => {
                  return (
                    <UncompleteQuizItem
                      key={`uncompleteQuizItem${i}`}
                      quizName={quiz.quizName}
                      description={quiz.description}
                      deadline={quiz.deadline}
                      quizType={quiz.quizType}
                      reflectionRatio={quiz.reflectionRatio}
                      quizId={quiz.quizId}
                      timeLimit={quiz.timeLimit}
                      jsonData={quiz.jsonData}
                    />
                  )
                })}
              </div>
              <div className={styles.weeks}></div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.choose}>
              <select
                className={`form-select form-select-sm ${styles.select}`}
                aria-label="Small select example"
                value={selectedWeek}
                onChange={handleWeekChange}>
                <option value={100}>주차 전체 보기</option>
                {Array.from({ length: 16 }).map((_, i) => {
                  return (
                    <option value={i + 1} key={`weekKey${i}`}>{i + 1} 주차</option>
                  )
                })}
              </select>
              <select
                className={`form-select form-select-sm ${styles.select}`}
                aria-label="Small select example"
                value={selectedType}
                onChange={handleTypeChange}>
                <option value={'all'}>문제 분류 전체 보기</option>
                <option value={"EXERCISE"}>연습 문제</option>
                <option value={"PRACTICE"} >실습 문제</option>
                <option value={"EXAM"} >시험</option>
              </select>
            </div>
            <div className={styles.labels}>
              <h3 className={styles.labelText}>응시</h3>
              <h3 className={styles.labelText}>문제 분류</h3>
              <h3 className={styles.labelTextTitle}>제목</h3>
              <h3 className={styles.labelText}>제한 시간</h3>
              <h3 className={styles.labelText}>점수</h3>
              <h3 className={styles.labelTextTimeOut}>기한</h3>
              <h3 className={styles.labelText}>피드백</h3>
            </div>
            <div className={styles.quizListContainer}>
              {quizDtoList?.filter(quiz =>
                (Number(selectedWeek) === 100 || Number(quiz.week) === Number(selectedWeek)) // 주차 조건
                && (selectedType === 'all' || quiz.quizType === selectedType) // 타입 조건
              ).map((quiz, i) => (
                <QuizListItem
                  key={`QuizListItem${i}`}
                  quizName={quiz.quizName}
                  description={quiz.description}
                  deadline={quiz.deadline}
                  quizType={quiz.quizType}
                  reflectionRatio={quiz.reflectionRatio}
                  quizId={quiz.quizId}
                  timeLimit={quiz.timeLimit}
                  jsonData={quiz.jsonData}
                  quizScore={quiz.quizScore}
                  submissionStatus={quiz.submissionStatus}
                />
              ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizList;
