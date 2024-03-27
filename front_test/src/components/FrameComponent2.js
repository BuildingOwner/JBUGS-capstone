import { memo, useMemo } from "react";
import styles from "./FrameComponent2.module.css";

const FrameComponent2 = memo(
  ({
    title,
    prop,
    prop1,
    prop2,
    propWidth,
    propFlex,
    propMinWidth,
    propPadding,
    propMinWidth1,
  }) => {
    const menuStyle = useMemo(() => {
      return {
        width: propWidth,
      };
    }, [propWidth]);

    const div1Style = useMemo(() => {
      return {
        flex: propFlex,
        minWidth: propMinWidth,
      };
    }, [propFlex, propMinWidth]);

    const frameDiv1Style = useMemo(() => {
      return {
        padding: propPadding,
      };
    }, [propPadding]);

    const b8Style = useMemo(() => {
      return {
        minWidth: propMinWidth1,
      };
    }, [propMinWidth1]);

    return (
      <div className={styles.contentInner}>
        <div className={styles.titleBarParent}>
          <div className={styles.titleBar}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>{title}</h2>
            </div>
            <div className={styles.menuParent}>
              <div className={styles.menu} style={menuStyle}>
                <div className={styles.div} style={div1Style}>
                  {prop}
                </div>
                <div className={styles.bxsdownArrowWrapper}>
                  <div className={styles.bxsdownArrow}>
                    <img
                      className={styles.vectorIcon}
                      alt=""
                      src="/vector-1.svg"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.search}>
                <div className={styles.searchInput} />
                <div className={styles.icon}>
                  <img
                    className={styles.vectorIcon1}
                    alt=""
                    src="/vector-6.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <nav className={styles.dateInfo}>
            <div className={styles.parent}>
              <b className={styles.b}>주차</b>
              <b className={styles.b1}>3주차</b>
            </div>
            <div className={styles.group}>
              <b className={styles.b2}>종료 일시</b>
              <b className={styles.b3}>2024-10-10</b>
            </div>
            <div className={styles.container} style={frameDiv1Style}>
              <b className={styles.b} style={b8Style}>
                {prop1}
              </b>
              <b className={styles.b5}>3일 남음</b>
            </div>
            <div className={styles.frameDiv}>
              <b className={styles.b2}>제출 인원</b>
              <b className={styles.b7}>{prop2}</b>
            </div>
            <div className={styles.quizChapters}>
              <div className={styles.menu1}>
                <div className={styles.div1}>학번 순</div>
                <div className={styles.bxsdownArrowWrapper}>
                  <div className={styles.bxsdownArrow}>
                    <img
                      className={styles.vectorIcon}
                      alt=""
                      src="/vector-1.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  },
);

export default FrameComponent2;
