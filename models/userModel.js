const { Schema, model } = require('mongoose')


const UserSchema = new Schema({
    title: {
        type: String,
        
    },
    photo: {
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
})

const UserModel = model("User" , UserSchema)

module.exports = UserModel;