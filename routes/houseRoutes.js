const requireLogin = require("../middlewares/requireLogin");
const { House } = require("../models/House");
const aws = require('aws-sdk');
require('dotenv').config(); // Configure dotenv to load in the .env file

// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-1', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.bucket

module.exports = app => {
  app.get("/api/house", requireLogin, async (req, res) => {
    const house = await House.find({ userId: req.user._id })
      .lean()
      .exec();

    res.send(house);
  });

  app.put("/api/house", requireLogin, async (req, res) => {
    const { _id, updatedHouse } = req.body;
    await House.updateOne({ _id }, { $set: updatedHouse });
    res.send({ success: true, meta: updatedHouse });
  });

  app.patch("/api/house-image", requireLogin, async (req, res) => {
    const { _id, imageUrl, address } = req.body;

    const existingData = await House.findOne({_id}).lean().exec();
    const images = existingData.address.images || [];

    const hasDefaultImage = images.find(i => i.isDefault);

    const updatedImages = images.concat({ url: imageUrl, isDefault: !hasDefaultImage });

    const updatedData = {
      ...existingData,
      address: {
        ...address,
        images: updatedImages,
      }
    };

    await House.updateOne({ _id }, { $set: updatedData });
    res.send({ success: true, meta: updatedData });
  });

  app.patch("/api/house-image/default", requireLogin, async (req, res) => {
    const { _id, imageId } = req.body;

    const existingData = await House.findOne({_id}).lean().exec();
    const images = existingData.address.images || [];

    const updatedImages = images.map((image) => {
        return {
          ...image,
          isDefault: String(image._id) === imageId
        }
    });

    const updatedData = {
      ...existingData,
      address: {
        ...existingData.address,
        images: updatedImages,
      }
    };
    await House.updateOne({ _id }, { $set: updatedData });
    res.send({ success: true, meta: updatedData });
  });

  app.patch("/api/house-image/delete", requireLogin, async (req, res) => {
    const { _id, imageId } = req.body;

    const existingData = await House.findOne({_id}).lean().exec();
    const images = existingData.address.images || [];

    const updatedImages = images.filter((image) => {
        return String(image._id) !== imageId;
    });

    const updatedData = {
      ...existingData,
      address: {
        ...existingData.address,
        images: updatedImages,
      }
    };
    await House.updateOne({ _id }, { $set: updatedData });
    res.send({ success: true, meta: updatedData });
  });

  app.delete("/api/house", requireLogin, async (req, res) => {
    const { _id } = req.body;

    await House.remove({ _id });
    res.send({ success: true });
  });

  app.post("/api/house", requireLogin, async (req, res) => {
    const { address, financials, insurance, utilities, support } = req.body;

    if (!req.user) {
      res
        .status(401)
        .send({ message: "Not allowed to perform this operation." });
    }

    const response = await House.create({
      userId: req.user._id,
      address,
      financials,
      insurance,
      utilities,
      support
    });
    res.send({ success: true, meta: response });
  });

  app.post("/api/s3_sign", requireLogin, async (req, res) => {
    const s3 = new aws.S3();  // Create a new instance of S3
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
// Set up the payload of what we are sending to the S3 api
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 500,
      ContentType: fileType,
      ACL: 'public-read'
    };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        res.json({success: false, error: err})
      }
      // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      // Send it all back
      res.json({success:true, data:{returnData}});
    });
  });
};
