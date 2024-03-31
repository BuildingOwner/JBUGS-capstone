import { Routes, Route } from 'react-router-dom';
// import Main from './components/MainPage/Main';
import LoginPage from './components/login/LoginPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/main" element={<Main />} /> */}
    </Routes>
  );
};

export default App;


