import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useDeleteFolders from "../hooks/useDeleteFolders.js";

const HomePage = () => {

    const [newFolder,setNewFolder] = useState(null);
    const [showCreateFolder,setShowCreateFolder] = useState(false);
    const {createFolder} = useCreateFolder();
    const [folderStructure,setFolderStructure] = useState([{_id:null,name:"Cloud Home"}]);
    const {fileFolders,getFileFolders} = useGetFileFolders();
    const {deleteFolder} = useDeleteFolders();
    const inputRef = useRef(null);
    
    const parentFolder = folderStructure[folderStructure.length-1];

    const handleDoubleClick = (elem)=>{
        setFolderStructure([...folderStructure,elem]);
    }

    const handleAllowCreateFolder = ()=>{
        setShowCreateFolder(true);
    }

    const handleCreateFolder = async ()=>{
        if(newFolder.length>0){
            await createFolder({name:newFolder,parentId:parentFolder._id});
            getFileFolders(parentFolder._id);
            setShowCreateFolder(false);
        }
        else{
            alert("Enter name")
        }
    }
    
    const handleDelete = async ()=>{
        if(newFolder.length>0){
            await deleteFolder({name:newFolder});
            getFileFolders();
            setShowCreateFolder(false);
        }
        else{
            alert("Enter Name")
        }
    }

    const handleBackClick = (clickIndx)=>{
           const newFolderStructure = folderStructure.filter((elem,idx)=> idx<=clickIndx);
           setFolderStructure(newFolderStructure);
    }

    const handleFileUpload = ()=>{
        
    }

    useEffect(()=>{
        getFileFolders(parentFolder._id);
     },[folderStructure])

    return (
        <div>
            <Navbar />
            <h1>Home</h1>
            <div className="homepage-main-container">
                <h4>Welcome to Cloud Home</h4>
                <input className="file-upload-input" ref={inputRef} type="file" onChange={handleFileUpload} />
                <button onClick={handleAllowCreateFolder}>Create Folder</button>
                <button >Upload File</button>
                <ul>
                {folderStructure.flatMap((elem,idx)=>{
                    return <li onClick={()=>handleBackClick(idx)}>{elem.name}</li>
                })}
                </ul>
                
                <div>
                    {showCreateFolder && <div><input value={newFolder} onChange={(e)=>setNewFolder(e.target.value)} />
                    <button onClick={handleCreateFolder}>Create</button>
                    <button onClick={() => setShowCreateFolder(false)}>Cancel</button>
                    <button onClick={handleDelete}>Delete</button>
                    </div>}
                </div>
            </div>
            <div>
                    {fileFolders.map((elem) => {
                        return (
                            <div 
                            style={
                                {
                                    backgroundColor: "yellow",
                                    border: "1px solid grey",
                                    borderRadius: "8px",
                                    width: "fit-content",
                                    padding: "8px 16px",
                                    margin: "8px 16px",
                                }
                            } onDoubleClick={()=>handleDoubleClick(elem)}>
                                <p>{elem.name}</p>
                            </div>
                        );
                    })}
                </div>
        </div>
    );
};

export default HomePage;
