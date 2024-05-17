import styles from "./ChatBoardItem.module.css"
import { FaUser } from "react-icons/fa";

const UserChatItem = (props) => {
  return (
    <div className={styles.itemContainer}>
      <h3 className={styles.text}>
        {props.text}
        {/* 이미지가 있을 경우 이미지 출력 */}
        <div className={styles.imageContainer}>
          {props.image ? props.image.map((image) => (

              <img src={image} alt="User uploaded" className={styles.uploadedImage} />

            )) : <></> }
        </div>
      </h3>

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