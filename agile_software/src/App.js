import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import PageWithText from "./Pages/PageWithText";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/PageWithText" element={<PageWithText />} />
      </Routes>
    </div>
  );
}

export default App;


