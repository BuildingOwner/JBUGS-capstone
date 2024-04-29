import "./UserChatItem.css"

const UserChatItem = (props) => {
  // console.log("user chatting : ", props)
  return (
    <div className="chat-item">
      <div className="link-list">
        <div className="value-filter" />
        <div className="wrapper13">
          <div className="div30">진승원</div>
        </div>
      </div>
      <div className="div31">
        <p className="p13">{props.props}</p>
      </div>
    </div>
  );
}

export default UserChatItem;