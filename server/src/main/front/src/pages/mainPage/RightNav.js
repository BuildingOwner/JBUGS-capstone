import { useState, useEffect } from "react";
import MainAssignItem from "./MainAssignItem";
import axios from "axios";
import "./RightNav.css";

const RightNav = (props) => {
  console.log("RightNav의 props", props)
  const mainLectures = props.mainLectures

  const handleLogout = () => {
    axios.post('/logout', null, { withCredentials: true }) // withCredentials를 설정하여 쿠키를 서버로 전송합니다.
      .then(response => {
        // 로그아웃 성공 시 처리
        console.log("로그아웃 성공");
        // 로그아웃 후에 적절한 동작 수행
      })
      .catch(error => {
        // 오류 처리
        console.error("로그아웃 실패", error);
      });
  }

  return (
    <div className="rightnav">
      <div className="righttop">
        <div className="info9">
          <div className="parent9">
            <b className="b176">{props.memberName}</b>
            <div className="div161">{props.firstTrack}</div>
          </div>
          <img
            className="personicon4"
            loading="lazy"
            alt=""
            src="/personicon1.svg"
          />
          <button type="button" className={`btn btn-primary`} onClick={handleLogout}> 
            로그아웃
          </button>
        </div>
      </div>
      <div className="homework">
        <div className="hw-top">
          <h1 className="title17">과제</h1>
        </div>
        <div className="hw-item no-scroll-bar">
          {mainLectures &&
            mainLectures.map((lecture) => (
              lecture.assignments.map((assignment) => (
                <MainAssignItem
                  lectureName={lecture.lectureName}
                  key={assignment.id}
                  title={assignment.title}
                  contents={assignment.contents}
                  dueDate={assignment.dueDate}
                  weekNumber={assignment.weekNumber}
                  status={assignment.status}
                />
              ))
            ))}
        </div>
      </div>
      {/* <div className="planner">
        <div className="title18">
          <h1 className="h1">시간표</h1>
        </div>
        <div className="timetable">
          <div className="time3">
            <div className="module-loader" />
            <div className="class-definer">
              <div className="instance-creator">09:00</div>
            </div>
            <div className="method-caller">
              <div className="property-assigner">10:00</div>
            </div>
            <div className="array-methods">
              <div className="string-methods">11:00</div>
            </div>
            <div className="math-constants">
              <div className="logical-constants">12:00</div>
            </div>
            <div className="function-constants">
              <div className="variable-constants">13:00</div>
            </div>
            <div className="exception-types">
              <div className="error-messages">14:00</div>
            </div>
            <div className="system-functions">
              <div className="utility-functions">15:00</div>
            </div>
            <div className="data-aggregator2">
              <div className="condition-branch">16:00</div>
            </div>
            <div className="input-array">
              <div className="output-pair">17:00</div>
            </div>
            <div className="nested-loop">
              <div className="function-call">18:00</div>
            </div>
            <div className="error-handler">
              <div className="iterative-structure">19:00</div>
            </div>
            <div className="logical-operator-wrapper">
              <div className="logical-operator">20:00</div>
            </div>
            <div className="value-holder">
              <div className="index-tracker">21:00</div>
            </div>
            <div className="variable-assigner">
              <div className="flow-control">22:00</div>
            </div>
            <div className="arithmetic-operation-wrapper">
              <div className="arithmetic-operation">23:00</div>
            </div>
          </div>
          <div className="mon">
            <div className="array-operation">
              <div className="div174">월</div>
            </div>
            <div className="assignment-operator" />
            <div className="comparison-operator" />
            <div className="logic-operator" />
            <div className="control-structure" />
            <div className="function-definition" />
            <div className="return-statement" />
            <div className="variable-declaration" />
            <div className="if-statement" />
            <div className="else-statement" />
            <div className="while-loop" />
            <div className="for-loop" />
            <div className="switch-case" />
            <div className="break-statement" />
            <div className="continue-statement" />
            <div className="try-catch-block" />
            <div className="wrapper39">
              <div className="div175">공학관 101</div>
            </div>
          </div>
          <div className="closure">
            <div className="div176">화</div>
          </div>
          <div className="filter-function" />
          <div className="reduce-function" />
          <div className="fold-function" />
          <div className="spread-operator" />
          <div className="destructuring" />
          <div className="rest-parameter" />
          <div className="object-literals" />
          <div className="template-literals" />
          <div className="timetable-child" />
          <div className="rest-properties" />
          <div className="spread-assignments" />
          <div className="call-expression" />
          <div className="data-aggregator3" />
          <div className="timetable-item" />
          <div className="input-splitter" />
          <div className="output-merger">
            <div className="div177">수</div>
          </div>
          <div className="stack-operations" />
          <div className="queue-operations" />
          <div className="condition-checker" />
          <div className="variable-holder" />
          <div className="function-executor" />
          <div className="loop-controller" />
          <div className="error-handler1" />
          <div className="connection-handler" />
          <div className="data-flow-control" />
          <div className="timetable-inner" />
          <div className="matrix-operations" />
          <div className="algorithm-manager" />
          <div className="formula-processor" />
          <div className="logic-gate" />
          <div className="database-access" />
          <div className="event-dispatcher">
            <div className="div178">목</div>
          </div>
          <div className="event-dispatcher1" />
          <div className="event-dispatcher2" />
          <div className="event-dispatcher3" />
          <div className="event-dispatcher4" />
          <div className="event-dispatcher5" />
          <div className="event-dispatcher6" />
          <div className="event-dispatcher7" />
          <div className="event-dispatcher8" />
          <div className="event-dispatcher9" />
          <div className="event-dispatcher10" />
          <div className="event-dispatcher11" />
          <div className="event-dispatcher12" />
          <div className="event-dispatcher13" />
          <div className="event-dispatcher14" />
          <div className="event-dispatcher15" />
          <div className="export-statement">
            <div className="div179">금</div>
          </div>
          <div className="export-statement1" />
          <div className="export-statement2" />
          <div className="export-statement3" />
          <div className="export-statement4" />
          <div className="export-statement5" />
          <div className="export-statement6" />
          <div className="export-statement7" />
          <div className="export-statement8" />
          <div className="export-statement9" />
          <div className="signal-processor" />
          <div className="data-aggregator4" />
          <div className="logic-branch" />
          <div className="input-container" />
          <div className="output-processor" />
          <div className="timetable-child1" />
          <div className="iteration-loop">
            <div className="div180">토</div>
          </div>
          <div className="timetable-child2" />
          <div className="timetable-child3" />
          <div className="timetable-child4" />
          <div className="timetable-child5" />
          <div className="timetable-child6" />
          <div className="timetable-child7" />
          <div className="timetable-child8" />
          <div className="timetable-child9" />
          <div className="timetable-child10" />
          <div className="timetable-child11" />
          <div className="timetable-child12" />
          <div className="timetable-child13" />
          <div className="timetable-child14" />
          <div className="timetable-child15" />
          <div className="timetable-child16" />
        </div>
      </div> */}
    </div>
  );
};

export default RightNav;
