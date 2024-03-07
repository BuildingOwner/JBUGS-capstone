import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  return (
    <div id="userInfo">
      <Icon icon="fluent:person-circle-24-filled" className="userImage" />
      <div className="info">
        <div className="userName">진승원</div>
        <div className="firstMajor">웹공학트랙</div>
      </div>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <div className="logout">로그아웃</div>
      </Link>
    </div>
  );
};

export default UserInfo;
