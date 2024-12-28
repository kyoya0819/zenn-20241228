import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3client = new S3Client({
    forcePathStyle: process.env.NODE_ENV === "development" ? true : undefined
});

const key = "test.txt";
const body = "This is body.";

s3client.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: body
})).then(() => {
    console.log("success");
});