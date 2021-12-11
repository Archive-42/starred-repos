const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

const Trade = sequelize.define("trade", {
    type: DataTypes.TEXT,
    user_id: DataTypes.NUMBER,
    symbol: DataTypes.TEXT,
    shares: DataTypes.NUMBER,
    price: DataTypes.NUMBER,
    timestamp: DataTypes.BIGINT,
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {timestamps : false});

module.exports = Trade;
