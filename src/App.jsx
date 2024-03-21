import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import InverseProtectedRoutee from './components/inverseProdectedRoute';
import Forgetpassword from './pages/forgetPassword';
import Login from './pages/login';
import Resetpassword from './pages/resetpassword';
import Signup from './pages/signup';
import Verificationcode from './pages/verificationSignup';
import Createprofile from './pages/createprofile';
import Verificationforget from './pages/verisicationForgetpassword';
import Home from './pages/Home';
import Chat from './pages/chat';
import ErrorPage from './pages/error';
import UpdateProfile from './pages/updateProfile';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<InverseProtectedRoutee><Login /></InverseProtectedRoutee>} />
        <Route path="/signup" element={<InverseProtectedRoutee><Signup /></InverseProtectedRoutee>} />
        <Route path="/forgetpassword" element={<InverseProtectedRoutee><Forgetpassword /></InverseProtectedRoutee>} />
        <Route path="/resetpassword" element={<InverseProtectedRoutee><Resetpassword /></InverseProtectedRoutee>} />
        <Route path="/verificationcode" element={<InverseProtectedRoutee><Verificationcode /></InverseProtectedRoutee>} />
        <Route path="/createprofile" element={<InverseProtectedRoutee><Createprofile /></InverseProtectedRoutee>} />
        <Route path="/verificationforget" element={<InverseProtectedRoutee><Verificationforget /></InverseProtectedRoutee>} />
        <Route path="/chat" element={<InverseProtectedRoutee><Chat /></InverseProtectedRoutee>} />
        <Route path="/updateprofile" element={<InverseProtectedRoutee><UpdateProfile/></InverseProtectedRoutee>} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
