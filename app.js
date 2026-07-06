const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const express = require('express');
const app = express();
const port = 80;

const secret_name = "prod/app/db_creds";
const client = new SecretsManagerClient({ region: "ap-southeast-1" }); // Đổi lại region của bạn

app.get('/', async (req, res) => {
  try {
    const response = await client.send(new GetSecretValueCommand({ SecretId: secret_name }));
    const secrets = JSON.parse(response.SecretValue);
    res.send(`<h1>Ứng dụng kết nối DB thành công!</h1><p>Mật khẩu lấy an toàn từ Secrets Manager: BẢO MẬT </p>`);
  } catch (error) {
    res.status(500).send("Lỗi kết nối Secrets Manager: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});