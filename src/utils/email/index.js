// core module
const fs = require('fs');
const { promisify } = require('util')
const readFile = promisify(fs.readFile);

// npm module
const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;
// console.log(EMAIL_USER, EMAIL_PASSWORD);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    // host: EMAIL_HOST,
    // port: EMAIL_PORT,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
});

const sendEmail = async(data) => {
    try {
        const mailOptions = {
            from: EMAIL_USER,
            to: data.toEmail,
            subject: data.subject,
            html: `
            <p>Username: ${data.username}</p>
            <p>Password: ${data.password}</p>
            `
                // html: await fs.readFile()
        };
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.log('Có lỗi trong quá trình gửi email: ' + error.message);
        return false;
    }
};

module.exports = { sendEmail };