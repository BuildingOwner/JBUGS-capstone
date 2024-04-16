import "./FileItem.css"

const FileItem  = () => {
    return (
        <div className="file-list">
            <div className="l-file-item">
              <input className="l" type="checkbox" />
              <div className="file-item">
                <div className="txt">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex1">
              <img
                className="vector-icon1"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
    );
}

export default FileItem;