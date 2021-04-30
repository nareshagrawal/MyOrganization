import nodemailer  from 'nodemailer';
require('dotenv').config();

const email = (orgEmail,orgID)=>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAILID,
            pass: process.env.GMAILPASS
        }
    });

    const mailOptions = {
        from:  process.env.GMAILID,
        to: orgEmail,
        subject: 'Organization created',
        html: '<h1>Welcome</h1><p>Thank you for registeration!</p><p>Your organization ID:'+ orgID
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

}

export default {
    email: email
};