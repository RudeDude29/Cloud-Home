import { useState } from "react";
import useSignup from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

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
        padding: "40px", // Increased padding for better spacing
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        background: "#fff",
        textAlign: "center" // Centered text alignment
    };

    const inputStyles = {
        width: "100%",
        padding: "12px", // Increased padding for better touch targets
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
        marginBottom: "16px", // Added margin bottom for spacing
    };

    const buttonStyles = {
        padding: "12px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "1rem",
        width: "100%", // Full-width button
        marginBottom: "16px", // Added margin bottom for spacing
    };

    const loginStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px", // Small gap between text and link
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
            alert("Validation Failed");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
            <div style={containerStyles}>
                <h2>Sign Up to Cloud-Home</h2> {/* Added header for context */}
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
                    <span style={linkStyles} onClick={toLogin}>Login</span>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
