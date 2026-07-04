import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import 'dotenv/config';

const s3 = new S3Client({
  region: process.env.MGC_STORAGE_REGION || 'br-se1',
  endpoint: process.env.MGC_STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MGC_ACCESS_KEY,
    secretAccessKey: process.env.MGC_SECRET_KEY
  },
  forcePathStyle: true
});

export async function salvarPerfil(perfilId, dados) {
  await s3.send(new PutObjectCommand({
    Bucket: process.env.MGC_BUCKET,
    Key: `perfis/${perfilId}.json`,
    Body: JSON.stringify(dados),
    ContentType: 'application/json'
  }));
}
