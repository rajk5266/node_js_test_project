const Sequelize = require('sequelize')

const sequelize = new Sequelize('nodejs', 'root', 'Hannah903@ophio', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;