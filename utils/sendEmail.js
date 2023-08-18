const AWS = require("aws-sdk");
MAIL_SERVICE = 'gmail';
// const dotenv = require("dotenv");
// dotenv.config({ path: "../config.env" });

const awsConfig = {
  accessKeyId: process.env.KEYID,
  secretAccessKey: process.env.KEY,
  region: "us-east-2",
};

const SES = new AWS.SES(awsConfig);

const sendEmail = async (options) => {
    try {
        const mailOptions = {
            Source: process.env.MAIL_FROM,
            Destination: {
                ToAddresses: [options.to],
            },
            Message: {
                Subject: {
                    Data: options.subject,
                },
                Body: {
                    Html: {
                        Data: options.text,
                    },
                },
            },
        };

        SES.sendEmail(mailOptions, function (err, Data) {
            if (err) {
                console.log(err);
            } else {
                console.log(Data);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail;