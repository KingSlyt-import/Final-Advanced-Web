// core module
const path = require('path');

// npm module
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const ejs = require('ejs');
const CLIENT_ID = '194004565624-tempo60o7t9fd86aou15fs2ddkvlgrpm.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04BnIVksJNNkxCgYIARAAGAQSNwF-L9Irxw3bHqmz0gj8v4KvwfEaA_wNWnYyUEYUGRPD-iz9_tJHTZSqfmooSz7CBgD4uddSASs';
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendRegisterEmail = async(data) => {
    const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;
    // console.log(EMAIL_USER, EMAIL_PASSWORD);
    const accessToken = await oAuth2Client.getAccessToken();
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
            accessToken: accessToken
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