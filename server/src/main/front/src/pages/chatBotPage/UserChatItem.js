import styles from "./ChatBoardItem.module.css"
import { FaUser } from "react-icons/fa";

const UserChatItem = (props) => {
  return (
    <div className={styles.itemContainer}>
      <h3 className={styles.text}>{props.text}</h3>
      <div className={styles.profile}>
        <div className={styles.userIconWrapper}>
        <FaUser size={25} />
        </div>
        <h3 className={styles.name}>{props.memberName}</h3>
      </div>
    </div>
  );
}

export default UserChatItem;