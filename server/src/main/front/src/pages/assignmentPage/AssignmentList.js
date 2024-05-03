import Sidebar from "../../sidebar/Sidebar";
import AssignHeader from "./AssignHeader";
import YetAssign from "./YetAssign";
import DoneAssign from "./DoneAssign";
import AssignListHeader from "./AssignListHeader"
import "./AssignmentList.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AssignmentList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const enrollmentId = location.state.enrollmentId
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [assignments, setAssignments] = useState([])
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [courseDto, setCourseDto] = useState()

  useEffect(() => {
    const fetchAssignmentList = async () => {
      try {
        console.log(location)
        const response = await axios.get(`/api/course/${enrollmentId}/assignment`, {
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요
        });
        const assignmentList = response.data.assignmentDtoList

        console.log("memberInfoDto : ", response.data.memberInfoDto)
        console.log("assignmentData : ", assignmentList)
        console.log("assignmentList response : ", response)
        const lectureName1 = response.data.courseDto.lectureName
        const division1 = response.data.courseDto.division

        setLectureName(lectureName1)
        setDivision(division1)
        setMemberInfoDto(response.data.memberInfoDto)
        setAssignments(assignmentList)
        setCourseDto(response.data.courseDto)
      }
      catch (error) {
        if (error.response.status === 401 || error.response.status === 400) {
          navigate("/")
        } else {
          // 다른 종류의 오류 발생
          console.error(error);
        }
      }
    };

    fetchAssignmentList();
  }, []);

  return (
    <div className="assignmentlist">
      <Sidebar lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} enrollmentId={enrollmentId}/>
      <main className="content-frame">
        <section className="content7">
          <AssignHeader />
          <div className="list3">
            <div className="yet">
              <AssignListHeader title="미제출 과제" />
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
              <AssignListHeader title="제출 과제" />
              <div className="done-assign">
                {assignments.map((assignment) =>
                  assignment.status === "SSUBMITTED" ? (
                    <DoneAssign
                      key={assignment.id}
                      title={assignment.title}
                      contents={assignment.contents}
                      dueDate={assignment.dueDate} />
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
