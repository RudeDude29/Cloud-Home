import { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import useGenerateNewOtp from "../hooks/useGenerateNewOtp";
import useVerify from "../hooks/useVerify";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpPage = () => {
    const { email } = useSelector((e) => e.auth);
    const [otp, setOtp] = useState(['', '', '', '']);
    const { generateNewOtp } = useGenerateNewOtp();
    const { verify } = useVerify();
    const inputRefs = useRef([]);

    const handleInputChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to the next input box if value is entered
        if (value.length === 1 && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move to the previous input box if Backspace is pressed
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = () => {
        const otpString = otp.join('');
        if (otpString.length < 4) {
            toast.error("Invalid OTP");
        } else {
            const num = parseInt(otpString);
            if (num >= 1000 && num <= 9999) {
                verify(otpString);
            } else {
                toast.error("Invalid OTP. OTP must be Number");
            }
        }
    };

    useEffect(() => {
        generateNewOtp();
    }, []);

    return (
        <div className="otp-body">
            <Navbar />
            <div className="otp-page-container">
                <p className="otp-p">Email: {email}</p>
                <div className="otp-input-container">
                    {otp.map((digit, index) => (
                        <input className="input-otp"
                            key={index}
                            maxLength={1}
                            type="text"
                            value={digit}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <button onClick={handleSubmit}>Verify</button>
            </div>
            </div>
    );
};

export default OtpPage;
