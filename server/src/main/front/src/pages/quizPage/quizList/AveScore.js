import "./AveScore.css";

const AveScore = ({ prop, prop1 }) => {
  return (
    <div className="ave-score">
      <div className="div230">{prop}</div>
      <div className="div231">{prop1}</div>
      <div className="grade">
        <div className="fluent-emoji-high-contrastred">
          <img className="vector-icon68" alt="" src="/vector-7.svg" />
        </div>
        <div className="data-collector">23%</div>
      </div>
    </div>
  );
};

export default AveScore;
