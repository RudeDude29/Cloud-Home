const express = require("express");

const {createFolder,getFileFolders,deleteFolder} = require("../controller/folderControllers.js");


const folderRouter = express.Router();

folderRouter.post("/create",createFolder);
folderRouter.post("/file-folder",getFileFolders);
folderRouter.post("/delete",deleteFolder);

module.exports = folderRouter;