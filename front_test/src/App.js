import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import NoticeList from "./pages/NoticeList";
import QaList from "./pages/QaList";
import QuizList from "./pages/QuizList";
import Course from "./pages/Course";
import QuizAnswer from "./pages/QuizAnswer";
import AssignmentList from "./pages/AssignmentList";
import DoQuiz from "./pages/DoQuiz";
import MainMono from "./pages/MainMono";
import ProfStudentAssignScore from "./pages/ProfStudentAssignScore";
import ProfStudentQuizScore from "./pages/ProfStudentQuizScore";
import LoginPage from "./pages/LoginPage";
import ProfStudentQuizInfo from "./pages/ProfStudentQuizInfo";
import ProfStudentAssignInfo from "./pages/ProfStudentAssignInfo";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/qalist":
        title = "";
        metaDescription = "";
        break;
      case "/quizlist":
        title = "";
        metaDescription = "";
        break;
      case "/course":
        title = "";
        metaDescription = "";
        break;
      case "/quizanswer":
        title = "";
        metaDescription = "";
        break;
      case "/assignmentlist":
        title = "";
        metaDescription = "";
        break;
      case "/doquiz":
        title = "";
        metaDescription = "";
        break;
      case "/noticelist1":
        title = "";
        metaDescription = "";
        break;
      case "/qalist1":
        title = "";
        metaDescription = "";
        break;
      case "/course1":
        title = "";
        metaDescription = "";
        break;
      case "/main-mono":
        title = "";
        metaDescription = "";
        break;
      case "/profstudentassignscore":
        title = "";
        metaDescription = "";
        break;
      case "/profstudentquizscore":
        title = "";
        metaDescription = "";
        break;
      case "/login-page":
        title = "";
        metaDescription = "";
        break;
      case "/profstudentquizinfo":
        title = "";
        metaDescription = "";
        break;
      case "/profstudentassigninfo":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]',
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<NoticeList />} />
      <Route path="/qalist" element={<QaList />} />
      <Route path="/quizlist" element={<QuizList />} />
      <Route path="/course" element={<Course />} />
      <Route path="/quizanswer" element={<QuizAnswer />} />
      <Route path="/assignmentlist" element={<AssignmentList />} />
      <Route path="/doquiz" element={<DoQuiz />} />
      <Route path="/noticelist1" element={<NoticeList />} />
      <Route path="/qalist1" element={<QaList />} />
      <Route path="/course1" element={<Course />} />
      <Route path="/main-mono" element={<MainMono />} />
      <Route
        path="/profstudentassignscore"
        element={<ProfStudentAssignScore />}
      />
      <Route path="/profstudentquizscore" element={<ProfStudentQuizScore />} />
      <Route path="/login-page" element={<LoginPage />} />
      <Route path="/profstudentquizinfo" element={<ProfStudentQuizInfo />} />
      <Route
        path="/profstudentassigninfo"
        element={<ProfStudentAssignInfo />}
      />
    </Routes>
  );
}
export default App;
