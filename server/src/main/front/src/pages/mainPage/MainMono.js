import MainSidebar from "../../sidebar/MainSidebar";
import CourseItem from "./CourseItem";
import RightNav from "./RightNav";
import "./MainMono.css";

const MainMono = () => {
  return (
    <div className="mainpage">
      <MainSidebar />
      <main className="mainpage-inner">
        <section className="course-parent">
          <div className="course">
            <div className="courseheader">
              <div className="header-left">
                <h1 className="title2">수강중인 강좌</h1>
                <div className="today">03월 13일 2024 15주차</div>
              </div>
              <div className="header-right">
                <div className="lets-iconssetting-fill">
                  <img className="vector-icon5" alt="" src="/vector-31.svg" />
                </div>
              </div>
            </div>
            <div className="courselist">
              <div className="scrollframe">
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <CourseItem />
                <CourseItem />
                
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
