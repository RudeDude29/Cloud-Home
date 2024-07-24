const fileModel = require("../model/fileSchema.js")

const createFolder = async (req,res)=>{
   const {name,parentId} = req.body;
   const {_id} = req.user;

   try {
    const isFileNameExists = await fileModel.findOne({
        name,
        userId:_id,
        parentId,
       });
       if(isFileNameExists){
        res.status(400);
        res.json({status:"fail",message:"Folder name already exists"});
        return;
       }
       
       const newFolder = await fileModel.create({
        name,
        userId:_id,
        type:"folder",
        parentId,
       });
       res.status(201);
        res.json({ status: "success", message: "Folder created" });    
   } catch (err) {
    console.error("--------------------");
        console.log(err);
        console.error("--------------------");
        res.status(500).json({ status: "fail", message: "Internal Server Error" });
   }

   

};

const getFileFolders = async (req,res)=>{
    
    const{parentId} = req.body;
    const {_id} = req.user;

    try {
        const fileFolders = await fileModel.find({userId:_id,parentId});
    res.status(200);
    res.json({
        status:"success",
        data:{
            fileFolders
        },
    })
    } catch (err) { 
        console.log(err);
        res.status(500).json({
            status:"fail",
            message:"Internal Server Error",
        })
    }
    
}

const deleteFolder = async (req,res)=>{
    const {name} = req.body;
     const {_id} = req.user;
     try {
        await fileModel.findOneAndDelete({name,userId:_id});
        res.status(200);
        res.json({
            status:"success",
            message:"Deleted",
        })
     } catch (error) {
        console.log(error);
        res.status(500).json({
            status:"fail",
            message:"Internal Server Error"
        })
     }
}

module.exports = {
    createFolder,
    getFileFolders,
    deleteFolder,
}