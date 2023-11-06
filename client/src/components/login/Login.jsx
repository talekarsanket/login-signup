import React, { useState } from 'react'
import "./login.css";
import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';


const Login = () => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const loginButton = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            let fetchData = await fetch("https://login-signup-server-6vyn.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            console.log("fetchdatalogin----", fetchData);

            let response = await fetchData.json();
            console.log("responselogin---", response.token);

            if (fetchData.status == "200") {
                document.cookie = `token=${response.token}; path=/`;
            };

            if (fetchData.status == "500") {
                return alert("Please Check your Password or Email");
            };


            setemail("");
            setPassword("");

            setTimeout(() => {
                navigate("/")
            }, 2000)

        } catch (error) {
            console.log("error in login", error);
            setLoading(false);

        }
    }
    return (
        <div>
            <div className="body">
                {loading ? <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true} />
                    :
                    <div className="form-container">
                        <h2 className="form-title">Login</h2>
                        <form id="login-form" onSubmit={loginButton} method='POST'>
                            <input type="text" id="login-email" placeholder="email" required onChange={(e) => setemail(e.target.value)} value={email} />
                            <div className="password-container">
                                <input type="password" id="login-password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                                <i className="fas fa-eye password-icon" id="password-toggle"></i>
                            </div>
                            <button id="login-button">Login</button>
                        </form>
                        <p>Don't have an account? <a href="/signup">Register here</a></p>
                        <p id="message" className="message"></p>
                    </div>}
            </div>
        </div>
    )
}



export default Login
