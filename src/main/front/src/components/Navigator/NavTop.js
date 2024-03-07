import { Icon } from '@iconify/react';
import hansungLogo from '../../image/hansung_logo.png';
import NavButton from './NavButton';
import UserInfo from './UserInfo';
import './NavTop.css';
import { Link } from 'react-router-dom';

const NavTop = () => {
  return (
    <div id="navTop">
      <div className="imageWrap">
        <Link to="/main">
          <img src={hansungLogo} className="HansungLogo" alt="한성대로고" />
        </Link>
      </div>
      {/* 네브 버튼 */}
      <NavButton />
      {/* 사용자 정보 */}
      <UserInfo />
    </div>
  );
};

export default NavTop;
