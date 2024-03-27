import { memo, useCallback } from "react";
import styles from "./QaModal.module.css";

const QaModal = memo(() => {
  const onFrameContainerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='commentContainer']",
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <form className={styles.qamodal}>
      <section className={styles.header}>
        <h3 className={styles.qa}>{`Q&A 제목`}</h3>
        <div className={styles.scrollContainer}>
          <div className={styles.heroiconsOutlinex}>
            <img
              className={styles.postOwnerDateView}
              loading="lazy"
              alt=""
              src="/vector.svg"
            />
          </div>
        </div>
      </section>
      <section className={styles.scroll}>
        <nav className={styles.info}>
          <div className={styles.owner}>
            <b className={styles.b}>작성자</b>
            <b className={styles.b1}>김아무개</b>
          </div>
          <div className={styles.date}>
            <b className={styles.b}>작성일</b>
            <b className={styles.b3}>2024-10-10</b>
          </div>
          <div className={styles.view}>
            <b className={styles.b}>조회수</b>
            <b className={styles.b5}>50000</b>
          </div>
          <div className={styles.date}>
            <b className={styles.title}>답변 여부</b>
            <div className={styles.status}>
              <b className={styles.b7}>완료</b>
            </div>
          </div>
          <div className={styles.parent}>
            <b className={styles.b8}>비밀글</b>
            <img
              className={styles.icroundLockIcon}
              loading="lazy"
              alt=""
              src="/icroundlock.svg"
            />
          </div>
        </nav>
        <div className={styles.commentOwnerList}>
          <b className={styles.b9}>설명</b>
          <b className={styles.b10}>
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
        <div className={styles.navigationButton}>
          <div className={styles.titleParent}>
            <b className={styles.title}>첨부 파일</b>
            <div className={styles.upload}>
              <b className={styles.b11}>파일 업로드</b>
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.listFiles}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex1}>
              <img
                className={styles.postOwnerDateView}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.listFiles}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex1}>
              <img
                className={styles.postOwnerDateView}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.listFiles}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex1}>
              <img
                className={styles.postOwnerDateView}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.listFiles}>
              <div className={styles.l} />
              <div className={styles.fileItem}>
                <div className={styles.txt}>파일이름임.txt</div>
              </div>
            </div>
            <div className={styles.heroiconsOutlinex1}>
              <img
                className={styles.postOwnerDateView}
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
          </div>
        </div>
        <div className={styles.comment} data-scroll-to="commentContainer">
          <div className={styles.title1}>
            <b className={styles.b12}>댓글</b>
          </div>
          <div className={styles.commentlist}>
            <div className={styles.commentitem}>
              <div className={styles.commentowner}>
                <div className={styles.div}>{`교수님 : `}</div>
              </div>
              <div className={styles.div1}>이렇게 해보세요1</div>
            </div>
            <div className={styles.commentitem}>
              <div className={styles.commentowner}>
                <div className={styles.div}>{`교수님 : `}</div>
              </div>
              <div className={styles.div1}>이렇게 해보세요2</div>
            </div>
            <div className={styles.commentitem}>
              <div className={styles.commentowner}>
                <div className={styles.div}>{`교수님 : `}</div>
              </div>
              <div className={styles.div1}>이렇게 해보세요3</div>
            </div>
            <div className={styles.commentitem}>
              <div className={styles.commentowner}>
                <div className={styles.div}>{`교수님 : `}</div>
              </div>
              <div className={styles.div1}>이렇게 해보세요4</div>
            </div>
            <div className={styles.commentitem}>
              <div className={styles.commentowner}>
                <div className={styles.div}>{`교수님 : `}</div>
              </div>
              <div className={styles.div1}>이렇게 해보세요5</div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.wrapper} onClick={onFrameContainerClick}>
        <div className={styles.div10}>답변을 해주세요...</div>
      </div>
      <div className={styles.mainNavbar}>
        <div className={styles.navBtn}>
          <div className={styles.globalNavbar}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text}>답변 하기</b>
        </div>
      </div>
    </form>
  );
});

export default QaModal;
