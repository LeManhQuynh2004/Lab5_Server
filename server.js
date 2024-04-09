const express = require('express')//import express -- require == import
const app = express()
const port = 3000 //Cổng lắng nghe
const path = require('path'); // Module path dùng để xử lý đường dẫn tệp
const morgan = require('morgan');
app.use(morgan('dev'));

const mongoose = require('mongoose');
const distributeController = require('./controller/distributeController');
const routerFruits = require('./router/fruits');
const userRouter = require('./router/user');
const { DistributeModel, FruitsModel } = require('./model/model');
const upload = require('./config/upload');
mongoose.connect('mongodb://127.0.0.1:27017/Distribute')
    .then(() => console.log('Connected!'));

app.use(express.json());
//route

app.use('/fruits', routerFruits)
app.use('/users',userRouter)

app.post('/uploadFile', upload.array('images', 5), async (req, res) => {
    try {
        const data = req.body;
        const files = req.files;

        if (!files) {
            // If no file is uploaded, return an error response
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${files.filename}`;
        // Image URL will be saved as: http://localhost:3000/uploads/filename

        const newFruit = new FruitsModel({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            image: imageUrl, // Add the image URL
            description: data.description,
            distributor: data.distributor
        }); // Create a new fruit object

        const savedFruit = await newFruit.save();

        if (data.distributor) {
            const distributor = await DistributeModel.findById(data.distributor);
            await distributor.updateOne({ $push: { fruits: savedFruit._id } });
        }

        res.status(200).json(savedFruit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/', distributeController.getAllData)
app.get('/search', distributeController.searchData)
app.post('/', distributeController.postData)
app.get('/:id', distributeController.getAnData)
app.put('/:id', distributeController.updateData)
app.delete('/:id', distributeController.deleteData)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})