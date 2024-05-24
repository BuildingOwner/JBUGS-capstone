import { Link } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { TbSpeakerphone } from "react-icons/tb";
import { LuClipboardList } from "react-icons/lu";
import { MdOutlineQuiz } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import styles from "./Sidebar.module.css"
import styles2 from "./MainSidebarCollepsed.module.css"
import styles3 from "./CollepsedSidebar.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom"

function CollepsedSidebar(props) {
  const enrollmentId = props.enrollmentId
  const memberName = props.memberInfoDto?.memberName;

  const navigate = useNavigate()
  console.log(enrollmentId)
  const handleLogout = async () => {
    await axios.post('/logout', null, { withCredentials: true }) // withCredentials를 설정하여 쿠키를 서버로 전송합니다.
      .then(response => {
        // 로그아웃 성공 시 처리
        console.log("로그아웃 성공");

      })
      .catch(error => {
        // 오류 처리
        console.error("로그아웃 실패", error);
      });
    navigate("/login");
  }

  return (
    <div className={`${styles.sidebars} ${styles2.sidebars} ${styles3.sidebars}`}>
      <Link to={"/"} className={`${styles.logo}`}>
        <img
          className={` ${styles2.sidebarLogo}`}
          loading="lazy"
          alt=""
          src="/miniLogo.png"
        />
      </Link>
      <div className={`${styles.sidebarContainer} ${styles3.sidebarContainer}`}>
        <div className={`${styles.navBtns} ${styles3.navBtns}`}>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/"} className={styles.linkBtn}>
              <GoHome size="25" />
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/chatbotpage"} state={{ memberName: memberName }} className={styles.linkBtn}>
              <IoChatbubbleEllipsesOutline size="25" />
            </Link>
          </button>
        </div>
        <div className={`${styles.navBtns} ${styles3.navBtns}`}>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/course"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <PiBooks size="25" />
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/qalist"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <FaQuestion size="25" />
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/noticelist"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <TbSpeakerphone size="25" />
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/assignmentlist"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <LuClipboardList size="25" />
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/quizlist"} state={{ enrollmentId: enrollmentId }} className={styles.linkBtn}>
              <MdOutlineQuiz size="25" />
            </Link>
          </button>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={`${styles.userInfo} ${styles3.userInfo}`}>
          <div className={styles.user}>
            <h3 className={styles.userName}>{props.memberInfoDto?.memberName}</h3>
            <h3 className={`${styles.userTrack} ${styles3.userTrack}`}>{props.memberInfoDto?.firstTrack}</h3>
          </div>
          <div className={styles.userImage}>
            <FaUser size={30} />
          </div>
        </div>
        <button type="button" className={`btn btn-primary ${styles.logoutBtn}`} onClick={handleLogout}>
          <TbLogout size={30} />
        </button>
      </div>
    </div>
  )
}

export default CollepsedSidebar