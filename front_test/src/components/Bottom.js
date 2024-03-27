import { memo } from "react";
import QuizRow from "./QuizRow";
import styles from "./Bottom.module.css";

const Bottom = memo(() => {
  return (
    <div className={styles.bottom}>
      <div className={styles.menu}>
        <div className={styles.div}>퀴즈 전체보기</div>
        <div className={styles.bxsdownArrow}>
          <img className={styles.vectorIcon} alt="" src="/vector-1.svg" />
        </div>
      </div>
      <div className={styles.colName}>
        <div className={styles.line}>
          <div className={styles.status}>
            <div className={styles.titleText}>응시</div>
          </div>
          <div className={styles.secret}>
            <div className={styles.div2}>문제 분류</div>
          </div>
          <div className={styles.title}>
            <div className={styles.titleText}>제목</div>
          </div>
          <div className={styles.writer}>
            <div className={styles.div2}>제한 시간</div>
          </div>
          <div className={styles.score}>
            <div className={styles.titleText}>점수</div>
          </div>
          <div className={styles.deadline}>
            <div className={styles.titleText}>기한</div>
          </div>
          <div className={styles.feedback}>
            <div className={styles.div6}>피드백</div>
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.quizRow}>
          <div className={styles.line1}>
            <div className={styles.status1}>
              <b className={styles.b}>응시 완료</b>
            </div>
            <div className={styles.secret1}>
              <div className={styles.b}>연습 문제</div>
            </div>
            <div className={styles.title1}>
              <div className={styles.titleText1}>
                <p className={styles.p}>이거슨 제목</p>
                <p className={styles.p}>2줄임</p>
                <p className={styles.p}>3줄임</p>
              </div>
            </div>
            <div className={styles.writer1}>
              <div className={styles.div8}>10 분</div>
            </div>
            <div className={styles.score1}>
              <div className={styles.div9}>100 점</div>
            </div>
            <div className={styles.score1}>
              <div className={styles.div10}>2024-10-10</div>
            </div>
            <div className={styles.feedback1}>
              <b className={styles.b1}>피드백 보기</b>
            </div>
          </div>
        </div>
        <div className={styles.quizRow}>
          <div className={styles.line1}>
            <div className={styles.status1}>
              <b className={styles.b}>응시 완료</b>
            </div>
            <div className={styles.secret1}>
              <div className={styles.b}>연습 문제</div>
            </div>
            <div className={styles.title1}>
              <div className={styles.titleText1}>
                <p className={styles.p}>이거슨 제목</p>
                <p className={styles.p}>2줄임</p>
                <p className={styles.p}>3줄임</p>
              </div>
            </div>
            <div className={styles.writer1}>
              <div className={styles.div8}>10 분</div>
            </div>
            <div className={styles.score1}>
              <div className={styles.div9}>100 점</div>
            </div>
            <div className={styles.score1}>
              <div className={styles.div10}>2024-10-10</div>
            </div>
            <div className={styles.feedback1}>
              <b className={styles.b1}>피드백 보기</b>
            </div>
          </div>
        </div>
        <div className={styles.quizRow}>
          <div className={styles.line1}>
            <div className={styles.status1}>
              <b className={styles.b}>응시 완료</b>
            </div>
            <div className={styles.secret1}>
              <div className={styles.b}>연습 문제</div>
            </div>
            <div className={styles.title1}>
              <div className={styles.titleText1}>
                <p className={styles.p}>이거슨 제목</p>
                <p className={styles.p}>2줄임</p>
                <p className={styles.p}>3줄임</p>
              </div>
            </div>
            <div className={styles.writer1}>
              <div className={styles.div8}>10 분</div>
            </div>
            <div className={styles.score1}>
              <div className={styles.div9}>100 점</div>
            </div>
            <div className={styles.score1}>
              <div className={styles.div10}>2024-10-10</div>
            </div>
            <div className={styles.feedback1}>
              <b className={styles.b1}>피드백 보기</b>
            </div>
          </div>
        </div>
        <footer className={styles.quizRow3}>
          <div className={styles.line1}>
            <div className={styles.status4}>
              <b className={styles.b6}>미응시</b>
            </div>
            <div className={styles.secret1}>
              <div className={styles.b}>심화 문제</div>
            </div>
            <div className={styles.title1}>
              <div className={styles.titleText1}>
                <p className={styles.p}>이거슨 제목</p>
                <p className={styles.p}>2줄임</p>
                <p className={styles.p}>3줄임</p>
              </div>
            </div>
            <div className={styles.writer1}>
              <div className={styles.div8}>10 분</div>
            </div>
            <div className={styles.score4}>
              <div className={styles.div21}>-</div>
            </div>
            <div className={styles.score1}>
              <div className={styles.div10}>2024-10-10</div>
            </div>
            <div className={styles.feedback4}>
              <div className={styles.div23}>비활성화</div>
            </div>
          </div>
        </footer>
        <QuizRow />
        <QuizRow />
      </div>
    </div>
  );
});

export default Bottom;
