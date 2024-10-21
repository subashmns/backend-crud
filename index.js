const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/product.model')

app.use(express.json());  // to parse json data in request body
app.use(express.urlencoded({extended: false})); //}))

app.get('/', (req, res) => {
    res.send('Welcome to my API when i fetch something Welcome to my API when i fetch something')    
});

app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }
    catch(error){
        console.error(error)
        res.status(500).json({Message: error.message});
    }
});

app.get('/api/products/:id', async (req, res) => {
    try{
        // const product = await Product.findById(req.params.id);
        // if(product){
        //      res.status(200).json(product);
        // }
        // else {
        //     res.status(404).json({Message: 'Product not found'});
        // }

        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        console.error(error)
        res.status(500).json({Message: error.message});
    }
});

app.post('/api/products',async (req, res) => {
   try{
       const product =  await Product.create(req.body); 
       res.status(200).json(product);
   }
   catch(error){
    //    console.error(error)
       res.status(500).json({Message: error.message});
   }
});

// update a product

app.put('/api/products/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if( !product ){
            return res.status(404).json({Message: 'Product not found'});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(error){
        console.error(error)
        res.status(500).json({Message: error.message});
    }
});

//Delete a product

app.delete('/api/products/:id', async(req, res) => {
    try{
        const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        return res.status(404).json({Message: 'Product not found'});
    }
    res.status(200).json({Message: 'Product successfully deleted'});
}   
    catch(error){
        console.error(error)
        res.status(500).json({Message: error.message});
    }
});


mongoose.connect("mongodb+srv://subashebanezer:subash@backenddb.8f0up.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(3000, () =>{
        console.log('Server is running on port 3000 thanks')
    }); 
})
.catch(()=>{
    console.log("Failed to connect to MongoDB")
})