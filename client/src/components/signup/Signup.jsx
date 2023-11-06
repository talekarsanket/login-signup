import React, { useState } from 'react';
import './signup.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Audio, FallingLines, RotatingLines } from 'react-loader-spinner'

const Signup = () => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const fetchData = await fetch('https://login-signup-server-6vyn.onrender.com/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    userName: userName,
                    email: email,
                    password: password
                })
            });

            if (fetchData.ok) {
                const response = await fetchData.json();
                console.log('User registered:', response);

                alert("signup successfully")
                setName('');
                setUserName('');
                setEmail('');
                setPassword('');
            } else {
                console.log('Registration failed.');
                setLoading(false)
            }

            setTimeout(() => {
                navigate("/login")
            }, 2000)

        } catch (error) {
            console.error('Error:', error);
            setLoading(false)
        }
    };

    return (
        <>
            <div className="body">
                {loading ? <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true} />
                    : <div className="wrapper">
                        <form onSubmit={submitForm}>
                            <h1>Sign up</h1>
                            <div className="input">
                                <input type="text" placeholder="Full Name" required onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Username" required onChange={(e) => setUserName(e.target.value)} value={userName} />
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                            <div className="input">
                                <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                            <button type="submit" className="btn">Sign up</button>
                            <p> Already have an account?
                                <NavLink href="/login">Login</NavLink>
                            </p>
                        </form>
                    </div>}

            </div>
        </>
    );
};

export default Signup;
