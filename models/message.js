const mongoose = require('mongoose')
const {Schema} = mongoose

const adminMessageSchema = new Schema({
    author: String,
    message: String,
    time: String
})

const AdminMessageMoel = mongoose.model('MessageDetails', adminMessageSchema)
module.exports = AdminMessageMoel