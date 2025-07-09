const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const upload = require('../middleware/uploadMiddleware');
const { registerUser, loginUser, getUserInfo } = require('../controller/auth.Controller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user',protect, getUserInfo);

router.post("/upload-image", upload.single("image"),(req,res) =>{
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    };
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
})

module.exports = router;