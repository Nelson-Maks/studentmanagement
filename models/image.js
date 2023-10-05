const mongoose = require('mongoose')
const {Schema} = mongoose

const userImageSchema = new Schema({
    image: String,
})

const UserImageModel = mongoose.model('Imagedetails', userImageSchema)
module.exports = UserImageModel