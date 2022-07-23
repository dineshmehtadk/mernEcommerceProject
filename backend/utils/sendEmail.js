const nodeMailer = require("nodemailer")

const sendEmail = async function(options){
    const transposter = nodeMailer.createTransport({
      
        service: process.env.SMPT_SERVICE,
        auth:{
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        }
    })

    const mailOptions = {
        from : process.env.SMPT_MAIL,
        to : options.email,
        subject :options.subject,
        text : options.message
    };
    
    await transposter.sendMail(mailOptions)

}

module.exports = sendEmail;