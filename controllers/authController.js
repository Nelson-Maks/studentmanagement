const User = require('../models/user')
const Admin = require('../models/admin')    
const {hashPassword, comparePassword} = require('../helpers/auth')

const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}


const registerUser = async(req, res) => {
    try {
        const {name, email, course, password} = req.body
                        // CHECKS
        // NAME
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        }


        // COURSE   
        if(!course){
            return res.json({
                error: 'Course is required'
            })
        }

        // PASSWORD
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be atleast six characters long'
            })
        }

        // CHECK EMAIL
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'Email is taken already'
            })
        }
        const Adminexist = await Admin.findOne({email})
        if(Adminexist){
            return res.json({
                error: 'Email is taken already'
            })
        }

        // User.find({})
        // .then(users => res.json(users))
        // .catch(err => res.json(err))

        const hasedPassword = await hashPassword(password)
        const user = await User.create({
            name, 
            email, 
            course,
            password: hasedPassword
        })

        return res.json(user)



    } catch (error) {
        console.log(error)
    }

}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exist
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: 'No User Found'
            })
        }

        // check password match
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, '5254236jsi4', {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }

        if(!match){
            res.json ({
                error: 'Passwords do not match'
            })
        }
        

    } catch (error) {
        console.log(error)
        
    }

}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, '5254236jsi4', {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else{
        res.json(null)
    }

}




















const registerAdmin = async(req, res) => {
    try {
        const {name, email, password} = req.body
                        // CHECKS
        // NAME
        if(!name){
            return res.json({
                error: 'Name is required'
            })
        }

        // PASSWORD
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be atleast six characters long'
            })
        }

        // CHECK EMAIL
        const Adminexist = await Admin.findOne({email})
        if(Adminexist){
            return res.json({
                error: 'Email is taken already'
            })
        }
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'Email is taken already'
            })
        }

        const hasedPassword = await hashPassword(password)
        const user = await Admin.create({
            name, 
            email, 
            password: hasedPassword
        })

        return res.json(user)

    } catch (error) {
        console.log(error)
    }

}



const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if user exist
        const user = await Admin.findOne({email})
        if(!user){
            return res.json({
                error: 'No User Found'
            })
        }

        // check password match
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name, course: user.course}, '5254236jsi4', {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }

        if(!match){
            res.json ({
                error: 'Passwords do not match'
            })
        }
        

    } catch (error) {
        console.log(error)
        
    }

}




const getAdminProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, '5254236jsi4', {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else{
        res.json(null)
    }

}



// const updateController = (req, res) => {
//     const id = req.params.id

//     try {
//         User.findByIdAndUpdate({_id: id}, {
//             name: req.body.name, 
//             email:req.body.email})
//             .then((users)=>{
//             res.json(users)
//         }).catch((err)=>{
//             res.json(err)
//         })
//     } catch (error) {
//         console.log(error)
        
//     }
// }


// const getUser = (req, res) =>{
//     const id = req.params.id 
//     User.findById({id})
//     .then((users)=>{res.json(users)})
//     .catch((err)=>{res.json(err)})
// }

const Course =  require('../models/course')
const registerCourse = async(req, res) => {
    try {
        const {course} = req.body

        // COURSE   
        if(!course){
            return res.json({
                error: 'Course is required'
            })
        }


        const user = await Course.create([
            {course: course}
        ])

        return res.json(user)



    } catch (error) {
        console.log(error)
    }

}



module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    
    registerAdmin,
    loginAdmin,
    getAdminProfile,

    registerCourse

    // updateController,
    // getUser
}