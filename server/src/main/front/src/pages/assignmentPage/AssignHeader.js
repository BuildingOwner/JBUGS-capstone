import styles from "./AssignHeader.module.css"
import { GoSearch } from "react-icons/go";

const AssignHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.top}>
        <h2 className={styles.title}>과제</h2>
        <div className={styles.searchContainer}>
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
        </div>
      </div>
    </div>
  );
};

export default AssignHeader;
