import {Sequelize, Model, DataTypes} from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
export const playerModel = sequelize.define('Player', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    twitch: DataTypes.STRING,
    pronouns: DataTypes.STRING,
    country: DataTypes.STRING,
    discord: DataTypes.STRING
});

playerModel.sync();
