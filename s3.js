const S3 = require("aws-sdk/clients/s3");

//import fs lib
const fs = require("fs");

//call the Dotenv Package
require("dotenv").config();

//importing Varible From ENV File
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

//Create A Instance of S3
const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// Creating A Function of Uplaod the File
function uploadFile(file) {
  //Use Loop In (file) What We Get
  for (const f in file) {
    const images = file[f];
    //using map in Images
    images.map((image) => {
      const fileStream = fs.createReadStream(image.path);
      const uploadParams = {
        Bucket: bucketName,
        Key: image.filename,
        Body: fileStream,
      };
      //returning The UploadFunction And Make it A Promise()
      return s3.upload(uploadParams).promise();
    });
  }
}

// exporting the Function (uploadFile)
module.exports = uploadFile;
