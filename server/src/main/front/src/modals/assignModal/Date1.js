import { useMemo } from "react";
import "./Date1.css";

const Date1 = ({ propWidth }) => {
  const dateStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className="date30" style={dateStyle}>
      <b className="b219">제출 여부</b>
      <button className="submit14">
        <b className="b220">제출 완료</b>
      </button>
    </div>
  );
};

export default Date1;
