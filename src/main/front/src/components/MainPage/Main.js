import { useEffect, useState } from 'react';
import NavTop from '../Navigator/NavTop';
import { TopCalendar } from './TopCalendar';
import { Container } from './Container';
import { Upload } from '../Upload';
import Modal from 'react-modal';
import './Main.css';

const Main = () => {
  const week = 1;
  const course = '웹프레임워크1';
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <NavTop />
      {/* <TopCalendar />
      <Container /> */}
      <button onClick={openModal}>파일 업로드</button>
      <Modal isOpen={modalOpen} onRequestClose={closeModal} ariaHideApp={false}>
        {/* <div id="Modal">
          <div className="courseName">과목 : {course}</div>
          <div className="week">주차 : {week}</div>
          <div className="filewWrap">
            자료명 : <input type="" className="fileName" />
            <input type="file" id="fileUpload" />
          </div>
          <button onClick={closeModal}>닫기</button>
          <button>업로드</button>
        </div> */}
        {modalOpen && <Upload course={course} week={week} />}
      </Modal>
    </>
  );
};

export default Main;
