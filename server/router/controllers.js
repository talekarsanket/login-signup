const express = require("express");
const registerSchema = require("../database/registerSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.get("/", (req, res) => {
    return res.send("controller route");
});


router.post("/signup", async (req, res) => {
    try {

        const {
            name,
            userName,
            email,
            password,
        } = req.body;

        let checkmail = await registerSchema.findOne({
            email: email
        });

        if (checkmail) {
            console.log("user already have an account");
            return (res.status(409).json({
                message: "User already exists"
            }));
        }

        const hashPassword = await bcrypt.hash(password, 10);
        console.log("hashpassword ---", hashPassword);

        const newUser = new registerSchema({
            name: name,
            userName: userName,
            email: email,
            password: hashPassword,
        });

        console.log("newUser--- **** ", newUser);
        await newUser.save();

        return res.status(200).json(newUser);
    } catch (error) {
        console.log("error in signup route----", error);
    }
});

router.post('/login', async (req, res) => {
    console.log("Inside login route");
    try {
        const {
            email,
            password
        } = req.body;

        const checkmail = await registerSchema.findOne({
            email: email
        });
        console.log("checkmail", checkmail);

        if (!checkmail) {
            return res.status(500).json("Email not found. Please check the email.");
        }

        let comparePass = await bcrypt.compare(password, checkmail.password);
        console.log("comparePass", comparePass);

        if (!comparePass) {
            return res.status(500).json("Password is incorrect");
        }

        const userId = checkmail.id;
        const jwtToken = jwt.sign({
            userId
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '60min'
        });
        console.log("JWT Token:", jwtToken);

        res.status(200).json({
            "token": jwtToken
        });
    } catch (error) {
        console.log("Error:", error);
    }
});




module.exports = router;