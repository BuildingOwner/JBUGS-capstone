import CourseSidebar from "../../sidebar/CourseSidebars";
import AssignHeader from "./AssignHeader";
import AssignListItem from "./AssignListItem";
import styles from "./AssignmentList.module.css"
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
    <div className={`background`}>
      <CourseSidebar lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} enrollmentId={enrollmentId} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <AssignHeader />
          <div className={styles.content}>
            <select
              className={`form-select form-select ${styles.select}`} defaultValue={100}>
              <option value={100}>주차 전체 보기</option>
              {Array.from({ length: 16 }).map((_, i) => {
                return (
                  <option value={i + 1} key={`weekKey${i}`}>{i + 1} 주차</option>
                )
              })}
            </select>
            <div className={styles.listContainer}>
              <div className={styles.colName}>
                <h4 style={{ fontWeight: "bold" }}>미제출 과제</h4>
                <h4 className={styles.title}>제목</h4>
                <h4>주차</h4>
                <h4>기한</h4>
                <h4>성적</h4>
              </div>
              <div className={styles.list}>
                {assignments.map((assignment) =>
                  assignment.status === "NOT_SUBMITTED" ? (
                    <AssignListItem
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
            <div className={styles.listContainer}>
              <div className={styles.colName}>
                <h4 style={{ fontWeight: "bold" }}>제출한 과제</h4>
                <h4 className={styles.title}>제목</h4>
                <h4>주차</h4>
                <h4>기한</h4>
                <h4>성적</h4>
              </div>
              <div className={styles.list}>
                {assignments.map((assignment) =>
                  assignment.status === "SUBMITTED" ? (
                    <AssignListItem
                      key={assignment.id}
                      title={assignment.title}
                      contents={assignment.contents}
                      dueDate={assignment.dueDate}
                      weekId={assignment.weekNumber}
                      status={assignment.status} />
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
