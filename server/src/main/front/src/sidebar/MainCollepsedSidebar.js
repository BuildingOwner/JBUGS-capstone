import { Link } from "react-router-dom"
import { GoHome } from "react-icons/go";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import styles from "./MainSidebar.module.css"
import styles2 from "./MainSidebarCollepsed.module.css"

function CollepsedSidebar({ memberInfoDto }) {
  return (
    <div className={`${styles.sidebars} ${styles2.sidebars}`}>
      <Link to={"/"} className={`${styles.logo}`}>
        <img
          className={`${styles.sidebarLogo} ${styles2.sidebarLogo}`}
          loading="lazy"
          alt=""
          src="/miniLogo.png"
        />
      </Link>
      <div className={styles.sidebarContainer}>
        <div className={styles.navBtns}>
          <Link to={"/"} className={`${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <button className={`btn btn-primary ${styles.linkBtn} ${styles2.sidebarNavBtn}`}>
              <GoHome size="30" />
            </button>
          </Link>
          <Link to={"/chatbotpage"} state={{ memberName: memberInfoDto?.memberName }} className={`${styles.sidebarNavBtn} ${styles2.sidebarNavBtn}`}>
            <button className={`btn btn-primary ${styles.linkBtn} ${styles2.sidebarNavBtn}`}>
              <IoChatbubbleEllipsesOutline size="30" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CollepsedSidebar