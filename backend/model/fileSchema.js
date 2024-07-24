const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { ObjectId } = mongoose.Schema.Types;

const fileSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "Users",
    },
    sharedWith: [{
        type: ObjectId,
        ref: "Users",
    }],
    type:{
        type:String,
        required:true,
    },
    link: String,
    parentId:{
        type:ObjectId,
        ref:"FileFolder",
    },
    children:{
        type:ObjectId,
        ref:"FileFolder",
    },

},{
    timestamps:true,
})


const fileModel = mongoose.model("FileFolder", fileSchema);

module.exports = fileModel;
