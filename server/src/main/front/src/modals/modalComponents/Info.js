import { useMemo } from "react";
import "./Info.css";

const Info = (
  {
    prop,
    score,
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
          {score}점
        </b>
      </div>
      <div className="percent">
        <b className="b215">반영 비율</b>
        <b className="b216">5 % / 20 %</b>
      </div>
      <div className="time7">
        <b className="b217">분류</b>
        {props.quizType === 'PRACTICE' && (
          <b className="b218">연습문제</b>
        )}
        {props.quizType === 'quizlist' && (
          props.submissionStatus === true ? (
            <h4>
              응시
            </h4>
          ) : (
            <h4>
              미응시
            </h4>
          )
        )}
        {props.quizType === 'material' && (
          <p>This is a material</p>
        )}
        {props.quizType === 'video' && (
          <p>This is a video</p>
        )}
        
      </div>
    </section>
  );
};

export default Info;
