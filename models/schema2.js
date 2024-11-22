const { register } = require("module");
const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    Gender: String,
    mobileNumber: String,
    jobRole: String,
})

const registeredRecruiter=mongoose.model("registeredRecruiters",schema);
module.exports=registeredRecruiter;