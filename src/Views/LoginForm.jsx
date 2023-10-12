import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css'

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useNavigate(); 

    const ValidateLogin = async () => {
        console.log("Email:", email);
        console.log("Password:", password);
        history('/loggedIn');
    }

    return (
        <div className="cover">
            <h1>Login</h1>
            <div>
                <input type="text" placeholder="email" value={email} onChange={(x) => setEmail(x.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(x) => setPassword(x.target.value)} />
            </div>
            <button className="login-btn" onClick={ValidateLogin}>
                <p>Login</p>
                <i className="bi bi-arrow-right"></i>
            </button>
        </div>
    )
}

export default LoginForm;