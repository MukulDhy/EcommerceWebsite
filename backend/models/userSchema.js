const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please Enter Your Name"]
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        required : true,
        default : false
    },
},{timestamps:true});

/* Middle Ware for Password Match */
UserSchema.methods.matchPassword = async function(password){
    return (await bcrypt.compare(password,this.password));
}

/* Middle Ware for Decrypt Password */
UserSchema.pre('save',async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

const User = mongoose.model("User",UserSchema);

module.exports = User;