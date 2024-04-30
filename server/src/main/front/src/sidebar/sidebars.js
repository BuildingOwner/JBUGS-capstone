import React, { useState } from 'react';
import MainSidebar from './MainSidebar';
import CollepsedSidebar from './CollepsedSidebar';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./sidebars.module.css"

function Sidebar(memberInfoDto) {
  const [showMainSidebar, setShowMainSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowMainSidebar(!showMainSidebar);
  };

  return (
    <div className={styles.sidebars}>
      {showMainSidebar ? <MainSidebar memberInfoDto={memberInfoDto} /> : <CollepsedSidebar />}
      <div className={showMainSidebar ? styles.colleseBtn : styles.colleseBtnCollepsed}>
        <div className={styles.colleseBtnRight} onClick={toggleSidebar}>
          {showMainSidebar ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
