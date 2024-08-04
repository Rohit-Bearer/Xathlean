import dotenv from "dotenv";
// Load the Environment Variable using dotenv.config
dotenv.config();
import { app } from "./app.js";
import {pgDbconnection} from "./db/dbConnection.js"

pgDbconnection()
.then(()=>{
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on port ${process.env.SERVER_PORT}`);
      });
}
)
.catch((error)=>{
    console.error('Unable to connect to the database:', error.stack);
})




