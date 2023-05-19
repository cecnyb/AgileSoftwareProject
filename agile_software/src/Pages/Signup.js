import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../firebase";
import "../Login.css"; 


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [moderatorID, setmoderatorID] = useState("");
    const [isUtbildare, setIsUtbildare] = useState("");
    const [error, seterror] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setEmail("");
      setPassword("");
      setUsername("");
      setmoderatorID("");
      setIsUtbildare("");
      const res = await signUp(email, password, username, moderatorID, isUtbildare);
      if (res.error) seterror(res.error)
   
    };
  
    return (
      <>
        <div className="login-container"> 
          <h2>Registera dig och starta din utbildning nu!</h2>
          {error ? <div>{error}</div> : null}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="E-post"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Lösenord"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          <input
              type="text"
              name="username"
              value={username}
              placeholder="Ditt namn"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          <input
              type="text"
              name="moderatorID"
              value={moderatorID}
              placeholder="Skriv in den ID kod du fått"
              required
              onChange={(e) => setmoderatorID(e.target.value)}
            />
            <button type="submit">Registrera dig</button>
          </form>
          <p>
            Redan registerad? <Link to="/">Logga in</Link>
          </p>
        </div>
      </>
    );
  };
  
  export default Signup;