import { useState } from "react";
import { useSelector } from "react-redux";

const useUploadFile = () => {
    const { token } = useSelector((e) => e.auth);
    const [isUploadAllowed, setIsUploadAllowed] = useState(true);

    const uploadFile = async ({ file, parentId }) => {
        try {
            setIsUploadAllowed(false);
            let formData = new FormData();
            formData.append("file", file);
            formData.append("parentId", parentId);

            const res = await fetch(`http://localhost:1100/api/v1/file`, {
                method: "POST",
                body: formData,
                headers: {
                    authorization: "Bearer " + token,
                },
            });

            console.log("---->", res);
        } catch (err) {
            alert(err);
        } finally {
            setIsUploadAllowed(true);
        }
    };

    return { uploadFile, isUploadAllowed };
};

export default useUploadFile;