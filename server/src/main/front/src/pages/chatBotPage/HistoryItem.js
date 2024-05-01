import "./HistoryItem.css"

const HistoryItem = (props) => {
    return (
        <button className="history-item" onClick={() => (props.changeRoomId(props.chatRoomId))}>
            <input className="form-check-input" type="checkbox" />
            <div className="div36">{props.chatRoomName}</div>
        </button>
    );
}

export default HistoryItem;