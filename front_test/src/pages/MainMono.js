import Sidebars5 from "../components/Sidebars5";
import CourseItem from "../components/CourseItem";
import RightNav from "../components/RightNav";
import styles from "./MainMono.module.css";

const MainMono = () => {
  return (
    <div className={styles.mainMono}>
      <Sidebars5 />
      <main className={styles.mainMonoInner}>
        <section className={styles.courseParent}>
          <div className={styles.course}>
            <div className={styles.courseheader}>
              <div className={styles.headerLeft}>
                <h1 className={styles.title}>수강중인 강좌</h1>
                <div className={styles.today}>03월 13일 2024 15주차</div>
              </div>
              <div className={styles.headerRight}>
                <div className={styles.letsIconssettingFill}>
                  <img
                    className={styles.vectorIcon}
                    alt=""
                    src="/vector-31.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.courselist}>
              <div className={styles.scrollframe}>
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <div className={styles.courseItem}>
                  <div className={styles.courseLeft}>
                    <div className={styles.personicon}>
                      <img
                        className={styles.positionPredictorIcon}
                        alt=""
                        src="/vector-41.svg"
                      />
                    </div>
                    <div className={styles.info}>
                      <h2 className={styles.h2}>강좌명</h2>
                      <div className={styles.layerLoaderParent}>
                        <div className={styles.layerLoader}>
                          <div className={styles.div}>교수님성함</div>
                          <div className={styles.div1}>전공선택</div>
                        </div>
                        <div className={styles.div2}>월 13 ~ 14.5</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.coueseRight}>
                    <div className={styles.division}>
                      <h2 className={styles.a}>A</h2>
                    </div>
                    <div className={styles.rightArrow}>
                      <img
                        className={styles.groupIcon}
                        alt=""
                        src="/group1.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.courseItem1}>
                  <div className={styles.courseLeft1}>
                    <div className={styles.personicon}>
                      <img
                        className={styles.positionPredictorIcon}
                        alt=""
                        src="/vector-41.svg"
                      />
                    </div>
                    <div className={styles.info}>
                      <h2 className={styles.h2}>강좌명</h2>
                      <div className={styles.layerLoaderParent}>
                        <div className={styles.layerLoader}>
                          <div className={styles.div}>교수님성함</div>
                          <div className={styles.div1}>전공선택</div>
                        </div>
                        <div className={styles.div2}>월 13 ~ 14.5</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.coueseRight}>
                    <div className={styles.division}>
                      <h2 className={styles.a}>A</h2>
                    </div>
                    <div className={styles.rightArrow}>
                      <img
                        className={styles.groupIcon}
                        alt=""
                        src="/group1.svg"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.courseItem2}>
                  <div className={styles.courseLeft2}>
                    <div className={styles.personicon2}>
                      <img
                        className={styles.positionPredictorIcon}
                        alt=""
                        src="/vector-41.svg"
                      />
                    </div>
                    <div className={styles.info}>
                      <h2 className={styles.h2}>강좌명</h2>
                      <div className={styles.layerLoaderParent}>
                        <div className={styles.layerLoader}>
                          <div className={styles.div}>교수님성함</div>
                          <div className={styles.div1}>전공선택</div>
                        </div>
                        <div className={styles.div2}>월 13 ~ 14.5</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.coueseRight}>
                    <div className={styles.division}>
                      <h2 className={styles.a}>A</h2>
                    </div>
                    <div className={styles.rightArrow}>
                      <img
                        className={styles.groupIcon}
                        alt=""
                        src="/group1.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RightNav />
        </section>
      </main>
    </div>
  );
};

export default MainMono;
