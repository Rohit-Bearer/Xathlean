import { Sequelize } from 'sequelize';


export const UserModel =(sequelize)=>{ 

    const {DataTypes}=Sequelize

return sequelize.define('User', 
{
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})};
