import styles from "./HistoryItem.module.css"

const HistoryItem = (props) => {

  return (
    <div className={`${styles.historyItem} ${props.selectedId ==props.chatRoomId ? styles.selected : null}`} >
      <input className={`form-check-input ${styles.checkBox}`} type="checkbox" />
      <button className={styles.roomTitle} onClick={() => (props.changeRoomId(props.chatRoomId))}>
        <h3 className={styles.roomName}>{props.chatRoomName}</h3>
      </button>
    </div>
  );
}

export default HistoryItem;