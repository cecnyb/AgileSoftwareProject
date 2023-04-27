import { useState } from "react";
import { signIn } from "../firebase";
import "../Login.css"; 
import logo from  "../VKLogo.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const res = await signIn(email, password);
    if (res.error) seterror(res.error);
  };
  return (
    <div className="login-container">
      <img src={logo} alt="Logo" height={"50%"} width={"30%"}></img>
      <h1>Välkommen till din utbildning</h1>
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ marginTop: '1rem' }}>
            <a href="/Signup" style={{ textAlign:'left'}} className="italic-link" >
                Sign up
            </a>
            <a href="mailto:kundsupport@vkvattenskoter.com?subject=Forgot Password"  style={{ textAlign:'right'}} className="italic-link" > 
                Forgot your password?
            </a>
        </div>

        <input type="submit" value="Submit" class="login-button"
        />
      </form>
    </div>
  );
};

export default Login;