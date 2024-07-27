import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useCreateFolder = () =>{
    const {token} = useSelector((e)=>e.auth)
    const createFolder = async ({
        name,
        parentId,
    })=>{
        try {
            const res = await fetch("https://cloud-home-cqhy.onrender.com/api/v1/folder/create",{
                method:"POST",
                body:JSON.stringify({
                    name:name,
                    parentId,
                }),
                headers:{
                 "content-type":"application/json",
                 authorization:"Bearer " + token,
                }
            });
            const data = await res.json();
            if(data.message==="Folder name already exists"){
               toast.error(data.message);
            }
            if(data.message==="Folder created"){
                toast.success("Folder created successfully!");
            }
        } catch (err) {
            toast.error(err.message);
        }
        
    }
    return {createFolder};
};

export default useCreateFolder;