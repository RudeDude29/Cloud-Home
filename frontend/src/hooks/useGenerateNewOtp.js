import { useSelector } from "react-redux";

const useGenerateNewOtp = () => {
    const { token } = useSelector((e) => e.auth);

    const generateNewOtp = async () => {
        try {
            const res = await fetch(`http://localhost:1100/api/v1/otp/generate-otp`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (data.status === "success") {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return { generateNewOtp };
};

export default useGenerateNewOtp;
