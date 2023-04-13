import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageWithText from "./Pages/PageWithText";
import Login from "./Pages/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PageWithText" element={<PageWithText />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;


