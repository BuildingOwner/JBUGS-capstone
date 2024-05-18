import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import styles from "./MainSidebar.module.css"
import { GoHome } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const MainSidebar = ({ memberInfoDto }) => {
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date());

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
              <h3>Home</h3>
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/chatbotpage"} state={{ memberName: memberInfoDto?.memberName }} className={styles.linkBtn}>
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
    </div>
  );
};

export default MainSidebar;
