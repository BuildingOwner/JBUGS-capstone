import { useMemo } from "react";
import "./FileItem.css";

const FileItem = ({
  fileType,
  propPadding,
  propBackgroundColor,
  propWidth,
  propMinWidth,
}) => {
  const frameButtonStyle = useMemo(() => {
    return {
      padding: propPadding,
      backgroundColor: propBackgroundColor,
    };
  }, [propPadding, propBackgroundColor]);

  const pPTStyle = useMemo(() => {
    return {
      width: propWidth,
      minWidth: propMinWidth,
    };
  }, [propWidth, propMinWidth]);

  return (
    <div className="fileitem">
      <div className="frame-container">
        <button className="ppt-wrapper" style={frameButtonStyle}>
          <b className="ppt" style={pPTStyle}>
            {fileType}
          </b>
        </button>
        <b className="b184">자료명입니다</b>
      </div>
      <b className="mb">37.9MB</b>
    </div>
  );
};

export default FileItem;
