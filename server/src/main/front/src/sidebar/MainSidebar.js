import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import styles from "./MainSidebar.module.css"
import { GoHome } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MainSidebar = (props) => {
  const navigate = useNavigate()
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    console.log("sidebar의 props : ", props)
    setMemberInfoDto(props.memberInfoDto)
  }, [])

  return (
    <div className={styles.sidebars}>
      <Link to={"/main"} className={styles.logo}>
        <img
          className={styles.sidebarLogo}
          loading="lazy"
          alt=""
          src="/logo.png"
        />
      </Link>
      <div className={styles.sidebarContainer}>
        <div className={styles.navBtns}>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/main"} className={styles.linkBtn}>
              <GoHome size="30" />
              <h3>HOME</h3>
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/chatbotpage"} className={styles.linkBtn}>
              <IoChatbubbleEllipsesOutline size="30" />
              <h3>AI chat</h3>
            </Link>
          </button>
        </div>
        <div className={styles.calendar}>
          <Calendar
            className={styles.reactCalendar}
            value={date}
            formatDay={(locale, date) => moment(date).format("D")} // 일 제거 숫자만 보이게
            formatYear={(locale, date) => moment(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
            formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
            calendarType="gregory" // 일요일 부터 시작
            showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년단위 년도 숨기기
          >
          </Calendar>
        </div>
      </div>
      {/* <img
        className="input-filter-icon"
        loading="lazy"
        alt=""
        src="/rectangle-1@2x.png"
      />
      <div className="content12">
        <div className="main-nav">
          <div className="navitem">
            <div className="bitcoin-iconshome-outline">
              <img
                className="vector-icon33"
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
            <h3 className="home">HOME</h3>
          </div>
          <div className="navitem1">
            <img className="vector-icon34" alt="" src="/vector-1.svg" />
            <h3 className="ai-chat" onClick={moveToChatPage}>AI Chat</h3>
          </div>
        </div>
        <div className="calendar">
          <div className="month-2024-03-3">
            <div className="header7">
              <button className="atoms-mouth">
                <div className="text16">3월</div>
              </button>
            </div>
            <nav className="grid">
              <div className="line1">
                <div className="atoms-week-dey">
                  <div className="text17">일</div>
                </div>
                <div className="atoms-week-dey1">
                  <div className="text18">월</div>
                </div>
                <div className="atoms-week-dey2">
                  <div className="text19">화</div>
                </div>
                <div className="atoms-week-dey3">
                  <div className="text20">수</div>
                </div>
                <div className="atoms-week-dey4">
                  <div className="text21">목</div>
                </div>
                <div className="atoms-week-dey5">
                  <div className="text22">금</div>
                </div>
                <div className="atoms-week-dey6">
                  <div className="text23">토</div>
                </div>
              </div>
              <div className="line2">
                <div className="atoms-dey-number">
                  <div className="text24">25</div>
                </div>
                <div className="atoms-dey-number1">
                  <div className="text25">26</div>
                </div>
                <div className="atoms-dey-number2">
                  <div className="text26">27</div>
                </div>
                <div className="atoms-dey-number3">
                  <div className="text27">28</div>
                </div>
                <div className="atoms-dey-number4">
                  <div className="text28">29</div>
                </div>
                <div className="atoms-dey-number5">
                  <b className="text29">1</b>
                </div>
                <div className="atoms-dey-number6">
                  <b className="text30">2</b>
                </div>
              </div>
              <div className="line3">
                <div className="atoms-dey-number7">
                  <b className="text31">3</b>
                </div>
                <div className="atoms-dey-number8">
                  <b className="text32">4</b>
                </div>
                <div className="atoms-dey-number9">
                  <b className="text33">5</b>
                </div>
                <div className="atoms-dey-number10">
                  <b className="text34">6</b>
                </div>
                <div className="atoms-dey-number11">
                  <b className="text35">7</b>
                </div>
                <div className="atoms-dey-number12">
                  <b className="text36">8</b>
                </div>
                <div className="atoms-dey-number13">
                  <b className="text37">9</b>
                </div>
              </div>
              <div className="line4">
                <div className="atoms-dey-number14">
                  <b className="text38">10</b>
                </div>
                <div className="atoms-dey-number15">
                  <b className="text39">11</b>
                </div>
                <div className="atoms-dey-number16">
                  <b className="text40">12</b>
                </div>
                <div className="atoms-dey-number17">
                  <b className="text41">13</b>
                </div>
                <div className="atoms-dey-number18">
                  <b className="text42">14</b>
                </div>
                <div className="atoms-dey-number19">
                  <b className="text43">15</b>
                </div>
                <div className="atoms-dey-number20">
                  <b className="text44">16</b>
                </div>
              </div>
              <div className="line5">
                <div className="atoms-dey-number21">
                  <b className="text45">17</b>
                </div>
                <div className="atoms-dey-number22">
                  <b className="text46">18</b>
                </div>
                <div className="atoms-dey-number23">
                  <b className="text47">19</b>
                </div>
                <div className="atoms-dey-number24">
                  <b className="text48">20</b>
                </div>
                <div className="atoms-dey-number25">
                  <b className="text49">21</b>
                </div>
                <div className="atoms-dey-number26">
                  <b className="text50">22</b>
                </div>
                <div className="atoms-dey-number27">
                  <b className="text51">23</b>
                </div>
              </div>
              <div className="line6">
                <div className="atoms-dey-number28">
                  <b className="text52">24</b>
                </div>
                <div className="atoms-dey-number29">
                  <b className="text53">25</b>
                </div>
                <div className="atoms-dey-number30">
                  <b className="text54">26</b>
                </div>
                <div className="atoms-dey-number31">
                  <b className="text55">27</b>
                </div>
                <div className="atoms-dey-number32">
                  <b className="text56">28</b>
                </div>
                <div className="atoms-dey-number33">
                  <b className="text57">29</b>
                </div>
                <div className="atoms-dey-number34">
                  <b className="text58">30</b>
                </div>
              </div>
              <div className="line7">
                <div className="atoms-dey-number35">
                  <b className="text59">31</b>
                </div>
                <div className="atoms-dey-number36">
                  <div className="text60">1</div>
                </div>
                <div className="atoms-dey-number37">
                  <div className="text61">2</div>
                </div>
                <div className="atoms-dey-number38">
                  <div className="text62">3</div>
                </div>
                <div className="atoms-dey-number39">
                  <div className="text63">4</div>
                </div>
                <div className="atoms-dey-number40">
                  <div className="text64">5</div>
                </div>
                <div className="atoms-dey-number41">
                  <div className="text65">6</div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="bottom5">
        <img className="collepse-btn-icon" alt="" src="/collepse-btn@2x.png" />
        <div className="log-out">
          <div className="div157">로그아웃</div>
        </div>
        <div className="phsquare-half-fill">
          <img className="vector-icon35" alt="" src="/vector-4.svg" />
        </div>
      </div> */}
    </div>
  );
};

export default MainSidebar;
