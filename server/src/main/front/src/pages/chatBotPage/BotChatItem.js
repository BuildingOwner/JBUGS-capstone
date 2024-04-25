import { useMemo } from "react";
import "./BotChatItem.css";

const ChatItem = ({ propLineHeight }) => {
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
          <p className="p124">기계의 답변이다.</p>
          <p className="p125">
            ㅁㄴㅇㄻㄴㅇㄴㄹㄴㅁㅇㄻㄴㄻㄴㄻㄴㅇㄹㄴㄹㄴㅁㄹㄴㅇㅁ
          </p>
          <p className="p126">
            ㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅁㄴㄴㅇㅁㄻㄴㄻㄴㄻㄴㄻㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇ
          </p>
        </span>
      </div>
    </div>
  );
};

export default ChatItem;
