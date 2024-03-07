import { Icon } from '@iconify/react';

const Notice = () => {
  return (
    <div className="notice">
      <div className="title-wrap">
        <h1 className="notice-title">공지사항</h1>
        <button className="more-button">
          <Icon icon="ic:round-plus" width="1.6rem" />
        </button>
      </div>
      {/* 공지사항 글 */}
      <div className="writing-wrap">
        <Icon className="writing-icon" icon="material-symbols:circle" />
        <div className="writing">
          {`[`}스마트원격교육센터{`]`} 2024 1학기 대비 PPT 템플릿 맞춤 제작
        </div>
      </div>
      <div className="writing-wrap">
        <Icon className="writing-icon" icon="material-symbols:circle" />
        <div className="writing">
          '한성 e-Class' 업데이트 안내 (01/24 (수) 16:30 ~ 17:30)
        </div>
      </div>
      <div className="writing-wrap">
        <Icon className="writing-icon" icon="material-symbols:circle" />
        <div className="writing">'한성 e-Class'</div>
      </div>
    </div>
  );
};

export default Notice;
