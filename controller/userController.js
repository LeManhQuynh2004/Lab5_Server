const { UserModel } = require("../model/model");

const userController = {
    //GET ALL USER
    getAllData: async (req, res) => {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = userController;
