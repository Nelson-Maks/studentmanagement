const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    image: String,
    name:String,
    email: {
        type:String,
        unique: true
    },
    course: String,
    password: String
})

const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel



