// core module
const path = require('path');

// npm module
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const ejs = require('ejs');
require('dotenv').config();

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = process.env;

const getAccessToken = async() => {
    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    const accessToken = await oAuth2Client.getAccessToken();
    return accessToken;
};

const sendRegisterEmail = async(data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: EMAIL_HOST,
        // port: EMAIL_PORT,
        auth: {
            type: 'OAuth2',
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: getAccessToken
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
    ejs.renderFile(templatePath + 'emailer-register.ejs', { viewsData }, async(err, htmlData) => {
        if (err) {
            console.log('Render template cho emailer gặp lỗi: ' + err);
        } else {
            try {
                const mailOptions = {
                    from: EMAIL_USER,
                    to: data.toEmail,
                    subject: data.subject,
                    html: htmlData
                };
                const info = await transporter.sendMail(mailOptions);
                return info;
            } catch (error) {
                console.log('Có lỗi trong quá trình render template email: ' + error.message);
                return false;
            }
        }
    });
};

const sendRecoverPasswordEmail = async(data) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: EMAIL_HOST,
        // port: EMAIL_PORT,
        auth: {
            type: 'OAuth2',
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: getAccessToken
        },
        // secure: false,
        // tls: {
        //     rejectUnauthorized: false
        // },
    });

    const viewsData = {
        otp: data.otp,
        link: data.link
    }

    const templatePath = path.join(__dirname, `../../views/email/`);
    ejs.renderFile(templatePath + 'emailer-recover.ejs', { viewsData }, async(err, htmlData) => {
        if (err) {
            console.log('Render template cho emailer gặp lỗi: ' + err);
        } else {
            try {
                const mailOptions = {
                    from: EMAIL_USER,
                    to: data.toEmail,
                    subject: data.subject,
                    html: htmlData
                };
                const info = await transporter.sendMail(mailOptions);
                return info;
            } catch (error) {
                console.log('Có lỗi trong quá trình render template email: ' + error.message);
                return false;
            }
        }
    });
};

module.exports = { sendRegisterEmail, sendRecoverPasswordEmail };