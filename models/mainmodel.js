const Sequelize = require('sequelize');
const sequelize = require('../util/database');


const product = sequelize.define('products', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    product:{
        type: Sequelize.STRING,
        allowNull: false
   },
    description:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
}) 

module.exports = product