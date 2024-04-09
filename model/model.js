const mongoose = require("mongoose");
const DistributeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    fruits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Fruits"
        }
    ]
});

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        maxLength: 255
    },
    password: {
        type: String,
        maxLength: 255
    },
    email: {
        type: String,
        unique: true
    },
    avatar: {
        type: String,
        require: true
    }
});

const FruitsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    image: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Distribute"
    }
});

let DistributeModel = mongoose.model('Distribute', DistributeSchema);
let UserModel = mongoose.model("User", UserSchema);
let FruitsModel = mongoose.model('Fruits', FruitsSchema);

module.exports = {
    DistributeModel,
    UserModel,
    FruitsModel
};