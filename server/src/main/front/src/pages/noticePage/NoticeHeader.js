import "./NoticeHeader.css"

const NoticeHeader = () => {
    return(
        <nav className="tab1">
              <button className="tab-item3">
                <div className="my3">전체 공지</div>
              </button>
              <button className="tab-item4">
                <div className="my4">시험</div>
              </button>
              <button className="tab-item5">
                <div className="my5">온라인</div>
              </button>
              <button className="tab-item6">
                <div className="my6">대면수업</div>
              </button>
            </nav>
    );
}

export default NoticeHeader;