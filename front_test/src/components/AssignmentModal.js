import { memo, useCallback } from "react";
import Header from "./Header";
import Date1 from "./Date1";
import styles from "./AssignmentModal.module.css";

const AssignmentModal = memo(() => {
  const onAnswerContainerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='commentContainer']",
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <div className={styles.assignmentmodal}>
      <Header qA="과제 제목" />
      <section className={styles.scroll}>
        <div className={styles.dateInfoParent}>
          <div className={styles.dateInfo}>
            <div className={styles.parent}>
              <b className={styles.b}>종료 일시</b>
              <b className={styles.b1}>2024-10-10</b>
            </div>
            <div className={styles.parent}>
              <b className={styles.b}>마감 기한</b>
              <b className={styles.b1}>2024-10-10</b>
            </div>
          </div>
          <div className={styles.submitInfo}>
            <Date1 />
            <div className={styles.date}>
              <b className={styles.b4}>최종 수정 일시</b>
              <b className={styles.b5}>2024-10-10</b>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <b className={styles.b6}>설명</b>
          <b className={styles.b7}>
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
        <footer className={styles.topParent}>
          <div className={styles.top}>
            <div className={styles.titleWrapper}>
              <b className={styles.b}>첨부 파일</b>
            </div>
            <div className={styles.upload}>
              <b className={styles.b8}>파일 업로드</b>
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.lParent}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex}>
              <img
                className={styles.vectorIcon}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.lParent}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex}>
              <img
                className={styles.vectorIcon}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.lParent}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt2}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </div>
          </div>
        </footer>
        <div className={styles.fileListParent}>
          <div className={styles.fileList3}>
            <div className={styles.lParent}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt3}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex}>
              <img className={styles.vectorIcon} alt="" src="/vector.svg" />
            </div>
          </div>
          <div className={styles.comment} data-scroll-to="commentContainer">
            <div className={styles.title1}>
              <b className={styles.b9}>댓글</b>
            </div>
            <div className={styles.commentlist}>
              <div className={styles.commentitem}>
                <div className={styles.commentowner}>
                  <div className={styles.div}>{`교수님 : `}</div>
                </div>
                <div className={styles.div1}>이렇게 해보세요</div>
              </div>
              <div className={styles.commentitem}>
                <div className={styles.commentowner}>
                  <div className={styles.div}>{`교수님 : `}</div>
                </div>
                <div className={styles.div1}>이렇게 해보세요</div>
              </div>
              <div className={styles.commentitem}>
                <div className={styles.commentowner}>
                  <div className={styles.div}>{`교수님 : `}</div>
                </div>
                <div className={styles.div1}>이렇게 해보세요</div>
              </div>
              <div className={styles.commentitem}>
                <div className={styles.commentowner}>
                  <div className={styles.div}>{`교수님 : `}</div>
                </div>
                <div className={styles.div1}>이렇게 해보세요</div>
              </div>
              <div className={styles.commentitem}>
                <div className={styles.commentowner}>
                  <div className={styles.div}>{`교수님 : `}</div>
                </div>
                <div className={styles.div1}>이렇게 해보세요</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.answer} onClick={onAnswerContainerClick}>
        <div className={styles.b8}>피드백 보기...</div>
      </div>
      <div className={styles.feedbackPanel}>
        <div className={styles.navBtn}>
          <div className={styles.text}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text1}>수정 하기</b>
        </div>
      </div>
    </div>
  );
});

export default AssignmentModal;
