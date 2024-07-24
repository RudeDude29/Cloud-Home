import { useNavigate } from "react-router-dom";
import { appLogout , emailVerified } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
const useVerify = () => {
    // const navigate = useNavigate();
    const {token} = useSelector((e)=>e.auth) 
    const dispatch = useDispatch();
    const verify = async ( otp ) => {
        
        try {
            const res = await fetch(`http://localhost:1100/api/v1/otp/verifyOtp`, {
                method: "POST",
                body: JSON.stringify({ otp }),
                headers: {
                    "content-type": "application/json",
                    authorization: "Bearer " + token,
                },
            });
            const data = await res.json();
            
            if (data.status === "success") {
                dispatch(emailVerified());
            }
            else if(data.message==="Unauthorized"){
                dispatch(appLogout());
            }
            else {
                alert(data.message);
            }
        } catch (err) {
            alert("verification error: " + err.message);
        }
    };
    return { verify };
};

export default useVerify;