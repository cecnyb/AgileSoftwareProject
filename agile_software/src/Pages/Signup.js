import { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../firebase";
import "../Login.css"; 
import logo from  "../VKLogo.png";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const res = await signUp(email, password);
    if (res.error) seterror(res.error)
 
  };

  return (
    <>
      <div className="login-container"> 
        <img src={logo} alt="Logo" height={"50%"} width={"30%"}></img>
        <h2>Sign Up</h2>
        {error ? <div>{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <p>
          Already registered? <Link to="/">Login</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;