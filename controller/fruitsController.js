const upload = require("../config/upload");
const { FruitsModel, DistributeModel } = require("../model/model");

const fruitController = {
    //POST DATA
    //GET ALL DATA
    getAllFruits: async (req, res) => {
        try {
            const fruits = await FruitsModel.find();
            res.status(200).json(fruits)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    getAnFruits: async (req, res) => {
        try {
            const fruit = await FruitsModel.findById(req.params.id);
            res.status(200).json({
                "status": 200,
                "message": "Get SuccessFully",
                "data": fruit
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    updateFruits: async (req, res) => {
        try {
            const fruit = await FruitsModel.findById(req.params.id);
            const update = await fruit.updateOne({ '$set': req.body })
            res.status(200).json(update)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    deleteFruits: async (req, res) => {
        try {
            await DistributeModel.updateMany({ fruits: req.params.id }, { $pull: { fruits: req.params.id } })
            const deleteFruit = await FruitsModel.findByIdAndDelete(req.params.id);//tìm vào xóa
            res.status(200).json(deleteFruit)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = fruitController;
