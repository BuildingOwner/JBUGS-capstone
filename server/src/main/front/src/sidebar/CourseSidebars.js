import React, { useState } from 'react';
import Sidebar from './Sidebar';
import CollepsedSidebar from './CollepsedSidebar';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./MainSidebars.module.css"

function CourseSidebar(props) {
  const enrollmentId = props.enrollmentId
  const memberInfoDto = props.memberInfoDto
  const lectureName = props.lectureName
  const division = props.division
  const [showMainSidebar, setShowMainSidebar] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setShowMainSidebar(!showMainSidebar);
    setCollapsed(!collapsed); // 사이드바 접힘/펼침 상태 변경
  };

  return (
    <div className={`${styles.sidebars} ${collapsed ? styles.collapsed : ''}`}>
      {showMainSidebar ? <Sidebar memberInfoDto={memberInfoDto} lectureName={lectureName} division={division} enrollmentId={enrollmentId}/>
        : <CollepsedSidebar memberInfoDto={memberInfoDto} lectureName={lectureName} division={division} enrollmentId={enrollmentId}/>}
      <div className={showMainSidebar ? styles.colleseBtn : styles.colleseBtnCollepsed}>
        <div className={styles.colleseBtnRight} onClick={toggleSidebar}>
          {showMainSidebar ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </div>
      </div>
    </div>
  );
}

export default CourseSidebar;
