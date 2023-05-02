import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../firebase";
import "../Login.css"; 
import logo from  "../VKLogo.png";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUtbildare, setIsUtbildare] = useState("");
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setIsUtbildare("");
    const res = await signUp(email, password, isUtbildare);
    if (res.error) seterror(res.error)
 
  };

  return (
    <>
      <div className="login-container"> 
        <img src={logo} alt="Logo" height={"50%"} width={"30%"}></img>
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
        <label>
          Utbildare:
          <input
            name="isUtbildare"
            type="checkbox"
            checked={isUtbildare} //Funkar ej att unchecka checkboxen
            onChange={(e) => setIsUtbildare(e.target.value)}
          />
        </label>
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