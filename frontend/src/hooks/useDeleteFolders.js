import { useSelector } from "react-redux";

const useDeleteFolder = () =>{
    const {token} = useSelector((e)=>e.auth)
    const deleteFolder = async ({
        name,
    })=>{
        try {
            const res = await fetch("http://localhost:1100/api/v1/folder/delete",{
                method:"POST",
                body:JSON.stringify({
                    name:name,
                }),
                headers:{
                 "content-type":"application/json",
                 authorization:"Bearer " + token,
                }
            });
            const data = await res.json();
            
            alert(data.message);
        } catch (err) {
            alert(err.message);
        }
        
    }
    return {deleteFolder};
};

export default useDeleteFolder;