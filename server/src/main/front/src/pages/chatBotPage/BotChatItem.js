import { useMemo } from "react";
import styles from "./BotchatItem.module.css"
import { FaUser } from "react-icons/fa";

const ChatItem = ({ propLineHeight, text }) => {
  // console.log(props)
  const divStyle = useMemo(() => {
    return {
      lineHeight: propLineHeight,
    };
  }, [propLineHeight]);

  return (
    <div className={styles.itemContainer}>
      <div className={styles.profile}>
        <div className={styles.userIconWrapper}>
          <FaUser size={25} />
        </div>
        <h3 className={styles.name}>AI부기</h3>
      </div>
      <h3 className={styles.text} style={divStyle}>{text}</h3>
    </div>
  );
};

export default ChatItem;
