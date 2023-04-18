import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Subchapter from "./Pages/Subchapter";
import Login from "./Pages/Login";
import Chapter from "./Pages/Chapter";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/chapters/:chapterId" element={<Chapter/>}/>
        <Route path="/chapters/:chapterId/subchapters/:subchapterId" element={<Subchapter/>}/>

      </Routes>
    </div>
  );
}

export default App;


