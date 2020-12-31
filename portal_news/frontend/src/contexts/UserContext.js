import React, { createContext, useState, useEffect } from "react";


const UserContext = createContext();


export const UserProvider = (props) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [user, setUser] = useState();
    const [isLog, setIsLog] = useState(false);
    const [isStaff, setIsStaff] = useState(false)

    useEffect(() => (token != null || token != undefined)?refreshToken():null, []); // ? Reload user data if has token

    const refreshToken = () => fetch(`/api/token-auth/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token })
    }).then(r => {
        if (r.ok) return r.json();
        throw new Error("Token expired")
    }).then(data => {
        console.log("Refresh token", data);
        handleTokenData(data);

    }, error => console.log("Error", error))
    const loginHandler = (username, password) => fetch(`/api/token-auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then(r => r.json()).then(data => {
        console.log("Login handler", data);
        handleTokenData(data)
    })
    const logoutHandler = () => {
        setUser(old => null);
        setIsLog(old => false);
        setToken(old=>null)
        setIsStaff(old=>false)
        localStorage.removeItem("token");
    }

    const handleTokenData = (data) =>{
        setToken(old => data.token);
        setUser(old => data.user);
        setIsLog(old => true);
        setIsStaff(old=>data.user.is_staff);
        localStorage.setItem("token", data.token);
    };

    return (
        <UserContext.Provider value={{ user, loginHandler, logoutHandler, isLog, token }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContext;