import { Sequelize } from 'sequelize';
import { DB_NAME } from "../constants.js";
import { UserModel } from '../models/user.model.js';
import { BlogModel } from '../models/blogPost.model.js';
import { ContactModel } from '../models/contact.model.js'

let User=null;
let Blog=null;
let Contact=null;
const pgDbconnection=async()=>{

    const sequelize = new Sequelize(DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect:process.env.DB_USER
  });
  
  try { 
    
     //to check db connection
    await sequelize.authenticate();
    console.log('Postgres DB Connection has been established successfully.');

    //Creating User Model using UserModel method and assign to User to use
    User=UserModel(sequelize)
    Blog=BlogModel(sequelize)
    Contact=ContactModel(sequelize)
    // Now sync the db with created modle
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}
export
{
    pgDbconnection,
    User,
    Blog
} ;



/*
const sequelize = new Sequelize(
    DB_NAME, 
    process.env.DB_USER, 
    'Qwerty@123',
     {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect:'postgres'
     }
    );
     
export default sequelize;
*/



