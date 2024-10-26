const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Rule = sequelize.define('Rule', {
    rule_string: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ast: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

module.exports = Rule;
