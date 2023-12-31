import React, { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css'
import axios from "axios";
import { API_LOGIN } from '../../config.js';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); 

    const [showError, setShowError] = useState(false)

    const ValidateLogin = async () => {
        event.preventDefault();
        const data={
            "email":email,
            "password":password
        }
        axios.post(API_LOGIN, data)
        .then((result)=>{
            let res = result.data;
            navigate('/LoggedInPage', { state: { res } });
        })
        .catch((error)=>{
            setShowError(true)
            console.log("could not loggin")
        })
    }

    return (
        <div className="container-1">
            <div className="cover">
                <h1>Login</h1>
                <form onSubmit={ValidateLogin} method="POST">
                    <div>
                        <input name="E-Mail" type="text" placeholder="E-Mail" value={email} onChange={(x) => setEmail(x.target.value)} />
                        <input name="Password" type="password" placeholder="Password" value={password} onChange={(x) => setPassword(x.target.value)} />
                    </div>
                    {showError ? <p className="ErrorMessage">Password or Email is Incorrect</p> : null}
                    <button type="submit" className="login-btn">
                        <p>Login <i className="bi bi-arrow-right"></i> </p>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm;