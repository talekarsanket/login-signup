const express = require("express");
const jwt = require("jsonwebtoken");
const registerSchema = require("../database/registerSchema");
require("dotenv").config();

const verifyToken = express.Router();

verifyToken.get('/', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log("ggggg ---", process.env.JWT_SECRET_KEY);
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.log("error in auth ---", err);
                    reject(err);
                }
                resolve(decoded);
                console.log("decoded token ----", decoded.userId);
            });
        });

        console.log("decoded token ----", decoded);

        const findUser = await registerSchema.findById(decoded.userId);

        if (!findUser) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        return res.status(200).json({
            findUser
        });

    } catch (error) {
        console.log("Error:", error);
        return res.status(401).json({
            error: "Failed to authenticate token"
        });
    }
});

module.exports = verifyToken;