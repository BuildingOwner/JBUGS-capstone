import { useMemo } from "react";
import "./NoticeRow1.css";

const NoticeRow1 = ({
  prop,
  prop1,
  propPadding,
  propBackgroundColor,
  propWidth,
  propDisplay,
  propMinWidth,
  propFlex,
  propPadding1,
  propMinWidth1,
}) => {
  const status1Style = useMemo(() => {
    return {
      padding: propPadding,
      backgroundColor: propBackgroundColor,
      width: propWidth,
    };
  }, [propPadding, propBackgroundColor, propWidth]);

  const b1Style = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
      flex: propFlex,
    };
  }, [propDisplay, propMinWidth, propFlex]);

  const secretStyle = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  const titleStyle = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  return (
    <div className="notice-row1">
      <div className="line13">
        <div className="num5">
          <div className="writer-label">123</div>
        </div>
        <button className="status21" style={status1Style}>
          <b className="b198" style={b1Style}>
            {prop}
          </b>
        </button>
        <div className="secret4" style={secretStyle}>
          <div className="pin-fill1">
            <img className="notice-row-data" alt="" src="/vector-71.svg" />
          </div>
        </div>
        <div className="title23" style={titleStyle}>
          <div className="title-text3">
            <p className="p118">{prop1}</p>
            <p className="p119">2줄임</p>
            <p className="p120">3줄임</p>
          </div>
        </div>
        <div className="writer5">
          <div className="div202">김아무개</div>
        </div>
        <div className="upload-date5">
          <div className="div203">2024-10-10</div>
        </div>
        <div className="view7">
          <div className="table-column-name">50000</div>
        </div>
      </div>
    </div>
  );
};

export default NoticeRow1;
