const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
    const { email, message, subject } = req.body;
    console.log(email, message, subject);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject: subject,
        html: `
        <html>
            <head>
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">  
                    ${message}
                    <br>
                    <img src="cid:logo@skoolworkshop.nl" alt="Team Skool Workshop Logo">
                    <br>
                    <p>Veilingkade 15 | 4815 HC Breda | Tel. 085 - 0653923 | App. 06 - 28318842</p>
                    <p>Mail. info@skoolworkshop.nl | Web. www.skoolworkshop.nl</p>
                </div>
            </body>
        </html>
    `,
        attachments: [
            {
                filename: 'logo.png',
                path: 'https://skoolworkshop.nl/wp-content/uploads/2020/06/Skool-Workshop_Logo.png',
                cid: 'logo@skoolworkshop.nl' // Use a unique CID here
            }
        ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email.');
        } else {
            console.log("Email sent successfully!");
            res.status(200).send('Email sent successfully!');
        }
    });
});

module.exports = { sendEmail };
