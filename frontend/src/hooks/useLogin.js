import { useDispatch } from "react-redux";
import { appLogin } from "../store/slices/authSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useLogin = () => {
    const dispatch = useDispatch();

    const login = async ({ email, password }) => {
        try {
            const res = await fetch(`http://localhost:1100/api/v1/auth/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "content-type": "application/json",
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.status === "success") {
                dispatch(appLogin(data));
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Login error: " + err.message);
        }
    };
    return { login };
};

export default useLogin;
