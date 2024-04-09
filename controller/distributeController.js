const { DistributeModel } = require("../model/model");
const distributeController = {
    //GET ALL
    getAllData: async (req, res) => {
        try {
            const distributes = await DistributeModel.find();
            res.status(200).json(distributes);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //POST
    postData: async (req, res) => {
        try {
            const distribute = new DistributeModel(req.body);
            await distribute.save();//Lưu vào cơ sở dữ liệu
            res.status(200).json(distribute)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //FIND ID
    getAnData: async (req, res) => {
        try {
            const distribute = await DistributeModel.findById(req.params.id);
            res.status(200).json(distribute)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //DELETE
    deleteData: async (req, res) => {
        try {
            await DistributeModel.findByIdAndDelete(req.params.id);
            res.status(200).json("DELETE SUCCESS")
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //SEARCH
    searchData: async (req, res) => {//Search name
        const keyword = req.query.key;
        try {
            const distribute = await DistributeModel.find({ name: { $regex: keyword, $options: "i" } });
            res.status(200).json(distribute);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    //POST
    updateData: async (req, res) => {
        try {
            const distribuleUpdate = await DistributeModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(distribuleUpdate);
        } catch (error) {
            res.status(500).json(error);
        }
    }

}
module.exports = distributeController;
