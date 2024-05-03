import { Link } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import styles from "./MainSidebar.module.css"
import styles2 from "./MainSidebarCollepsed.module.css"

function CollepsedSidebar() {
  return (
    <div className={`${styles.sidebars} ${styles2.sidebars}`}>
      <Link to={"/main"} className={`${styles.logo}`}>
        <img
          className={`${styles.sidebarLogo} ${styles2.sidebarLogo}`}
          loading="lazy"
          alt=""
          src="/miniLogo.png"
        />
      </Link>
      <div className={styles.sidebarContainer}>
        <div className={styles.navBtns}>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/main"} className={styles.linkBtn}>
              <GoHome size="30" />
            </Link>
          </button>
          <button className={`btn btn-primary ${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <Link to={"/chatbotpage"} className={styles.linkBtn}>
              <IoChatbubbleEllipsesOutline size="30" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollepsedSidebar