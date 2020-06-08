const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-central-1",
});

exports.sendEmail = (to, subject, text) => {
    return ses
        .sendEmail({
            Source: "Carlotta Frommer <carlotta.frommer@outlook.de>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Html: {
                        Data: text,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise();
};

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("req.file isn't there");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            // ^ PUT request for file (Object)
            // v info on the file
            Bucket: "progcf",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            // it worked
            next();
            fs.unlink(path, () => {});
            // ^ deletes the /uploads images
        })
        .catch((err) => {
            // uh oh
            console.log("Error in upload putObject in s3.js: ", err);
            res.sendStatus(500);
        });
};
