import React, { useEffect, useState } from 'react'
import "../App.css"

const Homepage = () => {
    const [userName, setUserName] = useState('');
    const getCookieValue = (cookieName) => {
        const cookies = document.cookie.split(';').map(cookie => {
            const [name, value] = cookie.split('=').map(c => c.trim());
            if (name === cookieName) {
                return value;
            }
            return null;
        });
        return cookies.find(cookie => cookie !== null) || null;
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookieValue('token');
                console.log("token", token);

                const fetchauth = await fetch("https://login-signup-server-6vyn.onrender.com/authRoute", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json"
                    }
                });
                console.log("fetchauth----", fetchauth);

                if (fetchauth.ok) {
                    const data = await fetchauth.json();
                    console.log("fetchauth ----", data);

                    const userInfo = data.findUser
                    console.log("userInfo --", userInfo);
                    setUserName(userInfo.name);

                } else {
                    throw new Error(`HTTP error! Status: ${fetchauth.status}`);
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, []);




    return (
        <div>
            <header>
                <h1>Hello {userName} Welcome to My Website!</h1>
            </header>
            <main>
                <p>This is the homepage of my website. Here, you can find amazing content about various topics, ranging from technology to arts and culture.</p>
                <p>Feel free to explore and enjoy your stay!</p>
                <div>
                    <p> Please create your account <a href='/signup'>create account</a> or login <a href='/login'> login</a> to see our products </p>
                </div>
            </main>
        </div>
    )
}

export default Homepage



