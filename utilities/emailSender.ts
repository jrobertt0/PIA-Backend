import nodemailer from "nodemailer";
import 'dotenv/config.js';

let transporter: nodemailer.Transporter

(function() {
    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL, // generated ethereal user
            pass: process.env.EMAIL_PASS, // generated ethereal password
        },
    });
})()

export function getTransporter(): nodemailer.Transporter {
    return transporter
}