import { SendEmailCommand, SESClient, VerifyEmailIdentityCommand } from "@aws-sdk/client-ses";

// 変える場合は、 /.docker/development/localstack/ready.d も編集してください。
const from = "noreply@example.com";

const to = "hello@example.com";
const subject = "Hello, World!";
const body = "Hello, World! This is Body!!!";

const sesClient = new SESClient();

await sesClient.send(new VerifyEmailIdentityCommand({
    EmailAddress: from
}));

// メール送信処理実行
await sesClient.send(new SendEmailCommand({
    Source: from,
    Destination: {
        ToAddresses: [to]
    },
    Message: {
        Subject: {
            Data: subject
        },
        Body: {
            Text: {
                Data: body
            }
        }
    }
}));
