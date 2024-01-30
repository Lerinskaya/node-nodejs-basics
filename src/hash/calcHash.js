import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { fileURLToPath } from 'node:url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const absolutePath = path.dirname(__filename);
const filePath = path.join(absolutePath, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {

  return new Promise((resolve, reject) => {
    const hash = createHash('sha256');
    const stream = createReadStream(filePath);

    stream.on('data', (data) => {
      hash.update(data);
    });

    stream.on('end', () => {
      const hashResult = hash.digest('hex');
      resolve(hashResult);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
};

await calculateHash()
    .then((hash) => console.log(`Hash: ${hash}`))
    .catch((error) => console.error('Error:', error.message));;