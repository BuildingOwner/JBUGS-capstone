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
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [quizDtoList, setQuizDtoList] = useState()
  const [courseDto, setCourseDto] = useState()
  const fetchQuizList = async () => {
    try {
      const response = await axios.get(`/api/course/${enrollmentId}/quizList`)
      console.log("quizList response : ", response)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchQuizList()
  }, [])

  const quizScoreData = [ // 밑에꺼 형식 맞춰야함
    { "quizName": "AD", "score": 94, },
    { "quizName": "bc", "score": 78, },
    { "quizName": "asdf", "score": 100, },
    { "quizName": "A123wqasdfasdfadfafsdfasdfade", "score": 90, },
    { "quizName": "hgf", "score": 65, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
  ]

  const quizListData = [ // 얘는 안맞춰도 됨
    { "quizName": "AD", "score": 94, },
    { "quizName": "bc", "score": 78, },
    { "quizName": "asdf", "score": 100, }
  ]

  const uncompleteQuizItem = [{ "asdf": "1" }, { asdf: "adsf" }, { asdf: "adsf" }, { asdf: "adsf" }, { asdf: "adsf" }]

  return (
    <div className={`background`}>
      <Sidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <div className={`mycontainer ${styles.mycontainer}`}>
        <div className={`bg ${styles.bg}`}>
          <div className={`${styles.top}`}>
            <div className={styles.myInfo}>
              <h3 className={styles.title}>퀴즈</h3>
              <div className={styles.scoreBoard}>
                {quizScoreData.map((data, i) => {
                  return (
                    <QuizScoreBar quizScoreData={data} key={`quizScoreBar${i}`} />
                  )
                })}
              </div>
              <div className={styles.aveInfo}>
                <div className={styles.aveScore}>
                  <h3 className={styles.textSmallGray}>평균 점수</h3>
                  <h3>40 점</h3>
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
                {uncompleteQuizItem.map((data, i) => {
                  return (
                    <UncompleteQuizItem
                      data={data}
                      key={`uncompleteQuizItem${i}`} />
                  )
                })}
              </div>
              <div className={styles.weeks}></div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.choose}>
              <select class={`form-select form-select-sm`} aria-label="Small select example">
                <option value={100} selected>전체 보기</option>
                {Array.from({ length: 16 }).map((_, i) => {
                  return (
                    <option value={i + 1}>{i + 1} 주차</option>
                  )
                })}
              </select>
              <select class={`form-select form-select-sm`} aria-label="Small select example">
                <option value={'exercise'} selected>연습 문제</option>
                <option value={'practice '} >실습 문제</option>
                <option value={'exam'} >시험</option>
              </select>
            </div>
            <div className={styles.labels}>
              <h3 className={styles.isSubmmit}>응시</h3>
              <h3 className={styles.category}>문제 분류</h3>
              <h3 className={styles.quizTitle}>제목</h3>
              <h3 className={styles.timeOut}>제한 시간</h3>
              <h3 className={styles.score}>점수</h3>
              <h3 className={styles.duration}>기한</h3>
              <h3 className={styles.feedback}>피드백</h3>
            </div>
            <div className={styles.quizListContainer}>
              {quizListData.map((data, i) => {
                return (
                  <QuizListItem data={data} key={`QuizListItem${i}`} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizList;
