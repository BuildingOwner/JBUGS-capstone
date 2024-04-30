import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// 캘린더를 감싸주는 스타일
export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`
// 캘린더를 불러옴
export const StyledCalendar = styled(Calendar)``;