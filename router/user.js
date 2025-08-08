const express = require('express')
const router = express.Router();
const User = require('../models/userModel')





// View all data from mongoDB 

router.get('/user', async (req, res) => {
    console.log("get reques sended")
    try {
        const users = await User.find();
        console.log("get reques status =", 200)
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// create  new user 

router.post('/user', async (req, res) => {
    console.log("Post request sended")
    try {
        const { title, photo } = req.body
        const newUser = new User({ title, photo })
        await newUser.save(newUser)
        console.log("post reques status =", 200)
        res.status(200).json({
            success: true,
            newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})

// delete user 

router.delete('/user/:id', async (req, res) => {
    console.log("delete reques sended")
    const { id } = req.params
    const { title, photo } = req.body
    try {
        const deleteUser = await User.findByIdAndDelete(id, { title, photo })

        if (!deleteUser) {
            res.json({
                message: "user note found"
            })
        }
        console.log("delete reques status =", 200)
        res.status(200).json({
            success: true,
            message: deleteUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// update user 


router.put('/user/:id', async (req, res) => {
    console.log("put reques sended")
    const { id } = req.params
    const { title, photo } = req.body
    try {
        const updateUser = await User.findByIdAndUpdate(id, { title, photo })

        if (!updateUser) {
            res.json({
                message: "user not found"
            })
        }
        console.log("put  reques status =", 200)
        res.status(200).json({
            success: true,
            message: updateUser
        })

    } catch (error) {
        res.status(error).json({
            success: false,
            message: error.message

        })
    }
})



// GET /photos?q=searchTerm
router.get('/photos', async (req, res) => {
    try {
        const searchTerm = req.query.q || '';
        if (!searchTerm) {
            console.log("serch item not found")
           res.json(await User.find().limit(100));
        }

        const regex = new RegExp(searchTerm, 'i');

        const results = await User.find({ title: { $regex: regex } });
          res.status(200).json({
            success:true,
            message:results,
          })
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;