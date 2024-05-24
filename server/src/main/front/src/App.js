import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import Main from "./pages/mainPage/Main";
import Course from "./pages/coursePage/Course";
import QaList from "./pages/qaPage/QaList";
import NoticeList from "./pages/noticePage/NoticeList";
import ChatbotPage from "./pages/chatBotPage/ChatbotPage";
import DoQuiz from "./pages/quizPage/doQuiz/DoQuiz";
import QuizAnswer from "./pages/quizPage/quizAnswer/QuizAnswer";
import QuizList from "./pages/quizPage/quizList/QuizList";
import FileUploadModal from "./modals/profModal/uploadModal/FileUploadModal";
import QuizInfoModal from "./modals/quizModal/QuizInfoModal";
import AssignmentModal from "./modals//assignModal/AssignmentModal";
import QaModal from "./modals/qaModal/QaModal";
import MakeQaModal from "./modals/qaModal/MakeQaModal";
import NoticeModal from "./modals/noticeModal/NoticeModal";
import MakeAssignmentModal from "./modals/profModal/profAssignModal/MakeAssignmentModal";
import AssignmentList from "./pages/assignmentPage/AssignmentList";
// import ProfEditQuizModal from "./modals/profModal/profQuizModal/ProfEditQuizModal";
// import ProfAssignmentModal from "./modals/profModal/profAssignModal/ProfAssignmentModal";
// import ProfStudentQuizInfo from "./pages/profPage/profQuizPage/info/ProfStudentQuizInfo";
// import ProfStudentAssignInfo from "./pages/profPage/profAssignPage/info/ProfStudentAssignInfo";
// import ProfStudentQuizScore from "./pages/profPage/profQuizPage/score/ProfStudentQuizScore";
// import ProfStudentAssignScore from "./pages/profPage/profAssignPage/score/ProfStudentAssignScore";

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
    let title = "한성 Eclass +";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/login":
        title = "로그인";
        metaDescription = "";
        break;
      case "/course":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/qalist":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/noticelist":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/chatbotpage":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/doquiz":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/quizanswer":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/quizlist":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/fileuploadmodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/quizinfomodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/profeditquizmodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/assignmentmodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/profassignmentmodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/qamodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/makeqamodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/noticemodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/makeassignmentmodal":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/assignmentlist":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/profstudentquizinfo":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/profstudentassigninfo":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/profstudentquizscore":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
      case "/profstudentassignscore":
        title = "한성 Eclass +";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/assignmentinfomodal" element={<AssignmentInfoModal />} /> */}
      <Route path="/" element={<Main />} />
      <Route path="/course" element={<Course />} />
      <Route path="/qalist" element={<QaList />} />
      <Route path="/noticelist" element={<NoticeList />} />
      <Route path="/chatbotpage" element={<ChatbotPage />} />
      <Route path="/doquiz" element={<DoQuiz />} />
      <Route path="/quizanswer" element={<QuizAnswer />} />
      <Route path="/quizlist" element={<QuizList />} />
      <Route path="/fileuploadmodal" element={<FileUploadModal />} />
      <Route path="/quizinfomodal" element={<QuizInfoModal />} />
      <Route path="/assignmentmodal" element={<AssignmentModal />} />
      <Route path="/qamodal" element={<QaModal />} />
      <Route path="/makeqamodal" element={<MakeQaModal />} />
      <Route path="/noticemodal" element={<NoticeModal />} />
      <Route path="/assignmentlist" element={<AssignmentList />} />
      <Route path="/makeassignmentmodal" element={<MakeAssignmentModal />} />
      {/* <Route path="/profeditquizmodal" element={<ProfEditQuizModal />} />
      <Route path="/profassignmentmodal" element={<ProfAssignmentModal />} />
      <Route path="/profstudentquizinfo" element={<ProfStudentQuizInfo />} />
      <Route
        path="/profstudentassigninfo"
        element={<ProfStudentAssignInfo />}
      />
      <Route path="/profstudentquizscore" element={<ProfStudentQuizScore />} />
      <Route
        path="/profstudentassignscore"
        element={<ProfStudentAssignScore />}
      /> */}
    </Routes>
  );
}
export default App;
