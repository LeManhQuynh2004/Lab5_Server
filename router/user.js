const upload = require("../config/upload");
const userController = require("../controller/userController");
const { UserModel } = require("../model/model");

const router = require("express").Router();

router.get('/', userController.getAllData);

router.post('/uploadFile', upload.single('avatar'), async (req, res) => {
    try {
        const data = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
        // Image URL will be saved as: http://localhost:3000/uploads/filename

        const newUser = new UserModel({
            username: data.username,
            password: data.password,
            avatar: imageUrl,
            email: data.email
        })

        const saveUser = await newUser.save();

        res.status(200).json(saveUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
