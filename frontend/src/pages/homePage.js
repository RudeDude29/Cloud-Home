import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/navbar";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useDeleteFolders from "../hooks/useDeleteFolders";
import useUploadFile from "../hooks/useUploadFile";
import "../components/navbar/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFileImage, faFileVideo } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
    const [newFolder, setNewFolder] = useState("");
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const { createFolder } = useCreateFolder();
    const [folderStructure, setFolderStructure] = useState([{ _id: null, name: "Cloud Home" }]);
    const { fileFolders, getFileFolders } = useGetFileFolders();
    const { deleteFolder } = useDeleteFolders();
    const inputRef = useRef(null);
    const parentFolder = folderStructure[folderStructure.length - 1];

    const handleDoubleClick = (elem) => {
        if (elem.type === "folder") {
            setFolderStructure([...folderStructure, elem]);
        } else {
            window.open(elem.link);
        }
    };

    const handleAllowCreateFolder = () => {
        setShowCreateFolder(true);
    };

    const handleCreateFolder = async () => {
        if (newFolder.length > 0) {
            await createFolder({ name: newFolder, parentId: parentFolder._id });
            getFileFolders(parentFolder._id);
            setShowCreateFolder(false);
        } else {
            toast.error("Enter a folder name");
        }
    };

    const handleBackClick = (clickIndx) => {
        const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIndx);
        setFolderStructure(newFolderStructure);
    };

    const handleDelete = async() =>{
        if(newFolder.length>0){
           await deleteFolder({name: newFolder , parentId:parentFolder._id});
           getFileFolders(parentFolder._id);
           setShowCreateFolder(false);
        }else {
            toast.error("Enter name of the folder");
        }
    }

    useEffect(() => {
        getFileFolders(parentFolder._id);
    }, [folderStructure]);

    const { isUploadAllowed, uploadFile } = useUploadFile();
    const handleFileUpload = async (e) => {
        if (isUploadAllowed) {
            const file = e.target.files;
            console.log(file);
            await uploadFile({
                file: file[0],
                parentId: parentFolder._id,
            });
            getFileFolders(parentFolder._id);
            toast.success("File uploaded successfully!");
        } else {
            toast.error("Uploading is already in progress. Please wait...");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="homepage-main-container">
                <h1>Home</h1>
                <button className="btn-create" onClick={handleAllowCreateFolder}>Create Folder</button>
                <input className="file-upload-input" ref={inputRef} type="file" onChange={handleFileUpload} />
                <ul>
                    {folderStructure.flatMap((elem, idx) => {
                        return <li key={idx} onClick={() => handleBackClick(idx)}>{elem.name}</li>;
                    })}
                </ul>

                {showCreateFolder && (
                    <div className="create-folder-modal">
                        <input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
                        <button onClick={handleCreateFolder}>Create</button>
                        <button onClick={() => setShowCreateFolder(false)}>Cancel</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                )}

                <div className="folder-file-container">
                    {fileFolders.map((elem) => {
                        const itemClass = elem.type === "folder" ? "folder-item" : "file-item";
                        let icon;
                        if (elem.type === "folder") {
                            icon = <FontAwesomeIcon icon={faFolder} />;
                        } else if (elem.type === "folder-item") {
                            icon = <FontAwesomeIcon icon={faFolder} />;
                        }
                        return (
                            <div
                                key={elem._id}
                                className={itemClass}
                                onDoubleClick={() => handleDoubleClick(elem)}
                            >
                                {icon}
                                <p>{elem.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
