import { memo, useCallback } from "react";
import Header from "./Header";
import Date1 from "./Date1";
import styles from "./ProfAssignmentModal.module.css";

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
      <Header qA="과제 제목" />
      <section className={styles.scroll}>
        <div className={styles.dateInfo}>
          <div className={styles.date}>
            <b className={styles.b}>종료 일시</b>
            <b className={styles.namePlaceholder}>2024-10-10</b>
          </div>
          <div className={styles.dateParent}>
            <div className={styles.date1}>
              <b className={styles.b}>마감 기한</b>
              <b className={styles.namePlaceholder}>2024-10-10</b>
            </div>
            <div className={styles.date2}>
              <b className={styles.b2}>이름</b>
              <b className={styles.b3}>진승원</b>
            </div>
          </div>
        </div>
        <div className={styles.submitInfo}>
          <Date1 />
          <div className={styles.date3}>
            <b className={styles.b}>채점 일시</b>
            <b className={styles.b5}>2024-10-12</b>
          </div>
          <div className={styles.date4}>
            <b className={styles.b2}>성적</b>
            <b className={styles.b5}>-</b>
          </div>
        </div>
        <div className={styles.parent}>
          <b className={styles.b2}>설명</b>
          <b className={styles.b9}>
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
        <footer className={styles.uploadButton}>
          <div className={styles.top}>
            <div className={styles.titleWrapper}>
              <b className={styles.b}>첨부 파일</b>
            </div>
            <div className={styles.upload}>
              <b className={styles.b10}>파일 업로드</b>
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
              <img
                className={styles.vectorIcon}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
        </footer>
        <div className={styles.comment} data-scroll-to="commentContainer">
          <div className={styles.title1}>
            <b className={styles.b11}>피드백</b>
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
      <div className={styles.navBtnParent}>
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

export default ProfAssignmentModal;
