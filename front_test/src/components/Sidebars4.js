import { memo } from "react";
import styles from "./Sidebars4.module.css";

const Sidebars4 = memo(() => {
  return (
    <div className={styles.sidebars}>
      <div className={styles.logoWrapper}>
        <img
          className={styles.logoIcon}
          loading="lazy"
          alt=""
          src="/logo@2x.png"
        />
      </div>
      <div className={styles.nav}>
        <div className={styles.mainNav}>
          <div className={styles.navitem}>
            <div className={styles.bitcoinIconshomeOutline}>
              <img
                className={styles.vectorIcon}
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
            <div className={styles.commentBox}>
              <div className={styles.home}>HOME</div>
            </div>
          </div>
          <div className={styles.navitem}>
            <div className={styles.fluentlibrary20Regular}>
              <img className={styles.vectorIcon1} alt="" src="/vector-11.svg" />
            </div>
            <div className={styles.commentBox}>
              <div className={styles.home}>자료실</div>
            </div>
          </div>
          <div className={styles.navitem}>
            <div className={styles.bitcoinIconshomeOutline}>
              <img className={styles.vectorIcon} alt="" src="/vector-2.svg" />
            </div>
            <div className={styles.container}>
              <div className={styles.div1}>커뮤니티</div>
            </div>
          </div>
        </div>
        <div className={styles.courseNav}>
          <div className={styles.courseName}>
            <b className={styles.b}>웹프레임워크2</b>
            <div className={styles.line} />
            <b className={styles.a}>A</b>
          </div>
          <div className={styles.navitemWrapper}>
            <div className={styles.navitem3}>
              <div className={styles.bitcoinIconshomeOutline}>
                <img
                  className={styles.vectorIcon3}
                  alt=""
                  src="/vector-3.svg"
                />
              </div>
              <div className={styles.commentBox}>
                <div className={styles.home}>{`Q&A`}</div>
              </div>
            </div>
          </div>
          <div className={styles.navitemWrapper}>
            <div className={styles.navitem3}>
              <div className={styles.fluentlibrary20Regular}>
                <img
                  className={styles.groupIcon}
                  loading="lazy"
                  alt=""
                  src="/group.svg"
                />
              </div>
              <div className={styles.container}>
                <div className={styles.div1}>공지사항</div>
              </div>
            </div>
          </div>
          <div className={styles.navitemWrapper}>
            <div className={styles.navitem3}>
              <div className={styles.bitcoinIconshomeOutline}>
                <img className={styles.groupIcon1} alt="" src="/group-1.svg" />
              </div>
              <div className={styles.container}>
                <div className={styles.div3}>과제</div>
              </div>
            </div>
          </div>
          <div className={styles.navitemWrapper}>
            <div className={styles.navitem3}>
              <div className={styles.bitcoinIconshomeOutline}>
                <img
                  className={styles.vectorIcon4}
                  alt=""
                  src="/vector-4.svg"
                />
              </div>
              <div className={styles.container}>
                <div className={styles.div3}>퀴즈</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.iconContainer}>
        <div className={styles.info}>
          <div className={styles.frameParent}>
            <div className={styles.wrapper2}>
              <b className={styles.b1}>진승원</b>
            </div>
            <div className={styles.div5}>웹공학트랙</div>
          </div>
          <div className={styles.personiconWrapper}>
            <img
              className={styles.personicon}
              loading="lazy"
              alt=""
              src="/personicon.svg"
            />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <img
          className={styles.collepseBtnIcon}
          loading="lazy"
          alt=""
          src="/collepse-btn@2x.png"
        />
        <div className={styles.logOut}>
          <div className={styles.b}>로그아웃</div>
        </div>
      </div>
    </div>
  );
});

export default Sidebars4;
