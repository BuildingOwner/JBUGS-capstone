import Sidebar from "../../sidebar/Sidebar";
import AssignHeader from "./AssignHeader";
import YetAssign from "./YetAssign";
import DoneAssign from "./DoneAssign";
import AssignListHeader from "./AssignListHeader"
import "./AssignmentList.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AssignmentList = () => {
  const enrollmentId = useLocation().state
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignmentList = async () => {
      try {
        const response = await axios.get(`/api/course/${enrollmentId}/assignment`, {
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요
        });
        console.log("response = ", response.data.assignmentDtoList)
        const assignmentList = response.data.assignmentDtoList;
        setAssignments(assignmentList);
        console.log("assignmentData=", assignmentList)
      }
      catch (error) {
        console.error("Error fetching assignList info:", error);
      }
    };

    fetchAssignmentList();
  }, []);
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

              {assignments.map((assignment) =>
                  assignment.status === "NOT_SUBMITTED" ? (
                    <YetAssign
                      key={assignment.id}
                      title={assignment.title}
                      contents={assignment.contents}
                      dueDate={assignment.dueDate}
                      weekId={assignment.weekNumber}
                      status={assignment.status}
                    />
                  ) : null
                )}
              </div>
            </div>
            <div className="done">
              <AssignListHeader title="제출 과제"/>
              <div className="done-assign">
              {assignments.map((assignment) =>
                  assignment.status === "SSUBMITTED" ? (
                    <DoneAssign 
                  key={assignment.id}
                      title={assignment.title}
                      contents={assignment.contents}
                      dueDate={assignment.dueDate}/>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AssignmentList;
