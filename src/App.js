import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { About } from './pages/About';
import { AdminList } from './pages/Internship/List/AdminList';
import { ProviderList } from './pages/Internship/List/ProviderList';
import { UserList } from './pages/Internship/List/UserList';
import { ContactUs } from './pages/Comm/ContactUs';
import { AdminContact } from './pages/Comm/AdminContact';
import { AdminFeedback } from './pages/Comm/AdminFeedback';
import { Feedback } from './pages/Comm/Feedback';
import UserReg from './pages/Auth/Registration/UserReg';
import { AdminLogin } from './pages/Auth/Login/AdminLogin';
import { Home } from './pages/Home';
import { UserLogin } from './pages/Auth/Login/UserLogin';
import Header from './components/Header';
import { useState } from 'react';
import Alert from './components/Alert';
import { ProviderReg } from './pages/Auth/Registration/ProviderReg';
import { ProviderLogin } from './pages/Auth/Login/ProviderLogin';
import { AddInternship } from './pages/Internship/AddInternship';
import { EditInternship } from './pages/Internship/EditInternship';
import { Profile } from './pages/Profile/Profile';
import { Front } from './pages/Front';
import { Internship } from './pages/Internship/Internship';
import { Apply } from './pages/Internship/Apply';
import { Applicants } from './pages/Internship/List/Applicants';
import { Stats } from './pages/Visualization/Stats';
import { Forgot } from './pages/Auth/Forgot/Forgot';
import { Reset } from './pages/Auth/Forgot/Reset';
import { EditUser } from './pages/Profile/EditUser';
import { EditProvider } from './pages/Profile/EditProvider';

function NavbarWrapper() {
  let location = useLocation();
  if (
    location.pathname === "/user/login" ||
    location.pathname === "/user/register" ||
    location.pathname === "/AdminLogin" ||
    location.pathname === "/provider/login" ||
    location.pathname === "/Front" ||
    location.pathname.startsWith("/reset/") ||
    location.pathname === "/forgot" ||
    location.pathname === "/provider/register"
  ) {
    return <Header/>;
  }
  return <Navbar />;
}

function App() {
  
  const [alert, setAlert] = useState(null)
  const showAlert = (message,type) => {
    setAlert({msg:message,
      type:type})
      setTimeout(() => {
        setAlert(null);
      }, 1500);
  }
  return (
    <Router>
      <NavbarWrapper />
      <Alert alert={alert}/>
      <Routes>
        <Route exact path="/user/List" element={<UserList showAlert={showAlert}/>} />
        <Route exact path="/forgot" element={<Forgot showAlert={showAlert}/>} />
        <Route exact path="/EditUser" element={<EditUser showAlert={showAlert}/>} />
        <Route exact path="/EditProvider" element={<EditProvider showAlert={showAlert}/>} />
        <Route exact path="/reset/*" element={<Reset showAlert={showAlert}/>} />
        <Route exact path="/provider/List" element={<ProviderList showAlert={showAlert}/>} />
        <Route exact path="/List" element={<AdminList showAlert={showAlert}/>} />
        <Route exact path="/Internship" element={<Internship />} />
        <Route exact path="/Apply" element={<Apply showAlert={showAlert}/>} />
        <Route exact path="/Stats" element={<Stats/>} />
        <Route exact path="/Applicants" element={<Applicants showAlert={showAlert}/>} />
        <Route exact path="/AddInternship" element={<AddInternship showAlert={showAlert}/>} />
        <Route exact path="/EditInternship" element={<EditInternship showAlert={showAlert}/>} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Profile" element={<Profile />} />
        <Route exact path="/Contact" element={<ContactUs  showAlert={showAlert}/>} />
        <Route exact path="/AdminContact" element={<AdminContact  showAlert={showAlert}/>} />
        <Route exact path="/AdminFeedback" element={<AdminFeedback  showAlert={showAlert}/>} />
        <Route exact path="/Feedback" element={<Feedback  showAlert={showAlert}/>} />
        <Route exact path="/user/register" element={<UserReg  showAlert={showAlert}/>} />
        <Route exact path="/user/login" element={<UserLogin  showAlert={showAlert}/>} />
        <Route exact path="/provider/register" element={<ProviderReg  showAlert={showAlert}/>} />
        <Route exact path="/provider/login" element={<ProviderLogin showAlert={showAlert}/>} />
        <Route exact path="/AdminLogin" element={<AdminLogin  showAlert={showAlert}/>} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Front" element={<Front />} />
      </Routes>
    </Router>
  );
}

export default App;