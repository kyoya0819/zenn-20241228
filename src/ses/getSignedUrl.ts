import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3client = new S3Client({
    forcePathStyle: process.env.NODE_ENV === "development" ? true : undefined
});

const key = "test.txt";

const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key
});

const signedUrl = getSignedUrl(
    s3client,
    command,
    {
        expiresIn: 60 * 60 * 24 * 7 // 1週間 + 5分
    }
).then(url => {
    console.log(url);
});