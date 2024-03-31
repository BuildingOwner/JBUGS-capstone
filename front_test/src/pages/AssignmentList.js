import FrameComponent1 from "../components/FrameComponent1";
import ListRow from "../components/ListRow";
import styles from "./AssignmentList.module.css";

const AssignmentList = () => {
  return (
    <div className={styles.assignmentlist}>
      <div className={styles.sidebars}>
        <div className={styles.perspectiveDistortion}>
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
              <div className={styles.homeWrapper}>
                <div className={styles.home}>HOME</div>
              </div>
            </div>
            <div className={styles.navitem}>
              <div className={styles.fluentlibrary20Regular}>
                <img
                  className={styles.vectorIcon1}
                  alt=""
                  src="/vector-11.svg"
                />
              </div>
              <div className={styles.homeWrapper}>
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
                <div className={styles.homeWrapper}>
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
                  <img
                    className={styles.groupIcon1}
                    alt=""
                    src="/group-1.svg"
                  />
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
        <div className={styles.iconStyle}>
          <div className={styles.info}>
            <div className={styles.linkStyle}>
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
      <main className={styles.contentWrapper}>
        <section className={styles.content}>
          <FrameComponent1 />
          <div className={styles.list}>
            <div className={styles.yet}>
              <div className={styles.colName}>
                <div className={styles.title}>
                  <b className={styles.b2}>미제출 과제</b>
                  <div className={styles.div7}>(3)</div>
                </div>
                <div className={styles.div8}>제목</div>
                <div className={styles.div9}>주차</div>
                <div className={styles.div10}>기한</div>
                <div className={styles.div10}>성적</div>
              </div>
              <div className={styles.listItems}>
                <div className={styles.listRow}>
                  <div className={styles.submit}>
                    <b className={styles.b3}>미제출</b>
                  </div>
                  <div className={styles.div12}>
                    <p className={styles.p}>3주차 과제</p>
                    <p className={styles.p}>2</p>
                    <p className={styles.p}>3</p>
                  </div>
                  <div className={styles.div9}>3 주차</div>
                  <div className={styles.div14}>24-03-24 23:59</div>
                  <div className={styles.div10}>-</div>
                </div>
                <div className={styles.listRow}>
                  <div className={styles.submit}>
                    <b className={styles.b3}>미제출</b>
                  </div>
                  <div className={styles.div12}>
                    <p className={styles.p}>3주차 과제</p>
                    <p className={styles.p}>2</p>
                    <p className={styles.p}>3</p>
                  </div>
                  <div className={styles.div9}>3 주차</div>
                  <div className={styles.div14}>24-03-24 23:59</div>
                  <div className={styles.div10}>-</div>
                </div>
                <div className={styles.listRow}>
                  <div className={styles.submit}>
                    <b className={styles.b3}>미제출</b>
                  </div>
                  <div className={styles.div12}>
                    <p className={styles.p}>3주차 과제</p>
                    <p className={styles.p}>2</p>
                    <p className={styles.p}>3</p>
                  </div>
                  <div className={styles.div9}>3 주차</div>
                  <div className={styles.div14}>24-03-24 23:59</div>
                  <div className={styles.div10}>-</div>
                </div>
                <ListRow prop="미제출" />
                <ListRow
                  prop="미제출"
                  propBackgroundColor="#f49e9e"
                  propPadding="var(--padding-3xs) var(--padding-9xl)"
                />
              </div>
            </div>
            <div className={styles.done}>
              <div className={styles.colName}>
                <div className={styles.title1}>
                  <b className={styles.b2}>제출한 과제</b>
                  <div className={styles.div7}>(3)</div>
                </div>
                <div className={styles.div8}>제목</div>
                <div className={styles.div9}>주차</div>
                <div className={styles.div10}>기한</div>
                <div className={styles.div10}>성적</div>
              </div>
              <div className={styles.listItems1}>
                <div className={styles.listRow}>
                  <div className={styles.submit3}>
                    <b className={styles.b7}>제출 완료</b>
                  </div>
                  <div className={styles.div12}>
                    <p className={styles.p}>3주차 과제</p>
                    <p className={styles.p}>2</p>
                    <p className={styles.p}>3</p>
                  </div>
                  <div className={styles.div9}>3 주차</div>
                  <div className={styles.div14}>24-03-24 23:59</div>
                  <div className={styles.div10}>-</div>
                </div>
                <div className={styles.listRow}>
                  <div className={styles.submit3}>
                    <b className={styles.b7}>제출 완료</b>
                  </div>
                  <div className={styles.div12}>
                    <p className={styles.p}>3주차 과제</p>
                    <p className={styles.p}>2</p>
                    <p className={styles.p}>3</p>
                  </div>
                  <div className={styles.div9}>3 주차</div>
                  <div className={styles.div14}>24-03-24 23:59</div>
                  <div className={styles.div10}>-</div>
                </div>
                <div className={styles.listRow}>
                  <div className={styles.submit3}>
                    <b className={styles.b7}>제출 완료</b>
                  </div>
                  <div className={styles.div12}>
                    <p className={styles.p}>3주차 과제</p>
                    <p className={styles.p}>2</p>
                    <p className={styles.p}>3</p>
                  </div>
                  <div className={styles.div9}>3 주차</div>
                  <div className={styles.div14}>24-03-24 23:59</div>
                  <div className={styles.div10}>-</div>
                </div>
                <footer className={styles.listRow6}>
                  <div className={styles.submit6}>
                    <b className={styles.b10}>제출 완료</b>
                  </div>
                  <div className={styles.div41}>
                    <span>
                      <p className={styles.p}>3주차 과제</p>
                      <p className={styles.p}>2</p>
                      <p className={styles.p}>3</p>
                    </span>
                  </div>
                  <div className={styles.div42}>3 주차</div>
                  <div className={styles.div43}>24-03-24 23:59</div>
                  <div className={styles.div44}>-</div>
                </footer>
                <ListRow
                  prop="제출 완료"
                  propBackgroundColor="#72bd92"
                  propPadding="var(--padding-3xs) 0.861rem"
                />
                <ListRow
                  prop="제출 완료"
                  propBackgroundColor="#72bd92"
                  propPadding="var(--padding-3xs) 0.861rem"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AssignmentList;
