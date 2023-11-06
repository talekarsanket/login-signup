const mongoose = require("mongoose");

const Dbconnection = async () => {

    try {
        await mongoose.connect('mongodb://localhost:27017/user_register');
        console.log("Database is connected");
        return;
    } catch (error) {
        console.log(error);
        return "error in Databse"
    }
};

module.export = Dbconnection();