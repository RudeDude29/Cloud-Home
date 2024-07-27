import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const useDeleteFolder = () =>{
    const {token} = useSelector((e)=>e.auth)
    const deleteFolder = async ({
        name,
        parentId,
    })=>{
        try {
            const res = await fetch("https://cloud-home-cqhy.onrender.com/api/v1/folder/delete",{
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
            if(data.message==="File not exists"){
                toast.error(data.message);
            }
            if(data.message==="success"){
                toast.success(data.message)
            }
        } catch (err) {
            toast.error(err.message);
        }
        
    }
    return {deleteFolder};
};

export default useDeleteFolder;