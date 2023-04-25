import { useState } from "react";
import { signIn } from "../firebase";
import { useNavigate } from 'react-router-dom';
import "../Login.css"; 
import logo from  "../VKLogo.png"


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, seterror] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        const res = await signIn(email, password);
        if (res.error) {
            seterror("Felaktiga inloggningsuppgifter. Var vänlig försök igen."); // Raise error if not correct log in credentials are submitted
        } else {
            navigate('/Homepage'); // Redirect user to homepage if correct credentials are submitted
        }
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
                    placeholder="E-post"
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    style={{ marginTop: '1rem' }}
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Lösenord"
                    onChange={(e) => setPassword(e.target.value)} />
                <div style={{ marginTop: '1rem' }}>
                    <a href="/Signup" className="italic-link" style={{ marginRight: '10rem' }}>
                        Registrera dig
                    </a>
                    <a href="mailto:kundsupport@vkvattenskoter.com?subject=Forgot Password" className="italic-link">
                        Glömt ditt lösenord?
                    </a>
                </div>

                <input type="submit" value="Logga in" class="login-button" />


            </form>
        </div>
    );
}

export default Login;