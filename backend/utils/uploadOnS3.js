const { S3 } = require('aws-sdk');
const AWS = require('aws-sdk');
// const dotenv = require("dotenv");
// dotenv.config({ path: "../config.env" });

const s3Bucket = new AWS.S3({
    accessKeyId: process.env.KEYID,
    secretAccessKey: process.env.KEY,
    region: 'us-east-1',
});

function uploadOnS3(file, filename) {
    var date = new Date();
    var parentFolder = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const params = {
        Bucket: 'perswell-img',
        Key: parentFolder + '/' + filename,
        Body: file,
    };
    return new Promise(function (resolve, reject) {
        s3Bucket.upload(params, function (err, data) {
            if (err) {
                console.log( 'Error =>' + err);
                reject(null);
            }
            if (data != null) {
                console.log('Image', 'uploadOnS3' + data.Location);
                resolve(data.Location);
            }
        });
        });
    }
module.exports = uploadOnS3;