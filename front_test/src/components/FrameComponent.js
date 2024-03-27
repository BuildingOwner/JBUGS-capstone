import { memo } from "react";
import AveScore from "./AveScore";
import UncompleteQuizItem from "./UncompleteQuizItem";
import styles from "./FrameComponent.module.css";

const FrameComponent = memo(() => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameWrapper}>
        <div className={styles.parent}>
          <h2 className={styles.h2}>퀴즈</h2>
          <div className={styles.scoreBoard}>
            <div className={styles.gragh}>
              <div className={styles.scoreItem}>
                <div className={styles.text}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text2}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text2}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text2}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text2}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text2}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text2}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text2}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
              <div className={styles.scoreItem}>
                <div className={styles.text}>40</div>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} />
                </div>
                <div className={styles.name}>
                  <span className={styles.nameTxt}>
                    <p className={styles.p}>1주차</p>
                    <p className={styles.p}>연습문제</p>
                    <p className={styles.p}>3줄임</p>
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.turnIndicator}>
              <div className={styles.right}>
                <img className={styles.vectorIcon} alt="" src="/vector-5.svg" />
              </div>
              <div className={styles.turnIndicatorChild} />
              <div className={styles.turnIndicatorItem} />
              <div className={styles.turnIndicatorItem} />
              <div className={styles.turnIndicatorItem} />
              <div className={styles.right}>
                <img
                  className={styles.vectorIcon}
                  alt=""
                  src="/vector-62.svg"
                />
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <AveScore prop="평균 점수" prop1="40 점" />
            <AveScore prop="평균 등수" prop1="19 등" />
          </div>
        </div>
      </div>
      <div className={styles.quizNav}>
        <div className={styles.uncompleteTest}>
          <div className={styles.title}>
            <b className={styles.b}>미응시 퀴즈</b>
          </div>
          <div className={styles.item}>
            <UncompleteQuizItem />
            <UncompleteQuizItem propDisplay="flex" propHeight="0.667rem" />
            <div className={styles.uncompleteQuizItem}>
              <div className={styles.tltle}>
                <div className={styles.div}>3주차 연습문제</div>
              </div>
              <div className={styles.discreption}>
                <div className={styles.deadline}>
                  <div className={styles.div1}>기간</div>
                  <div className={styles.div2}>24 - 05 - 12</div>
                </div>
                <div className={styles.div3}>
                  <p className={styles.p}>퀴즈에 대한 설명</p>
                  <p className={styles.p}>2줄</p>
                  <p className={styles.p}>3줄</p>
                  <p className={styles.p}>4줄</p>
                  <p className={styles.p}>5줄 긴거 ㅁㄴㅇㄹㄴㅇㄻ</p>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.info1}>
                  <div className={styles.time}>
                    <div className={styles.div4}>제한 시간</div>
                    <div className={styles.div4}>10 분</div>
                  </div>
                  <div className={styles.score}>
                    <div className={styles.div4}>점수</div>
                    <div className={styles.div4}>100 점</div>
                  </div>
                </div>
                <div className={styles.goBtn}>
                  <div className={styles.div8}>퀴즈로 가기</div>
                  <div className={styles.bxsrightArrow}>
                    <img
                      className={styles.vectorIcon}
                      alt=""
                      src="/vector-9.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.week}>
          <b className={styles.b1}>주차별 바로가기</b>
          <div className={styles.weeks}>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
            <div className={styles.weekbtn}>
              <b className={styles.week1}>1</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default FrameComponent;
