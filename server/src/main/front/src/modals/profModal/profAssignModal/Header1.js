import { useMemo } from "react";
import "./Header1.css";

const Header1 = ({ qA, frameDivWidth }) => {
  const qAStyle = useMemo(() => {
    return {
      width: frameDivWidth,
    };
  }, [frameDivWidth]);

  return (
    <section className="header10">
      <h3 className="qa6" style={qAStyle}>
        {qA}
      </h3>
      <div className="heroicons-outlinex-wrapper">
        <div className="heroicons-outlinex29">
          <img
            className="vector-icon76"
            loading="lazy"
            alt=""
            src="/vector1.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default Header1;
