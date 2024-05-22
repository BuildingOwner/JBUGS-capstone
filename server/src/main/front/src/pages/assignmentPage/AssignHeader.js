import styles from "./AssignHeader.module.css"
import { GoSearch } from "react-icons/go";

const AssignHeader = ({ lectureName, division }) => {
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <h3 className={styles.title}>과제</h3>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{lectureName} {division}</h3>
        </div>
        {/* <div className={styles.searchContainer}>
          <select className={`form-select form-select-sm ${styles.select}`} defaultValue={'title'}>
            <option value={`title`}>제목</option>
            <option value={`writer`}>글쓴이</option>
          </select>
          <div className={styles.searchBox}>
            <input className={`form-control ${styles.search}`} type="text" placeholder="검색어를 입력하세요..." />
            <div className={styles.questionIcon}>
              <GoSearch size={20} />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AssignHeader;
