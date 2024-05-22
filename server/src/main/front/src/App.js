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
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/assignmentinfomodal":
        title = "";
        metaDescription = "";
        break;
      case "/main-mono":
        title = "";
        metaDescription = "";
        break;
      case "/course":
        title = "";
        metaDescription = "";
        break;
      case "/qalist":
        title = "";
        metaDescription = "";
        break;
      case "/noticelist":
        title = "";
        metaDescription = "";
        break;
      case "/chatbotpage":
        title = "";
        metaDescription = "";
        break;
      case "/doquiz":
        title = "";
        metaDescription = "";
        break;
      case "/quizanswer":
        title = "";
        metaDescription = "";
        break;
      case "/quizlist":
        title = "";
        metaDescription = "";
        break;
      case "/fileuploadmodal":
        title = "";
        metaDescription = "";
        break;
      case "/quizinfomodal":
        title = "";
        metaDescription = "";
        break;
      case "/profeditquizmodal":
        title = "";
        metaDescription = "";
        break;
      case "/assignmentmodal":
        title = "";
        metaDescription = "";
        break;
      case "/profassignmentmodal":
        title = "";
        metaDescription = "";
        break;
      case "/qamodal":
        title = "";
        metaDescription = "";
        break;
      case "/makeqamodal":
        title = "";
        metaDescription = "";
        break;
      case "/noticemodal":
        title = "";
        metaDescription = "";
        break;
      case "/makeassignmentmodal":
        title = "";
        metaDescription = "";
        break;
      case "/assignmentlist":
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
      case "/profstudentquizscore":
        title = "";
        metaDescription = "";
        break;
      case "/profstudentassignscore":
        title = "";
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
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/assignmentinfomodal" element={<AssignmentInfoModal />} /> */}
      <Route path="/main" element={<Main />} />
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
