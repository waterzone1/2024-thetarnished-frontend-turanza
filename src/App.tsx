import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../src/pages/login'
import TeacherHome from './pages/teacher-home'
import StudentHome from './pages/student-home'
import ManageSchedule from './pages/manage-schedule';
import ManageClasses from './pages/manage-classes';
import Profile from './pages/profile';
import Settings from './pages/settings';
import MyClasses from './pages/my-classes';
import ClassBrowser from './pages/class-browser';
import ForgotPassword from './pages/forgot-password';
import Register from './pages/register';
import ChangePassword from './pages/change-password';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher-home" element={<TeacherHome />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/manage-schedule" element={<ManageSchedule />} />
        <Route path="/manage-classes" element={<ManageClasses />} />
        <Route path="/my-classes" element={<MyClasses />} />
        <Route path="/browse-available-classes" element={<ClassBrowser />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </Router>
  );
};

export default App;