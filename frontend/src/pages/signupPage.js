import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignupPage = () => {
    const navigate = useNavigate();

    const toLogin = () => {
        navigate("/login");
    };

    const containerStyles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        margin: "auto",
        padding: "40px", 
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        textAlign: "center"
    };

    const inputStyles = {
        width: "100%",
        padding: "12px", 
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        marginBottom: "16px", 
    };

    const buttonStyles = {
        padding: "12px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        width: "100%", 
        marginBottom: "16px", 
    };

    const loginStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px", 
    };

    const linkStyles = {
        cursor: "pointer",
        color: "#007bff",
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signup } = useSignup();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            signup({ email, password });
        } else {
            toast.error("Validation Failed");
        }
    };

    return (
        <div className="signup-body" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", }}>
            <div style={containerStyles}>
                <h2>Sign Up to Cloud-Home</h2>
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
                <button onClick={handleSubmit} className="btn-signup" style={buttonStyles}>
                    Sign Up
                </button>
                <div style={loginStyles}>
                    <span>Already have an account?</span>
                    <span className="signup-span" style={linkStyles} onClick={toLogin}>Login</span>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
