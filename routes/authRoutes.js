const express = require('express')
const router = express.Router()
const cors = require('cors')
const {test, registerUser, loginUser, getProfile, registerAdmin, loginAdmin, getAdminProfile, registerCourse} = require('../controllers/authController')
const User = require('../models/user')
const Image = require('../models/image')



// Middlewares
router.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

router.get('/', test)

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)

router.post('/register-course', registerCourse)


router.post('/admin-register', registerAdmin)
router.post('/admin-login', loginAdmin)
router.get('/admin-profile', getAdminProfile)


router.get('/getUser/:id', (req, res) =>{
    const id = req.params.id 
    User.findById({_id: id})
    .then((users)=>{res.json(users)})
    .catch((err)=>{res.json(err)})
})

router.put('/UpdateInfo/:id', (req, res) => {
        const id = req.params.id

        User.findByIdAndUpdate({_id: id}, {
            name: req.body.name, 
            email:req.body.email})
            .then((users)=>{
            res.json(users)
        }).catch((err)=>{
            res.json(err)
        })
})

router.get('/create', (req, res)=>{
    User.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

router.get('/register-course', (req, res)=>{
    User.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

router.delete('/deleteUser/:id', (req, res)=>{
    const id = req.params.id
    User.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err =>res.json(err))
})

router.post('/uploadImage', async (req, res) => {
    const {base64} = req.body
    try {
        User.create({image:base64})
        res.send({status: 'ok'})
        
    } catch (error) {
        console.log(error)
        res.send({status: 'error', data:error})
    }
})

module.exports = router
