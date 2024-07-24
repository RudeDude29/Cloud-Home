import { useSelector } from "react-redux";

const { useState, useEffect } = require("react");

const useGetFileFolders = ()=>{
    const {token} = useSelector((e)=> e.auth);
    const [fileFolders,setFileFolders] = useState([]);
    const getFileFolders = async (parentId = null)=>{
        try {
            const res = await fetch(`http://localhost:1100/api/v1/folder/file-folder`,{
                method:"POST",
                body:JSON.stringify({parentId}),
                headers:{
                    "content-type":"application/json",
                    authorization:"Bearer " + token
                }
            });
            const data = await res.json();
            setFileFolders(data.data.fileFolders);
        } catch (err) {
            alert(err.message);
        }
    }
    
    return {getFileFolders,fileFolders};
};

export default useGetFileFolders;