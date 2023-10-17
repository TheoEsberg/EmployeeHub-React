import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css'

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const ValidateLogin = async () => {
        console.log("Email:", email);
        console.log("Password:", password);
        navigate('/loggedIn', { state: { email, password } });
    }

    return (
        <div className="cover">
            <h1>Login</h1>
            <div>
                <input type="text" placeholder="E-Mail" value={email} onChange={(x) => setEmail(x.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(x) => setPassword(x.target.value)} />
            </div>
            <button className="login-btn" onClick={ValidateLogin}>
                <p>Login <i className="bi bi-arrow-right"></i> </p>
            </button>
        </div>
    )
}

export default LoginForm;