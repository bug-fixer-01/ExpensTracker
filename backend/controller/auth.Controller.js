const User = require("../models/Users.js")
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

exports.registerUser = async (req, res) => {
    try {
        console.log(req.body)
        const { fullName, email, password, profileImageUrl } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log(User)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ messages: "Email already in use" });
        }

        //create the User
        const user = await User.create({
            fullName,
            email,
            password,
            profileImageUrl,
        })

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        })

    }
    catch (error) {
        console.log("error in registerUser in auth controller", error.message)
        res.status(500).json({ err: "Internal Server error", error: error.message })
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        console.log(user)
        if (!user || !(await user.comparePasswords(password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id),
        });

    } catch (err) {
        res.status(500).json({ err: "Internal Server error", error: err.message });
        console.log("error in loginUser in auth controller", err.message);
    };

}

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log("error in getUserInfo in auth controller", error.message);
        res.status(500).json({ err: "Internal Server error", error: error.message });
    }
};