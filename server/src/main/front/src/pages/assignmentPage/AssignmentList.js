import Sidebar from "../../sidebar/Sidebar";
import AssignHeader from "./AssignHeader";
import YetAssign from "./YetAssign";
import DoneAssign from "./DoneAssign";
import AssignListHeader from "./AssignListHeader"
import "./AssignmentList.css";

const AssignmentList = () => {
  return (
    <div className="assignmentlist">
      <Sidebar />
      <main className="content-frame">
        <section className="content7">
          <AssignHeader />
          <div className="list3">
            <div className="yet">
              <AssignListHeader title="미제출 과제"/>
              <div className="list-items">
                <YetAssign />
                <YetAssign />
              </div>
            </div>
            <div className="done">
              <AssignListHeader title="제출 과제"/>
              <div className="done-assign">
                <DoneAssign />
                <DoneAssign />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AssignmentList;
