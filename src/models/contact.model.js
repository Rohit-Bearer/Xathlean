import { Sequelize } from 'sequelize';

export const ContactModel =(sequelize)=>{ 

    const {DataTypes}=Sequelize

return sequelize.define('Contact', 
{
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})};
