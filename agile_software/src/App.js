<<<<<<< Updated upstream
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Signin";
import Signup from './Pages/Signup';
import Profile from "./Profile";
import Subchapter from "./Pages/Subchapter";
import Chapter from "./Pages/Chapter";
import DatabaseAccess from "./Pages/DatabaseAccess";
=======
import logo from './logo.svg';
import './App.css';
import Homepage from "./Pages/HomePage";
import PageWithText from "./Pages/PageWithText";

>>>>>>> Stashed changes

function App() {
  return (
    <div className="App">
<<<<<<< Updated upstream
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/chapter/:chapterId" element={<Chapter/>}/>
        <Route path="/chapter/:chapterId/subchapter/:subchapterId" element={<Subchapter/>}/>
        <Route path="/DatabaseAccess" element={<DatabaseAccess />} />
      </Routes>
    </div>
=======
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    <div className="App-content">
    <Homepage />
    </div> 
  </div>
>>>>>>> Stashed changes
  );
}

export default App;


