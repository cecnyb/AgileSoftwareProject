import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageWithText from "./Pages/PageWithText";
import Login from "./Pages/Signin";
import Signup from './Pages/Signup';
import Profile from "./Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/PageWithText" element={<PageWithText />} />
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;


