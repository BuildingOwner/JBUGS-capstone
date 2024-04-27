import { useMemo } from "react";
import "./Info.css";

const Info = (
  {
  prop,
  prop1,
  propPadding,
  propMinWidth,
  propAlignSelf,
  propAlignSelf1,
  propMinWidth1,
  props
}) => {
  const scoreStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  console.log(props)
  const b3Style = useMemo(() => {
    return {
      minWidth: propMinWidth,
      alignSelf: propAlignSelf,
    };
  }, [propMinWidth, propAlignSelf]);

  const b4Style = useMemo(() => {
    return {
      alignSelf: propAlignSelf1,
      minWidth: propMinWidth1,
    };
  }, [propAlignSelf1, propMinWidth1]);

  return (
    <section className="info27">
      <div className="score22" style={scoreStyle}>
        <b className="b213" style={b3Style}>
          {prop}
        </b>
        <b className="b214" style={b4Style}>
          {prop1}
        </b>
      </div>
      <div className="percent">
        <b className="b215">반영 비율</b>
        <b className="b216">5 % / 20 %</b>
      </div>
      <div className="time7">
        <b className="b217">분류</b>
        <b className="b218">{props.quizType}</b>
      </div>
    </section>
  );
};

export default Info;
