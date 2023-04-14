import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageWithText from "./Pages/PageWithText";
import Login from "./Pages/Login";

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


