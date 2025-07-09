const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log("connected to mongodb");
    }
    catch(error){
       console.log("error to connect to mongodb",error.message);
       process.exit(1); // Exit the process with failure
    }

}

module.exports = connectDB