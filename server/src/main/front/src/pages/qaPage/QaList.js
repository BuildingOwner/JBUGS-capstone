import Sidebar from "../../sidebar/Sidebar";
import QaHeader from "./QaHeader";
import QnaRow1 from "./QnaRow1";
import QnaRow from "./QnaRow";
import QaButton from "./QaButton";
import QaListHeader from "./QaListHeader";
import "./QaList.css";

const QaList = () => {
  return (
    <div className="qalist">
      <Sidebar />
      <main className="align-center">
        <section className="content1">
          <QaHeader />
          <div className="list1">
            <QaButton />
            <QaListHeader />
            <div className="table">
              <QnaRow1 prop="완료" />
              <QnaRow1
                prop="완료"
              />
              <QnaRow1
                prop="완료"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propBackgroundColor="#72bd92"
                propWidth="unset"
                propDisplay="inline-block"
                propMinWidth="2.25rem"
                propFlex="unset"
              />
              <QnaRow1
                prop="완료"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propBackgroundColor="#72bd92"
                propWidth="unset"
                propDisplay="inline-block"
                propMinWidth="2.25rem"
                propFlex="unset"
              />
              <QnaRow1
                prop="완료"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propBackgroundColor="#72bd92"
                propWidth="unset"
                propDisplay="inline-block"
                propMinWidth="2.25rem"
                propFlex="unset"
              />
              <QnaRow1
                prop="완료"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propBackgroundColor="#72bd92"
                propWidth="unset"
                propDisplay="inline-block"
                propMinWidth="2.25rem"
                propFlex="unset"
              />
              <QnaRow1
                prop="답변 예정"
                propPadding="var(--padding-3xs) var(--padding-base-5)"
                propBackgroundColor="#f49e9e"
                propWidth="6.875rem"
                propDisplay="inline-block"
                propMinWidth="unset"
                propFlex="1"
              />
              <QnaRow />
              <QnaRow />
              <QnaRow />
              <QnaRow />
              <QnaRow />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QaList;
