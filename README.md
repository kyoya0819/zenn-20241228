# 「LocalStackはいいぞ！」のコードサンプル

## 前提

- Docker, Docker Composeがインストールされていること
- bunがインストールされていること

以下の環境で検証しています。
- Docker: v27.2.0
- Docker Compose: v2.29.2-desktop.2
- bun: 1.1.42

## ファイルについて

- `/docker-compose.yml`: LocalStack Community Editionを起動するためのDocker Composeファイル
- `/docker-compose-pro.yml`: LocalStack Pro Editionを起動するためのDocker Composeファイル
- `/.docker/development/localstack/ready.d`: LocalStackの起動後に実行されるスクリプト（バケットの初期化とMAIL_FROMの認証設定をしています。）
- `/src`: LocalStackのサンプルコードたち
  - `/s3`: S3で署名付きURLを作成するサンプルコード
  - `/ses`: SESでメールを送信するサンプルコード

## 実行方法

あらかじめ環境変数のコピーと、依存関係のインストールと、Dockerコンテナは起動しておいてください。

```bash
$ cp .env.sample .env
$ bun install
$ docker compose up
```

### S3で署名付きURLを作成する

#### ファイルのアップロード

```bash
$ bun src/s3/push.ts
success // <- こうなればOK
```

#### 署名付きURLの取得

```bash
$ bun src/s3/getSignedUrl.ts
http://localhost:4566/test/test.txt?... // <- こうなってアクセスできればOK
```

### SESでメールを送信する

```bash
$ bun src/ses/sendEmail.ts
// 何も出なくてOK

$ curl --silent "http://localhost:4566/_aws/ses?email=noreply@example.com" | jq .
{
  "messages": [
    {
      "Id": "...",
      "Region": "ap-northeast-1",
      ...
// ↑ 自分が送信したメッセージが確認できればOK
```

## Links

- Zenn記事: https://zenn.dev/kyoya0819/articles/0fea37c6709d8d
- 𝕏: https://x.com/kyoya0819