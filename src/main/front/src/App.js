import { Routes, Route } from 'react-router-dom';
import Main from './components/MainPage/Main';
import Login from './components/LoginPage/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
};

export default App;
