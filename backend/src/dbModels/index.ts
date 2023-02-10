import Sequelize from 'sequelize'

export const sequelize = new Sequelize.Sequelize('postgres://postgres:password@localhost:5432/scheduletool')

sequelize.authenticate();
sequelize.sync();
