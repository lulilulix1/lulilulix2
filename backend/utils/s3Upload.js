const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Upload = async (file) => {
  const fileKey = `products/${uuidv4()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET.trim(),
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
    ContentDisposition: `inline; filename="${file.originalname}"`,
  };

  await s3.send(new PutObjectCommand(params));

  // Përdor CloudFront URL për prodhim, jo S3 direkt!
  if (process.env.NODE_ENV === 'production') {
    // 👇 KJO ËSHTË NDRYSHIMI KRYESOR - Përdor CloudFront URL
    return `https://d1ncy56ya02jf4.cloudfront.net/${fileKey}`;
  } else {
    // Dev: përdor URL nga backend lokal
    return `/uploads/${fileKey}`;
  }
};

module.exports = s3Upload;