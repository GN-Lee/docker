import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private s3Client: S3Client;

  constructor() {
    // 환경변수가 없을 경우 에러 처리 추가
    if (
      !process.env.AWS_REGION ||
      !process.env.AWS_ACCESS_KEY_ID ||
      !process.env.AWS_SECRET_ACCESS_KEY ||
      !process.env.AWS_S3_BUCKET
    ) {
      throw new Error('AWS 환경변수가 설정되지 않았습니다.');
    }

    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
    });
  }

  async uploadImage(file: Express.Multer.File) {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `images/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    try {
      await this.s3Client.send(command);
      return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/images/${file.originalname}`;
    } catch (error) {
      console.error('S3 업로드 에러:', error);
      throw new Error('이미지 업로드 실패');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
