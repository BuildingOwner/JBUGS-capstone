import { memo } from "react";
import styles from "./Mid.module.css";

const Mid = memo(() => {
  return (
    <div className={styles.mid}>
      <div className={styles.title}>
        <h1 className={styles.eClass}>한성대 E-class</h1>
        <div className={styles.div}>
          <p className={styles.p}>미래를 디자인 하는 창의융합교육 선도대학</p>
          <p className={styles.p}>소통으로 여는 혁신, 혁신으로 여는 내일</p>
        </div>
      </div>
      <form className={styles.loginform}>
        <div className={styles.id}>
          <h3 className={styles.id1}>ID</h3>
          <div className={styles.input}>
            <div className={styles.enterYourId}>Enter your id</div>
          </div>
        </div>
        <div className={styles.id}>
          <h3 className={styles.password1}>Password</h3>
          <div className={styles.input}>
            <div className={styles.enterYourPassword}>Enter your password</div>
          </div>
        </div>
        <div className={styles.idcheck}>
          <div className={styles.saveid}>
            <img
              className={styles.iconParkOutlinecheckOne}
              loading="lazy"
              alt=""
              src="/iconparkoutlinecheckone.svg"
            />
            <div className={styles.id2}>ID 저장</div>
          </div>
          <div className={styles.div1}>아이디/비밀번호 찾기</div>
        </div>
        <div className={styles.creativeHUName}>
          <div className={styles.signIn}>Sign in</div>
        </div>
      </form>
      <div className={styles.div2}>
        <div className={styles.div3}>한성대학교</div>
        <div className={styles.div4}>종합정보시스템</div>
      </div>
    </div>
  );
});

export default Mid;
