import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
    const Navigate = useNavigate();
    const toLogin = ()=>{
        Navigate("/signup")
    }
    const loginPageStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        margin: "auto",
        padding: "40px",
        maxWidth: "400px", // Added for better readability
        border: "1px solid #ccc", // Added border for visual separation
        borderRadius: "8px", // Added border radius for better aesthetics
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Added box shadow for depth
        background:"#fff",
        textAlign: "center"
    };
    const inputStyles = {
        width: "100%",
        padding: "12px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        marginBottom: "16px"
    };
    const buttonStyles = {
        padding: "8px 16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
        transition: "background-color 0.3s ease",
        width: "100%", // Full-width button
        marginBottom: "16px", // Added margin bottom for spacing
    };

    const SignupStyles = {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        gap: "4px",
    }

    const linkStyles = {
        cursor:"pointer",
        color:"blue",

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            login({ email, password });
        } else {
            alert("Validation Failed");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" , background: "#f0f2f5" }}>
        <div style={loginPageStyles}>
        <h2>Login to Cloud-Home</h2>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyles}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyles}
                placeholder="Password"
            />
            <button onClick={handleSubmit} style={buttonStyles}>
                Login
            </button>
            <p style={SignupStyles}>New member? <p style={linkStyles} onClick={toLogin}>Sign Up</p></p>
        </div>
        </div>
    );
};

export default LoginPage;
