import Mid from "../components/Mid";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.loginPage}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img
            className={styles.logoIcon}
            loading="lazy"
            alt=""
            src="/logo1@2x.png"
          />
        </div>
        <Mid />
      </div>
      <div className={styles.right}>
        <img
          className={styles.schoolimgIcon}
          loading="lazy"
          alt=""
          src="/schoolimg@2x.png"
        />
      </div>
    </div>
  );
};

export default LoginPage;
