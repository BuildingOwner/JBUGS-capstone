import CourseSidebar from "../../sidebar/CourseSidebars";
import AssignHeader from "./AssignHeader";
import AssignListItem from "./AssignListItem";
import styles from "./AssignmentList.module.css"
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoItem from "../mainPage/NoItem";
import LoadingPage from "../mainPage/LoadingPage";

const AssignmentList = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const enrollmentId = location.state.enrollmentId
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [unsubmittedAssignments, setUnsubmittedAssignments] = useState([])
  const [submittedAssignments, setSubmittedAssignments] = useState([])
  const [ongoingAssignments, setOngoingAssignments] = useState([])
  const [pastDueAssignments, setPastDueAssignments] = useState([])
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [courseDto, setCourseDto] = useState()
  const [selectedWeek, setSelectedWeek] = useState(100)

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value)
    console.log(e.target.value)
  }

  useEffect(() => {
    const fetchAssignmentList = async () => {
      try {
        console.log(location)
        const response = await axios.get(`/api/course/${enrollmentId}/assignment`, {
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요
        });
        const assignmentList = response.data.assignmentDtoList
        const lectureName1 = response.data.courseDto.lectureName
        const division1 = response.data.courseDto.division
        console.log(response)
        setLectureName(lectureName1)
        setDivision(division1)
        setMemberInfoDto(response.data.memberInfoDto)
        // setAssignments(assignmentList)
        setUnsubmittedAssignments(assignmentList.filter(assignment => assignment.status === "NOT_SUBMITTED"))
        setSubmittedAssignments(assignmentList.filter(assignment => assignment.status === "SUBMITTED"))
        setOngoingAssignments(assignmentList.filter(assignment => checkDueDate(assignment.dueDate)))
        setPastDueAssignments(assignmentList.filter(assignment => !checkDueDate(assignment.dueDate)))
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

  const checkDueDate = (dueDateString) => {
    // 현재 날짜 및 시간
    const now = new Date();

    // 마감 날짜를 나타내는 Date 객체 생성
    const dueDate = new Date(dueDateString);

    // dueDate가 now보다 미래인지 확인
    if (dueDate > now) {
      return true;
    } else {
      return false;
    }
  }

  if (!memberInfoDto) return <LoadingPage />;

  return (
    <div className={`background`}>
      <CourseSidebar lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} enrollmentId={enrollmentId} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <AssignHeader lectureName={lectureName} division={division} />
          <div className={styles.content}>
            <select
              className={`form-select form-select ${styles.select}`}
              value={selectedWeek}
              onChange={handleWeekChange}>
              <option value={100}>주차 전체 보기</option>
              {Array.from({ length: 16 }).map((_, i) => {
                return (
                  <option value={i + 1} key={`weekKey${i}`}>{i + 1} 주차</option>
                )
              })}
            </select>
            <div className={styles.listContainer}>
              <div className={styles.colName}>
                <h4 style={{ fontWeight: "bold" }}>{memberInfoDto.memberType === "PROFESSOR" ? "진행 중인 과제" : "미제출 과제"}</h4>
                <h4 className={styles.title}>제목</h4>
                <h4>주차</h4>
                <h4>기한</h4>
                <h4>성적</h4>
              </div>
              <div className={`no-scroll-bar ${styles.list}`}>
                {memberInfoDto.memberType === "STUDENT" ?
                  (unsubmittedAssignments.length != 0 ?
                    unsubmittedAssignments.filter(assign =>
                      (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                    ).length != 0 ?
                      unsubmittedAssignments.filter(assign =>
                        (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                      ).map((assignment) =>
                        <AssignListItem
                          key={assignment.id}
                          title={assignment.title}
                          contents={assignment.contents}
                          dueDate={assignment.dueDate}
                          weekId={assignment.weekNumber}
                          status={assignment.status}
                          enrollmentId={enrollmentId}
                          memberType={memberInfoDto.memberType}
                        />
                      ) : <NoItem title={"미제출 과제가"} />
                    : <NoItem title={"미제출 과제가"} />) :
                  (ongoingAssignments.length != 0 ?
                    ongoingAssignments.filter(assign =>
                      (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                    ).length != 0 ?
                      ongoingAssignments.filter(assign =>
                        (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                      ).map((assignment) =>
                        <AssignListItem
                          key={assignment.id}
                          title={assignment.title}
                          contents={assignment.contents}
                          dueDate={assignment.dueDate}
                          weekId={assignment.weekNumber}
                          status={assignment.status}
                          enrollmentId={enrollmentId}
                          memberType={memberInfoDto.memberType}
                        />
                      ) : <NoItem title={"진행 중인 과제가"} />
                    : <NoItem title={"진행 중인 과제가"} />)
                }
                {/* {unsubmittedAssignments.length != 0 ?
                  unsubmittedAssignments.filter(assign =>
                    (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                  ).length != 0 ?
                    unsubmittedAssignments.filter(assign =>
                      (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                    ).map((assignment) =>
                      <AssignListItem
                        key={assignment.id}
                        title={assignment.title}
                        contents={assignment.contents}
                        dueDate={assignment.dueDate}
                        weekId={assignment.weekNumber}
                        status={assignment.status}
                        enrollmentId={enrollmentId}
                        memberType={memberInfoDto.memberType}
                      />
                    ) : <NoItem title={"미제출 과제"} />
                  : <NoItem title={"미제출 과제"} />} */}
              </div>
            </div>
            <div className={styles.listContainer}>
              <div className={styles.colName}>
                <h4 style={{ fontWeight: "bold" }}>{memberInfoDto.memberType === "PROFESSOR" ? "마감된 과제" : "제출한 과제"}</h4>
                <h4 className={styles.title}>제목</h4>
                <h4>주차</h4>
                <h4>기한</h4>
                <h4>성적</h4>
              </div>
              <div className={`no-scroll-bar ${styles.list}`}>
              {memberInfoDto.memberType === "STUDENT" ?
                (submittedAssignments.length != 0 ?
                  submittedAssignments.filter(assign =>
                    (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                  ).length != 0 ?
                    submittedAssignments.filter(assign =>
                      (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                    ).map((assignment) =>
                      <AssignListItem
                        key={assignment.id}
                        title={assignment.title}
                        contents={assignment.contents}
                        dueDate={assignment.dueDate}
                        weekId={assignment.weekNumber}
                        status={assignment.status}
                        enrollmentId={enrollmentId}
                        memberType={memberInfoDto.memberType}
                      />
                    ) : <NoItem title={"제출한 과제가"} />
                  : <NoItem title={"제출한 과제가"} />) : 
                  (pastDueAssignments.length != 0 ?
                    pastDueAssignments.filter(assign =>
                      (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                    ).length != 0 ?
                    pastDueAssignments.filter(assign =>
                        (Number(selectedWeek) === 100 || Number(assign.weekNumber) === Number(selectedWeek)) // 주차 조건
                      ).map((assignment) =>
                        <AssignListItem
                          key={assignment.id}
                          title={assignment.title}
                          contents={assignment.contents}
                          dueDate={assignment.dueDate}
                          weekId={assignment.weekNumber}
                          status={assignment.status}
                          enrollmentId={enrollmentId}
                          memberType={memberInfoDto.memberType}
                        />
                      ) : <NoItem title={"마감된 과제가"} />
                    : <NoItem title={"마감된 과제가"} />)
                  }
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AssignmentList;
