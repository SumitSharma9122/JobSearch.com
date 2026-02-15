const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const file = req.file;
        let profilePhoto = "";
        if (file) {
            // Here you would upload to cloud storage (e.g., Cloudinary)
            // For now, we'll just simulate a URL or use the buffer if needed
            // simplistic: profilePhoto = "some_url"; 
            // Better: since we are using memory storage, we might convert buffer to base64 or just save filename if disk storage was used.
            // But usually we upload to Cloudinary.
            // Let's assume for this fix we might just skip the Cloudinary part or just note it.
            // However, the *blocking* issue is `req.body` being empty without multer.
            // So just adding multer fixes the data parsing.
            // Let's at least acknowledge the file.
        }

        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: "" // Default or processed URL
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Logout
exports.logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Update Profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, bio, skills } = req.body;

        const file = req.file;
        // cloudinary setup will be here later

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if (name) user.name = name;
        if (email) user.email = email;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;
        // Resume upload handling
        if (file) {
            // Store as base64 data URI (works without cloud storage)
            const resumeDataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            user.profile.resume = resumeDataUri;
            user.profile.resumeOriginalName = file.originalname;
        }

        await user.save();

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
