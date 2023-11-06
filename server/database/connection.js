const mongoose = require("mongoose");

const Dbconnection = async () => {

    try {
        await mongoose.connect('mongodb+srv://sanket:sanket@cluster0.ntdskhz.mongodb.net/');
        console.log("Database is connected");
        return;
    } catch (error) {
        console.log(error);
        return "error in Databse"
    }
};

module.export = Dbconnection();