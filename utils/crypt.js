//Checking the crypto module
const crypto = require("crypto");
const algorithm = "aes-256-cbc";

class Crypt {
  //Encrypting text
  encrypt(value, data) {
    let token = data.token.substring;
    const key = Buffer.from(process.env.CRYPT_KEY);
    const iv = crypto.randomBytes(16);

    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

    let encrypted = cipher.update(value);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return {
      txt: iv.toString("hex"),
      encryptedData: encrypted.toString("hex"),
    };
  }

  // Decrypting text
  decrypt(value) {
    const key = Buffer.from(process.env.CRYPT_KEY);

    let iv = Buffer.from(value.txt, "hex");

    let encrypted = Buffer.from(value.encryptedData, "hex");

    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encrypted);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}

module.exports = new Crypt();
