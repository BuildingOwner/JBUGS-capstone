import { Icon } from '@iconify/react';
const SchoolLink = () => {
  return (
    <div className="login-right">
      <div className="university-link">
        <Icon
          icon="icon-park-twotone:school"
          style={{ color: '#3B469C', background: 'white' }}
          width="1.6rem"
          height="1.6rem"
        />
        <div>한성대학교</div>
      </div>
      <div className="hansungInfo-link">
        <Icon
          icon="eos-icons:system-ok-outlined"
          style={{ color: '#3B469C' }}
          width="1.6rem"
          height="1.6rem"
        />
        <div>종합정보시스템</div>
      </div>
      <div className="hsel-link">
        <Icon
          icon="majesticons:book-line"
          style={{ color: '#3B469C' }}
          width="1.6rem"
          height="1.6rem"
        />
        <div>학술정보관</div>
      </div>
      <div className="nsso-link">
        <Icon
          icon="pepicons-pencil:internet"
          style={{ color: '#3B469C' }}
          width="1.6rem"
          height="1.6rem"
        />
        <div>한성인트라넷</div>
      </div>
      <div className="mail-link">
        <Icon
          icon="octicon:mail-24"
          style={{ color: '#3B469C' }}
          width="1.6rem"
          height="1.6rem"
        />
        <div>한성웹메일</div>
      </div>
    </div>
  );
};

export default SchoolLink;
