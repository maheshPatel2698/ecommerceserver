const nodemailer = require('nodemailer')
const tokenGen = require('./tokenGen')

const emailHelper = async (user, res, email) => {

    const token = tokenGen(user)
    try {
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SECURE_EMAIL,
                pass: process.env.SECURE_PASSWORD
            }
        });


        let mailDetails = {
            from: process.env.SECURE_EMAIL,
            to: email,
            subject: 'Password reset link Please copy and paste the url to change your password',
            text: `http://localhost:3000/profile/resetpassword/${token}`
        };

        const sendmail = await mailTransporter.sendMail(mailDetails)
        res.status(200).json({
            success: true,
            message: "Reset Password Link Sent SuccessFully",
            sendmail
        })

    } catch (error) {
        res.status(500).json({
            success: "false",
            message: "Internal Server Error"
        })
        console.log(error)
    }
}

module.exports = emailHelper