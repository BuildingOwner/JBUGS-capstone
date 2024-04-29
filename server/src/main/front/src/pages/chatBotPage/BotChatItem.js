import { useMemo } from "react";
import "./BotChatItem.css";

const ChatItem = ({ propLineHeight, props }) => {
  // console.log(props)
  const divStyle = useMemo(() => {
    return {
      lineHeight: propLineHeight,
    };
  }, [propLineHeight]);

  return (
    <div className="chat-item4">
      <div className="frame-parent2">
        <div className="color-palette-wrapper">
          <div className="color-palette" />
        </div>
        <div className="ai1">AI 부기</div>
      </div>
      <div className="div211" style={divStyle}>
        <span>
          <p className="p124">{props}</p>
        </span>
      </div>
    </div>
  );
};

export default ChatItem;
