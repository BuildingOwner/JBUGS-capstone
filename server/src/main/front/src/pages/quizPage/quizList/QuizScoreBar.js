import styles from "./QuizScoreBar.module.css"
import React, { useRef, useEffect } from 'react';

const QuizScoreBar = (props) => {

  const barRef = useRef(null);

  useEffect(() => {
    const barElement = barRef.current;
    if (barElement) {
      // Bar의 높이를 quizScoreData.score에 비례하여 설정
      barElement.style.height = `${props.quizScore / 2}%`;
    }
  }, [props.quizScore]);

  return (
    <div className={styles.scoreBarContainer}>
      <h3 className={styles.score}>{props.quizScore}</h3>
        <div ref={barRef} className={styles.Bar}><p> </p></div>
        <h3 className={styles.quizName}>{props.quizName}</h3>
    </div>
  );
}

export default QuizScoreBar;