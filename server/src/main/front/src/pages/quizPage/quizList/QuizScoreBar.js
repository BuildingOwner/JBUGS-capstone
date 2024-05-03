import styles from "./QuizScoreBar.module.css"
import React, { useRef, useEffect } from 'react';

const QuizScoreBar = ({ quizScoreData }) => {

  const barRef = useRef(null);

  useEffect(() => {
    const barElement = barRef.current;
    if (barElement) {
      // Bar의 높이를 quizScoreData.score에 비례하여 설정
      barElement.style.height = `${quizScoreData.score / 2}%`;
    }
  }, [quizScoreData.score]);

  return (
    <div className={styles.scoreBarContainer}>
      <h3 className={styles.score}>{quizScoreData.score}</h3>
        <div ref={barRef} className={styles.Bar}><p> </p></div>
        <h3 className={styles.quizName}>{quizScoreData.quizName}</h3>
    </div>
  );
}

export default QuizScoreBar;