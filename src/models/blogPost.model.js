import { Sequelize } from 'sequelize';
import {User} from '../db/dbConnection.js'

export const BlogModel =(sequelize)=>{ 

    const { DataTypes }=Sequelize

return sequelize.define('Blog', 
{
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Define the foreign key attribute
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
  
})};
