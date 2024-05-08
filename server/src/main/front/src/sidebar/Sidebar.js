import styles from "./Sidebar.module.css"
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { TbSpeakerphone } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

const Sidebar = (props) => {
  const [enrollmentId, setEnrollmentId] = useState('')
  const memberName = props.memberInfoDto?.memberName;
  
  const navigate = useNavigate()
  const handleLogout = () => {
    axios.post('/logout', null, { withCredentials: true }) // withCredentials를 설정하여 쿠키를 서버로 전송합니다.
      .then(response => {
        // 로그아웃 성공 시 처리
        console.log("로그아웃 성공");

      })
      .catch(error => {
        // 오류 처리
        console.error("로그아웃 실패", error);
      });
    navigate("/");
  }
  useEffect(() => {
    setEnrollmentId(props.enrollmentId)
  })
  return (
    <div className={styles.sidebar}>
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
              <GoHome size="25" />
              <h3 className={styles.text}>HOME</h3>
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/chatbotpage"}
              state={{ memberName: memberName }}
              className={styles.linkBtn}>
              <IoChatbubbleEllipsesOutline size="25" />
              <h3 className={styles.text}>AI chat</h3>
            </Link>
          </button>
        </div>
        <div className={styles.navBtns}>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/course"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <PiBooks size="25" />
              <h3 className={styles.text}>강의 홈</h3>
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/qalist"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <FaQuestion size="25" />
              <h3 className={styles.text}>Q & A</h3>
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/noticelist"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <TbSpeakerphone size="25" />
              <h3 className={styles.text}>공지사항</h3>
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/assignmentlist"} className={styles.linkBtn} state={{ enrollmentId: enrollmentId }}>
              <LuClipboardList size="25" />
              <h3 className={styles.text}>과제</h3>
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn}`}>
            <Link to={"/quizlist"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <MdOutlineQuiz size="25" />
              <h3 className={styles.text}>퀴즈</h3>
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.userInfo}>
          <div className={styles.user}>
            <h3 className={styles.userName}>{props.memberInfoDto?.memberName}</h3>
            <h3 className={styles.userTrack}>{props.memberInfoDto?.firstTrack}</h3>
          </div>
          <div className={styles.userImage}>
            <FaUser size={30} />
          </div>
        </div>
        <button type="button" className={`btn btn-primary ${styles.logoutBtn}`} onClick={handleLogout}>
          <h3 style={{ fontWeight: "bold", fontSize: "1.3rem" }}>로그아웃</h3>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
