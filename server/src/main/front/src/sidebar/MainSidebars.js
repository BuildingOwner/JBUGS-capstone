import React, { useEffect, useState } from 'react';
import MainSidebar from './MainSidebar';
import MainCollepsedSidebar from './MainCollepsedSidebar';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./MainSidebars.module.css"

function Sidebar({ memberInfoDto }) {
  const [showMainSidebar, setShowMainSidebar] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  console.log("MainSidebars의 memberInfoDto : ", memberInfoDto)

  const toggleSidebar = () => {
    setShowMainSidebar(!showMainSidebar);
    setCollapsed(!collapsed); // 사이드바 접힘/펼침 상태 변경
  }

  return (
    <div className={`${styles.sidebars} ${collapsed ? styles.collapsed : ''}`}>
      {showMainSidebar ? <MainSidebar memberInfoDto={memberInfoDto} /> : <MainCollepsedSidebar memberInfoDto={memberInfoDto} />}
      <div className={showMainSidebar ? styles.colleseBtn : styles.colleseBtnCollepsed}>
        <div className={styles.colleseBtnRight} onClick={toggleSidebar}>
          {showMainSidebar ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
