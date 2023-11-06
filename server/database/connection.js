const mongoose = require("mongoose");

async function connect(){
    try {
        await mongoose.connect('mongodb+srv://sanket:sanket@cluster0.ntdskhz.mongodb.net/user_register');
        console.log("Database is connected");
        return;
    } catch (error) {
        console.log(error);
        return "error in Databse"
    }
}

module.exports = connect;