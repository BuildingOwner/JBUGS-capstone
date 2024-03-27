import { memo, useMemo } from "react";
import styles from "./VideoItem.module.css";

const VideoItem = memo(
  ({ prop, propGap, propAlignSelf, propWidth, propHeight, propWidth1 }) => {
    const barStyle = useMemo(() => {
      return {
        gap: propGap,
      };
    }, [propGap]);

    const rectangleDivStyle = useMemo(() => {
      return {
        alignSelf: propAlignSelf,
        width: propWidth,
        height: propHeight,
      };
    }, [propAlignSelf, propWidth, propHeight]);

    const b4Style = useMemo(() => {
      return {
        width: propWidth1,
      };
    }, [propWidth1]);

    return (
      <div className={styles.videoitem}>
        <div className={styles.observer}>
          <b className={styles.signaler}>15:30</b>
        </div>
        <div className={styles.wrapper}>
          <b className={styles.b}>강의제목입니다~~~~~</b>
        </div>
        <div className={styles.barWrapper}>
          <div className={styles.bar} style={barStyle}>
            <div className={styles.barInner}>
              <div className={styles.frameChild} style={rectangleDivStyle} />
            </div>
            <b className={styles.b1} style={b4Style}>
              {prop}
            </b>
          </div>
        </div>
      </div>
    );
  },
);

export default VideoItem;
