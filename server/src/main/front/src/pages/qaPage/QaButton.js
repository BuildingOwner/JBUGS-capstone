import "./QaButton.css"

const QaButton = () => {
    return (
        <nav className="tab">
              <button className="tab-item">
                <div className="my">전체 질문</div>
              </button>
              <button className="tab-item1">
                <div className="my1">내 질문</div>
              </button>
              <button className="tab-item2">
                <div className="my2">답변 완료</div>
              </button>
            </nav>
    );
}

export default QaButton;