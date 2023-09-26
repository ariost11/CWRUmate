// Import necessary CryptoJS modules
const CryptoJS = require('crypto-js');
const { AES, enc } = CryptoJS;

// Encryption function
function encryptText(text, key) {
  const encrypted = AES.encrypt(text, key);
  return encrypted.toString();
}

// Decryption function
function decryptText(encryptedText, key) {
  const decrypted = AES.decrypt(encryptedText, key);
  return decrypted.toString(enc.Utf8);
}

// Your secret key (should be kept secret)
const secretKey = 'YourSecretKey123';

// Text to be encrypted
const plaintext = 'Hello, CryptoJS!';

// Encrypt the text
const encryptedText = encryptText(plaintext, secretKey);
console.log('Encrypted Text:', encryptedText);

// Decrypt the text
const decryptedText = decryptText(encryptedText, secretKey);
console.log('Decrypted Text:', decryptedText);