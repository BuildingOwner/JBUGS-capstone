import { memo, useCallback } from "react";
import styles from "./ProfAssignmentModal1.module.css";

const ProfAssignmentModal = memo(() => {
  const onAnswerContainerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='commentContainer']",
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <div className={styles.profassignmentmodal}>
      <section className={styles.header}>
        <h3 className={styles.h3}>과제 제목</h3>
        <div className={styles.heroiconsOutlinexWrapper}>
          <div className={styles.heroiconsOutlinex}>
            <img
              className={styles.terminationTimeLabel}
              loading="lazy"
              alt=""
              src="/vector.svg"
            />
          </div>
        </div>
      </section>
      <section className={styles.scroll}>
        <div className={styles.dateInfo}>
          <div className={styles.date}>
            <b className={styles.b}>종료 일시</b>
            <b className={styles.b1}>2024-10-10</b>
          </div>
          <div className={styles.dateParent}>
            <div className={styles.date1}>
              <b className={styles.b}>마감 기한</b>
              <b className={styles.b1}>2024-10-10</b>
            </div>
            <div className={styles.date2}>
              <b className={styles.b4}>이름</b>
              <b className={styles.b5}>진승원</b>
            </div>
          </div>
        </div>
        <div className={styles.submitInfo}>
          <div className={styles.date3}>
            <b className={styles.b}>제출 여부</b>
            <div className={styles.submit}>
              <b className={styles.b7}>제출 완료</b>
            </div>
          </div>
          <div className={styles.date4}>
            <b className={styles.b}>채점 일시</b>
            <b className={styles.b9}>2024-10-12</b>
          </div>
          <div className={styles.date5}>
            <b className={styles.b4}>성적</b>
            <b className={styles.b9}>-</b>
          </div>
        </div>
        <div className={styles.sendToPlatformButton}>
          <b className={styles.b4}>설명</b>
          <b className={styles.b13}>
            <p className={styles.p}>내용</p>
            <p className={styles.p}>2</p>
            <p className={styles.p}>3</p>
            <p className={styles.p}>4</p>
            <p className={styles.p}>5</p>
            <p className={styles.p}>6</p>
            <p className={styles.p}>7</p>
            <p className={styles.p}>8</p>
            <p className={styles.p}>9</p>
            <p className={styles.p}>10</p>
          </b>
        </div>
        <footer className={styles.listOfFiles}>
          <div className={styles.top}>
            <div className={styles.titleWrapper}>
              <b className={styles.b}>첨부 파일</b>
            </div>
            <div className={styles.upload}>
              <b className={styles.b14}>파일 업로드</b>
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.singleFileElement}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex1}>
              <img
                className={styles.terminationTimeLabel}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.singleFileElement}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex1}>
              <img
                className={styles.terminationTimeLabel}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.singleFileElement}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt2}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex1}>
              <img
                className={styles.terminationTimeLabel}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.singleFileElement}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt2}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex1}>
              <img
                className={styles.terminationTimeLabel}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
        </footer>
        <div className={styles.comment} data-scroll-to="commentContainer">
          <div className={styles.title1}>
            <b className={styles.b15}>피드백</b>
          </div>
          <div className={styles.commentlist}>
            <div className={styles.commentitem}>
              <div className={styles.commentowner}>
                <div className={styles.div}>{`교수님 : `}</div>
              </div>
              <div className={styles.div1}>이렇게 해보세요</div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.answer} onClick={onAnswerContainerClick}>
        <div className={styles.or}>피드백 보기.. or 피드백 남기기..</div>
      </div>
      <div className={styles.userInteractionArea}>
        <div className={styles.navBtn}>
          <div className={styles.labelForNavigation}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text}>수정 하기</b>
        </div>
      </div>
    </div>
  );
});

export default ProfAssignmentModal;
