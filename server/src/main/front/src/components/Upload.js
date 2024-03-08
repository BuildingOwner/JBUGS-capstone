export const Upload = ({ setModalOpen, course, week }) => {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div id="Modal">
      <div className="courseName">과목 : {course}</div>
      <div className="week">주차 : {week}</div>
      <div className="filewWrap">
        자료명 : <input type="" className="fileName" />
        <input type="file" id="fileUpload" />
      </div>
      <button onClick={closeModal}>닫기</button>
      <button>업로드</button>
    </div>
  );
};
