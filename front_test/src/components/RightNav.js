import { memo } from "react";
import styles from "./RightNav.module.css";

const RightNav = memo(() => {
  return (
    <div className={styles.rightnav}>
      <div className={styles.righttop}>
        <div className={styles.info}>
          <div className={styles.parent}>
            <b className={styles.b}>진승원</b>
            <div className={styles.div}>웹공학트랙</div>
          </div>
          <img
            className={styles.personicon}
            loading="lazy"
            alt=""
            src="/personicon.svg"
          />
        </div>
      </div>
      <div className={styles.homework}>
        <div className={styles.hwTop}>
          <h1 className={styles.title}>과제</h1>
        </div>
        <div className={styles.hwItem}>
          <div className={styles.homeworkitem}>
            <div className={styles.week}>
              <div className={styles.div1}>00 주</div>
            </div>
            <div className={styles.name}>
              <b className={styles.b1}>겁나 기이이이이이잉ㅇㄴ 강의명</b>
              <div className={styles.div2}>제목이에용</div>
            </div>
            <div className={styles.info1}>
              <div className={styles.closenessCentrality}>
                <div className={styles.n}>n일 남음</div>
              </div>
              <img
                className={styles.octiconx12}
                loading="lazy"
                alt=""
                src="/octiconx12.svg"
              />
            </div>
          </div>
          <div className={styles.homeworkitem}>
            <div className={styles.week}>
              <div className={styles.div1}>00 주</div>
            </div>
            <div className={styles.name}>
              <b className={styles.b1}>겁나 기이이이이이잉ㅇㄴ 강의명</b>
              <div className={styles.div2}>제목이에용</div>
            </div>
            <div className={styles.info1}>
              <div className={styles.closenessCentrality}>
                <div className={styles.n}>n일 남음</div>
              </div>
              <img className={styles.octiconx12} alt="" src="/octiconx12.svg" />
            </div>
          </div>
          <div className={styles.homeworkitem}>
            <div className={styles.week}>
              <div className={styles.div1}>00 주</div>
            </div>
            <div className={styles.name}>
              <b className={styles.b1}>겁나 기이이이이이잉ㅇㄴ 강의명</b>
              <div className={styles.div2}>제목이에용</div>
            </div>
            <div className={styles.info1}>
              <div className={styles.closenessCentrality}>
                <div className={styles.n}>n일 남음</div>
              </div>
              <img className={styles.octiconx12} alt="" src="/octiconx12.svg" />
            </div>
          </div>
          <div className={styles.homeworkitem}>
            <div className={styles.week}>
              <div className={styles.div1}>00 주</div>
            </div>
            <div className={styles.name}>
              <b className={styles.b1}>겁나 기이이이이이잉ㅇㄴ 강의명</b>
              <div className={styles.div2}>제목이에용</div>
            </div>
            <div className={styles.info1}>
              <div className={styles.closenessCentrality}>
                <div className={styles.n}>n일 남음</div>
              </div>
              <img className={styles.octiconx12} alt="" src="/octiconx12.svg" />
            </div>
          </div>
          <div className={styles.homeworkitem}>
            <div className={styles.week}>
              <div className={styles.div1}>00 주</div>
            </div>
            <div className={styles.name}>
              <b className={styles.b1}>겁나 기이이이이이잉ㅇㄴ 강의명</b>
              <div className={styles.div2}>제목이에용</div>
            </div>
            <div className={styles.info1}>
              <div className={styles.closenessCentrality}>
                <div className={styles.n}>n일 남음</div>
              </div>
              <img className={styles.octiconx12} alt="" src="/octiconx12.svg" />
            </div>
          </div>
          <div className={styles.homeworkitem}>
            <div className={styles.week}>
              <div className={styles.div11}>00 주</div>
            </div>
            <div className={styles.name}>
              <b className={styles.b6}>겁나 기이이이이이잉ㅇㄴ 강의명</b>
              <div className={styles.div2}>제목이에용</div>
            </div>
            <div className={styles.info1}>
              <div className={styles.closenessCentrality}>
                <div className={styles.n5}>n일 남음</div>
              </div>
              <img className={styles.octiconx12} alt="" src="/octiconx12.svg" />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.planner}>
        <div className={styles.hwTop}>
          <h1 className={styles.h1}>시간표</h1>
        </div>
        <div className={styles.timetable}>
          <div className={styles.time}>
            <div className={styles.fontPicker} />
            <div className={styles.wrapper}>
              <div className={styles.div13}>09:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.characterSpacing}>10:00</div>
            </div>
            <div className={styles.fontSizeControllerWrapper}>
              <div className={styles.fontSizeController}>11:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.outputFormatter}>12:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.characterSpacing}>13:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.characterSpacing}>14:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.outputFormatter}>15:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.characterSpacing}>16:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.outputFormatter}>17:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.characterSpacing}>18:00</div>
            </div>
            <div className={styles.wrapper1}>
              <div className={styles.characterSpacing}>19:00</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.div13}>20:00</div>
            </div>
            <div className={styles.characterSpacingWrapper}>
              <div className={styles.outputFormatter}>21:00</div>
            </div>
            <div className={styles.wrapper4}>
              <div className={styles.div13}>22:00</div>
            </div>
            <div className={styles.wrapper}>
              <div className={styles.div13}>23:00</div>
            </div>
          </div>
          <div className={styles.mon}>
            <div className={styles.sizeScaler}>
              <div className={styles.div23}>월</div>
            </div>
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.shapeTransformer} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.shapeTransformer} />
            <div className={styles.fontPicker} />
            <div className={styles.rectangleDiv}>
              <div className={styles.div24}>공학관 101</div>
            </div>
          </div>
          <div className={styles.tue}>
            <div className={styles.sizeScaler}>
              <div className={styles.div23}>화</div>
            </div>
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.shapeTransformer} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.shapeTransformer} />
            <div className={styles.fontPicker} />
          </div>
          <div className={styles.wed}>
            <div className={styles.sizeScaler}>
              <div className={styles.div23}>수</div>
            </div>
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.shapeTransformer} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.shapeTransformer} />
            <div className={styles.fontPicker} />
          </div>
          <div className={styles.thr}>
            <div className={styles.sizeScaler}>
              <div className={styles.div23}>목</div>
            </div>
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.shapeTransformer} />
            <div className={styles.fontPicker} />
            <div className={styles.fontPicker} />
            <div className={styles.shapeTransformer} />
            <div className={styles.fontPicker} />
          </div>
          <div className={styles.blendingMode}>
            <div className={styles.div23}>금</div>
          </div>
          <div className={styles.timetableChild} />
          <div className={styles.floater} />
          <div className={styles.anchorPointManager} />
          <div className={styles.dynamicPositioner} />
          <div className={styles.smartAnchor} />
          <div className={styles.autoAlignment} />
          <div className={styles.resizableContainer} />
          <div className={styles.flexboxLayout} />
          <div className={styles.timetableItem} />
          <div className={styles.aligner} />
          <div className={styles.dataFlowManager} />
          <div className={styles.inputProcessor} />
          <div className={styles.outputAggregator} />
          <div className={styles.conditionChecker} />
          <div className={styles.errorHandler} />
          <div className={styles.loopController1}>
            <div className={styles.div23}>토</div>
          </div>
          <div className={styles.dataMerger} />
          <div className={styles.dataSplitter} />
          <div className={styles.dataTransformer} />
          <div className={styles.dataFilter} />
          <div className={styles.dataQueue} />
          <div className={styles.dataBuffer} />
          <div className={styles.dataLink} />
          <div className={styles.dataTree} />
          <div className={styles.dataGraph} />
          <div className={styles.dataMap} />
          <div className={styles.dataMatrix} />
          <div className={styles.dataTable} />
          <div className={styles.timetableInner} />
          <div className={styles.dataBlock} />
          <div className={styles.dataPool} />
        </div>
      </div>
    </div>
  );
});

export default RightNav;
