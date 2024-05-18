import { Link } from "react-router-dom";
import LoginForm from "./LoginForm"
import styles from "./LoginPage.module.css"
import { MdOutlineSchool } from "react-icons/md";
import { HiOutlineComputerDesktop } from "react-icons/hi2";

const LoginPage = () => {

  return (
    <div className={`background`}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img className={styles.logoImg} alt="" src="/logo.png" />
        </div>
        <div className={styles.form}>
          <div className={styles.top}>
            <div className={styles.title}>한성대 E-class</div>
            <div className={styles.slogan}>소통으로 여는 혁신, 혁신으로 여는 내일</div>
          </div>
          <LoginForm />
        </div>
        <div className={styles.links}>
          <Link to={"https://www.hansung.ac.kr/sites/hansung/index.do"} className={styles.schoolPage}><MdOutlineSchool /> 한성대학교</Link>
          <Link to={"https://info.hansung.ac.kr/"} className={styles.systemPage}><HiOutlineComputerDesktop /> 종합정보시스템</Link>
        </div>
      </div>
      <div className={styles.right}>
        <img className={styles.schoolImg} alt="" src="/schoolimg@2x.png" />
      </div>
    </div>
  );
};

export default LoginPage;
