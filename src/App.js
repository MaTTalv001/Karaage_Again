import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./utils/Route";
import './App.css';
import HomePage from './pages/HomePage';
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

function App() {
  return (
    <div className="App" style={{ width: '100%', margin: 0 }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={RoutePath.signup.path} element={<SignUp />} />
        <Route path={RoutePath.login.path} element={<LogIn />} />
      </Routes>
      
      
    </div>
  );
}

export default App;
