import { useMemo } from "react";
import styles from "./BotchatItem.module.css"
import React from 'react';
import ReactMarkdown from 'react-markdown'
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
      
      <div className={styles.text} style={divStyle}><ReactMarkdown>{text}</ReactMarkdown></div>
    </div>
  );
};

export default ChatItem;
