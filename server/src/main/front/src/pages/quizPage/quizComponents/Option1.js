import { useMemo } from "react";
import "./Option1.css";

const Option1 = ({ propBackgroundColor, propBorderBottom }) => {
  const optionItemStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      borderBottom: propBorderBottom,
    };
  }, [propBackgroundColor, propBorderBottom]);

  return (
    <div className="option">
      <div className="option-item" style={optionItemStyle}>
        <img className="number-icon10" alt="" src="/number.svg" />
        <div className="option-text">보기에용</div>
      </div>
      <div className="option-item1">
        <img className="number-icon11" alt="" src="/number.svg" />
        <div className="option-text1">보기에용</div>
      </div>
      <div className="option-item2">
        <img className="number-icon12" alt="" src="/number.svg" />
        <div className="option-text2">보기에용</div>
      </div>
      <div className="option-item3">
        <img className="number-icon13" alt="" src="/number.svg" />
        <div className="option-text3">보기에용</div>
      </div>
    </div>
  );
};

export default Option1;
