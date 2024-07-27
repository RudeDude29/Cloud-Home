import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useGenerateNewOtp = () => {
    const { token } = useSelector((e) => e.auth);

    const generateNewOtp = async () => {
        try {
            const res = await fetch(`https://cloud-home-cqhy.onrender.com/otp/api/v1/otp/generate-otp`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (data.status === "success") {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Error: " + err.message);
        }
    };

    return { generateNewOtp };
};

export default useGenerateNewOtp;
