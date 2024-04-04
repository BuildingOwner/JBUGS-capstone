import "./VideoItem.css"

const VideoItem = () => {
    return (
        <div className="videoitem">
            <button className="observer">
                <b className="videoLength">15:30</b>
            </button>
            <div className="wrapper">
                <b className="videoTitle">강의제목입니다~~~~~</b>
            </div>
            <div className="bar-wrapper">
                <div className="bar">
                    <div className="bar-inner">
                        <div className="gauge" />
                    </div>
                    <b className="b28">50%</b>
                </div>
            </div>
        </div>
    );
}

export default VideoItem;