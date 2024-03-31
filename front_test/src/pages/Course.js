import VideoItem from "../components/VideoItem";
import styles from "./Course.module.css";

const Course = () => {
  return (
    <div className={styles.course}>
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
                  className={styles.patternMatcherIcon}
                  loading="lazy"
                  alt=""
                  src="/vector1.svg"
                />
              </div>
              <div className={styles.decisionTree}>
                <h3 className={styles.home}>HOME</h3>
              </div>
            </div>
            <div className={styles.navitem}>
              <div className={styles.fluentlibrary20Regular}>
                <img
                  className={styles.vectorIcon}
                  alt=""
                  src="/vector-11.svg"
                />
              </div>
              <div className={styles.decisionTree}>
                <h3 className={styles.home}>자료실</h3>
              </div>
            </div>
            <div className={styles.navitem}>
              <div className={styles.bitcoinIconshomeOutline}>
                <img
                  className={styles.patternMatcherIcon}
                  alt=""
                  src="/vector-2.svg"
                />
              </div>
              <div className={styles.container}>
                <h3 className={styles.h31}>커뮤니티</h3>
              </div>
            </div>
          </div>
          <div className={styles.courseNav}>
            <div className={styles.courseName}>
              <b className={styles.b}>웹프레임워크2</b>
              <div className={styles.line} />
              <b className={styles.a}>A</b>
            </div>
            <div className={styles.aggregator}>
              <div className={styles.navitem3}>
                <div className={styles.bitcoinIconshomeOutline}>
                  <img
                    className={styles.scalerIcon}
                    alt=""
                    src="/vector-3.svg"
                  />
                </div>
                <div className={styles.decisionTree}>
                  <h3 className={styles.home}>{`Q&A`}</h3>
                </div>
              </div>
            </div>
            <div className={styles.aggregator}>
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
                  <h3 className={styles.h31}>공지사항</h3>
                </div>
              </div>
            </div>
            <div className={styles.aggregator}>
              <div className={styles.navitem3}>
                <div className={styles.bitcoinIconshomeOutline}>
                  <img
                    className={styles.groupIcon1}
                    alt=""
                    src="/group-1.svg"
                  />
                </div>
                <div className={styles.container}>
                  <h3 className={styles.h33}>과제</h3>
                </div>
              </div>
            </div>
            <div className={styles.aggregator}>
              <div className={styles.navitem3}>
                <div className={styles.bitcoinIconshomeOutline}>
                  <img
                    className={styles.vectorIcon2}
                    alt=""
                    src="/vector-4.svg"
                  />
                </div>
                <div className={styles.container}>
                  <h3 className={styles.h33}>퀴즈</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.timer}>
          <div className={styles.info}>
            <div className={styles.queue}>
              <div className={styles.stack}>
                <b className={styles.b1}>진승원</b>
              </div>
              <div className={styles.div}>웹공학트랙</div>
            </div>
            <div className={styles.lastInFirstOut}>
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
      <main className={styles.serializer}>
        <section className={styles.content}>
          <div className={styles.nav1}>
            <nav className={styles.weeklist}>
              <div className={styles.weekItem}>
                <b className={styles.searchEngine}>1</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem1}>
                <b className={styles.searchEngine}>2</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem1}>
                <b className={styles.searchEngine}>3</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem1}>
                <b className={styles.searchEngine}>4</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem4}>
                <b className={styles.searchEngine}>5</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.ellipseDiv} />
                </div>
              </div>
              <div className={styles.weekItem4}>
                <b className={styles.searchEngine}>6</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.ellipseDiv} />
                </div>
              </div>
              <div className={styles.weekItem4}>
                <b className={styles.searchEngine}>7</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.ellipseDiv} />
                </div>
              </div>
              <div className={styles.weekItem4}>
                <b className={styles.searchEngine}>8</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem4}>
                <b className={styles.searchEngine}>9</b>
                <div className={styles.generatorWrapper}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem9}>
                <b className={styles.b10}>10</b>
                <div className={styles.weekItemInner7}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem9}>
                <b className={styles.b10}>11</b>
                <div className={styles.weekItemInner7}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem9}>
                <b className={styles.b10}>12</b>
                <div className={styles.weekItemInner7}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem9}>
                <b className={styles.b10}>13</b>
                <div className={styles.weekItemInner7}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem9}>
                <b className={styles.b10}>14</b>
                <div className={styles.weekItemInner7}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem9}>
                <b className={styles.b10}>15</b>
                <div className={styles.weekItemInner7}>
                  <div className={styles.generator} />
                </div>
              </div>
              <div className={styles.weekItem9}>
                <b className={styles.b10}>16</b>
                <div className={styles.weekItemInner7}>
                  <div className={styles.generator} />
                </div>
              </div>
            </nav>
          </div>
          <div className={styles.nav2}>
            <div className={styles.courceInfo}>
              <b className={styles.courceName}>웹프레임워크2</b>
              <b className={styles.courceName}>A</b>
            </div>
            <div className={styles.menuParent}>
              <div className={styles.menu}>
                <div className={styles.div2}>3 주차</div>
                <div className={styles.bxsdownArrow}>
                  <img
                    className={styles.vectorIcon3}
                    alt=""
                    src="/vector-1.svg"
                  />
                </div>
              </div>
              <div className={styles.upload}>
                <b className={styles.b17}>파일 업로드</b>
              </div>
            </div>
          </div>
          <div className={styles.assembler}>
            <div className={styles.disassembler}>
              <div className={styles.video}>
                <div className={styles.decrypter}>
                  <h2 className={styles.h2}>온라인 강의</h2>
                </div>
                <div className={styles.vcontent}>
                  <VideoItem prop="50%" />
                  <VideoItem
                    prop="100%"
                    propGap="3px"
                    propAlignSelf="unset"
                    propWidth="unset"
                    propHeight="1.111rem"
                    propWidth1="2.056rem"
                  />
                  <VideoItem
                    prop="50%"
                    propGap="11px"
                    propAlignSelf="unset"
                    propWidth="5.556rem"
                    propHeight="1.111rem"
                    propWidth1="1.611rem"
                  />
                  <VideoItem
                    prop="50%"
                    propGap="11px"
                    propAlignSelf="unset"
                    propWidth="5.556rem"
                    propHeight="1.111rem"
                    propWidth1="1.611rem"
                  />
                  <VideoItem
                    prop="50%"
                    propGap="11px"
                    propAlignSelf="unset"
                    propWidth="5.556rem"
                    propHeight="1.111rem"
                    propWidth1="1.611rem"
                  />
                  <VideoItem
                    prop="50%"
                    propGap="11px"
                    propAlignSelf="unset"
                    propWidth="5.556rem"
                    propHeight="1.111rem"
                    propWidth1="1.611rem"
                  />
                  <VideoItem
                    prop="50%"
                    propGap="11px"
                    propAlignSelf="unset"
                    propWidth="5.556rem"
                    propHeight="1.111rem"
                    propWidth1="1.611rem"
                  />
                  <VideoItem
                    prop="50%"
                    propGap="11px"
                    propAlignSelf="unset"
                    propWidth="5.556rem"
                    propHeight="1.111rem"
                    propWidth1="1.611rem"
                  />
                  <VideoItem
                    prop="50%"
                    propGap="11px"
                    propAlignSelf="unset"
                    propWidth="5.556rem"
                    propHeight="1.111rem"
                    propWidth1="1.611rem"
                  />
                </div>
              </div>
              <div className={styles.assignments}>
                <div className={styles.header}>
                  <h2 className={styles.h21}>과제</h2>
                </div>
                <div className={styles.list}>
                  <div className={styles.assignmentitem}>
                    <div className={styles.submitParent}>
                      <div className={styles.submit}>
                        <b className={styles.b1}>미제출</b>
                      </div>
                      <b className={styles.b19}>과제 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.assignmentitem1}>
                    <div className={styles.submitParent}>
                      <div className={styles.submit}>
                        <b className={styles.b1}>미제출</b>
                      </div>
                      <b className={styles.b19}>과제 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.assignmentitem1}>
                    <div className={styles.submitParent}>
                      <div className={styles.submit}>
                        <b className={styles.b1}>미제출</b>
                      </div>
                      <b className={styles.b19}>과제 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.assignmentitem1}>
                    <div className={styles.submitParent}>
                      <div className={styles.submit}>
                        <b className={styles.b1}>미제출</b>
                      </div>
                      <b className={styles.b19}>과제 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.assignmentitem1}>
                    <div className={styles.submitParent}>
                      <div className={styles.submit}>
                        <b className={styles.b1}>미제출</b>
                      </div>
                      <b className={styles.b19}>과제 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.assignmentitem1}>
                    <div className={styles.submitParent3}>
                      <div className={styles.submit5}>
                        <b className={styles.b28}>미제출</b>
                      </div>
                      <b className={styles.b29}>과제 제목입니다</b>
                    </div>
                    <b className={styles.n5}>n일 남음</b>
                  </div>
                  <div className={styles.assignmentitem1}>
                    <div className={styles.submitParent3}>
                      <div className={styles.submit5}>
                        <b className={styles.b28}>미제출</b>
                      </div>
                      <b className={styles.b29}>과제 제목입니다</b>
                    </div>
                    <b className={styles.n5}>n일 남음</b>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bottom1}>
              <div className={styles.files}>
                <div className={styles.header}>
                  <h2 className={styles.h21}>자료</h2>
                </div>
                <div className={styles.scroll}>
                  <div className={styles.fileitem}>
                    <div className={styles.submitParent}>
                      <div className={styles.pptWrapper}>
                        <b className={styles.ppt}>PPT</b>
                      </div>
                      <b className={styles.b32}>자료명입니다</b>
                    </div>
                    <b className={styles.mb}>37.9MB</b>
                  </div>
                  <div className={styles.fileitem1}>
                    <div className={styles.submitParent}>
                      <div className={styles.docsWrapper}>
                        <b className={styles.docs}>DOCS</b>
                      </div>
                      <b className={styles.b32}>자료명입니다</b>
                    </div>
                    <b className={styles.mb}>37.9MB</b>
                  </div>
                  <div className={styles.fileitem1}>
                    <div className={styles.submitParent}>
                      <div className={styles.excelWrapper}>
                        <b className={styles.excel}>EXCEL</b>
                      </div>
                      <b className={styles.b32}>자료명입니다</b>
                    </div>
                    <b className={styles.mb}>37.9MB</b>
                  </div>
                  <div className={styles.fileitem1}>
                    <div className={styles.submitParent}>
                      <div className={styles.pdfWrapper}>
                        <b className={styles.pdf}>PDF</b>
                      </div>
                      <b className={styles.b32}>자료명입니다</b>
                    </div>
                    <b className={styles.mb}>37.9MB</b>
                  </div>
                </div>
              </div>
              <div className={styles.quiz}>
                <div className={styles.header}>
                  <h2 className={styles.h21}>퀴즈</h2>
                </div>
                <div className={styles.qcontent}>
                  <div className={styles.quizitem}>
                    <div className={styles.info1}>
                      <div className={styles.submit}>
                        <b className={styles.b1}>미응시</b>
                      </div>
                      <b className={styles.b37}>연습문제</b>
                    </div>
                    <div className={styles.name}>
                      <b className={styles.b38}>퀴즈 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.quizitem}>
                    <div className={styles.info1}>
                      <div className={styles.submit}>
                        <b className={styles.b1}>미응시</b>
                      </div>
                      <b className={styles.b37}>연습문제</b>
                    </div>
                    <div className={styles.name}>
                      <b className={styles.b38}>퀴즈 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.quizitem}>
                    <div className={styles.info1}>
                      <div className={styles.submit}>
                        <b className={styles.b1}>미응시</b>
                      </div>
                      <b className={styles.b37}>연습문제</b>
                    </div>
                    <div className={styles.name}>
                      <b className={styles.b38}>퀴즈 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.quizitem}>
                    <div className={styles.info1}>
                      <div className={styles.submit10}>
                        <b className={styles.b45}>응시 완료</b>
                      </div>
                      <b className={styles.b37}>연습문제</b>
                    </div>
                    <div className={styles.name}>
                      <b className={styles.b38}>퀴즈 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <div className={styles.quizitem}>
                    <div className={styles.info1}>
                      <div className={styles.submit10}>
                        <b className={styles.b45}>응시 완료</b>
                      </div>
                      <b className={styles.b37}>연습문제</b>
                    </div>
                    <div className={styles.name}>
                      <b className={styles.b38}>퀴즈 제목입니다</b>
                    </div>
                    <b className={styles.n}>n일 남음</b>
                  </div>
                  <footer className={styles.quizitem5}>
                    <div className={styles.info6}>
                      <div className={styles.submit12}>
                        <b className={styles.b28}>응시 완료</b>
                      </div>
                      <b className={styles.b52}>연습문제</b>
                    </div>
                    <div className={styles.name5}>
                      <b className={styles.b53}>퀴즈 제목입니다</b>
                    </div>
                    <b className={styles.n5}>n일 남음</b>
                  </footer>
                  <div className={styles.quizitem}>
                    <div className={styles.info6}>
                      <div className={styles.submit12}>
                        <b className={styles.b28}>응시 완료</b>
                      </div>
                      <b className={styles.b52}>연습문제</b>
                    </div>
                    <div className={styles.name5}>
                      <b className={styles.b53}>퀴즈 제목입니다</b>
                    </div>
                    <b className={styles.n5}>n일 남음</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Course;
