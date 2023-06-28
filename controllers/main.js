const path = require('path');
const shop = require('../models/mainmodel');
const product = require('../models/mainmodel');

exports.showhtmlfile = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}


exports.showproduct = async (req, res) => {
    try{
    const response = await shop.findAll()
    res.send(response)
    }catch(err){
        console.log(err)
    }
}

exports.addproduct = async (req, res) =>{
    // console.log(req.body)
    const{product, description, price, quantity} = req.body;

    await shop.create({
        product: product,
        description: description,
        price: price,
        quantity: quantity
    })
    .then(response =>{
        const { id, product, description, price, quantity } = response.dataValues;
        res.send({
            id,
            product,
            description,
            price,
            quantity
        })
    })
    .catch(err => console.log(err))
}

exports.updatequantity = async (req, res) =>{
    const id = req.params.productId
    const updatedquantity = req.body.quantity

    try{
        const product = await shop.findByPk(id)
        product.quantity = updatedquantity
        await product.save()
        res.send(id)
    }
    catch(err){
        console.log(err)
    }
   }