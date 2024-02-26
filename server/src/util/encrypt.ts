import * as dotenv from 'dotenv';
import * as crypto from 'node:crypto';

dotenv.config();

// Type-safe key access and conversion
const keyBuffer: Buffer = Buffer.from(process.env.ENCRYPTION_KEY || '', 'base64');
if (keyBuffer.length !== 32) {
  throw new Error('Invalid ENCRYPTION_KEY length. It should be 32 bytes.');
}

const algo = 'aes-256-gcm';

function encrypt(plainText: any): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algo, keyBuffer, iv);
  let encryptedText = cipher.update(plainText, 'utf8', 'base64');
  encryptedText += cipher.final('base64');
  return iv.toString('base64') + ':' + encryptedText;
}

function decrypt(input: string): string {
  
  // log input
  console.log("INPUT: "+ input)
  const parts = input.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted text format.');
  }
  const iv = Buffer.from(parts[0], 'base64');
  const encryptedText = parts[1];

  // log input parts
  console.log("IV: "+iv)
  console.log("ENCRYPTED TEXT: "+encryptedText);

  const decipher = crypto.createDecipheriv(algo, keyBuffer, iv);
  // log
  console.log("DECIPHER"+ decipher)

  let decryptedText = decipher.update(encryptedText, 'base64', 'utf-8');
  // log
  console.log("DECRYPTED TEXT: "+ decryptedText)

  //decryptedText += decipher.final('utf8');
  
  // log
  console.log("DECRYPTED TEXT: "+ decryptedText)
  return decryptedText;
}

export { encrypt, decrypt };
