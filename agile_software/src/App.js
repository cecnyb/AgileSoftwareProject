import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Signin";
import Signup from './Pages/Signup';
import Profile from "./Profile";
import Subchapter from "./Pages/Subchapter";
import Chapter from "./Pages/Chapter";
import DatabaseAccess from "./Pages/DatabaseAccess";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/chapter/:chapterId" element={<Chapter/>}/>
        <Route path="/chapter/:chapterId/subchapter/:subchapterId" element={<Subchapter/>}/>
        <Route path="/DatabaseAccess" element={<DatabaseAccess />} />
      </Routes>
    </div>

  );
}

export default App;


