import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChapterContent from "./Pages/ChapterContent";
import Login from "./Pages/Login";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chapters/:chapterId" element={<ChapterContent />}/>
        <Route path="/HomePage" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;


