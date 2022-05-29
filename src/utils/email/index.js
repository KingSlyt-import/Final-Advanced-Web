// core module
const path = require('path');

// npm module
const nodemailer = require('nodemailer');
const ejs = require('ejs');
require('dotenv').config();

const sendRegisterEmail = async(data) => {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;
    // console.log(EMAIL_USER, EMAIL_PASSWORD);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: EMAIL_HOST,
        // port: EMAIL_PORT,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        },
        // secure: false,
        // tls: {
        //     rejectUnauthorized: false
        // },
    });

    const viewsData = {
        userName: data.username,
        password: data.password
    }

    const templatePath = path.join(__dirname, `../../views/email/`);
    ejs.renderFile(templatePath + 'emailer.ejs', { viewsData }, async(err, htmlData) => {
        if (err) {
            console.log('Render template cho emailer gặp lỗi: ' + err);
        } else {
            try {
                const mailOptions = {
                    from: EMAIL_USER,
                    to: data.toEmail,
                    subject: data.subject,
                    html: htmlData
                        // html: await fs.readFile()
                };
                const info = await transporter.sendMail(mailOptions);
                return info;
            } catch (error) {
                console.log('Có lỗi trong quá trình render template email: ' + error.message);
                return false;
            }
        }
    });
}

module.exports = { sendRegisterEmail };