import * as dotenv from 'dotenv';
import * as crypto from 'crypto';

dotenv.config();

// Type-safe key access and conversion
const keyBuffer: Buffer = Buffer.from(process.env.ENCRYPTION_KEY || '', 'hex');
if (keyBuffer.length !== 32) {
  throw new Error('Invalid ENCRYPTION_KEY length. It should be 32 bytes.');
}
const key = keyBuffer.toString('utf-8');

const algo = 'aes-256-cbc';

function encrypt(plainText: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algo, key, iv);
  let encryptedText = cipher.update(plainText, 'utf8', 'hex');
  encryptedText += cipher.final('hex');
  return iv.toString('hex') + ':' + encryptedText;
}

function decrypt(input: string): string {
  const parts = input.split(':');
  if (parts.length !== 2) {
    throw new Error('Invalid encrypted text format.');
  }
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  const decipher = crypto.createDecipheriv(algo, key, iv);
  let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8');
  decryptedText += decipher.final('utf8');
  return decryptedText;
}

export { encrypt, decrypt };
