import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { appLogout } from "../store/slices/authSlice";
const { useState, useEffect } = require("react");

const useGetFileFolders = ()=>{
    const {token} = useSelector((e)=> e.auth);
    const [fileFolders,setFileFolders] = useState([]);
    const dispatch = useDispatch();
    const getFileFolders = async (parentId = null)=>{
        try {
            const res = await fetch(`https://cloud-home-cqhy.onrender.com/api/v1/folder/file-folder`,{
                method:"POST",
                body:JSON.stringify({parentId}),
                headers:{
                    "content-type":"application/json",
                    authorization:"Bearer " + token
                }
            });
            const data = await res.json();
            if(data.message==="Token expired"){
               dispatch(appLogout());
               toast.error("Token expired")
            }
            setFileFolders(data.data.fileFolders);
        } catch (err) {
            toast.error(err.message);
        }
    }
    
    return {getFileFolders,fileFolders};
};

export default useGetFileFolders;