import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  public async findUpload(file: Express.Multer.File) {
    // const s3 = new S3();
    // const uploadResult = await s3
    // .upload({
    //   Bucket: this.configService.get('appConfig.awsBucketName'),
    //   Body: file.buffer,
    //   Key: ''
    //   ContentType: file.mimetype,
    // })
    //   .promise();
    return Promise.resolve(() => '');
  }

  private generateFileName(file: Express.Multer.File) {
    let name = file.originalname.split('.')[0];

    name.replace(/\s/g, '').trim();

    let extension = path.extname(file.originalname);

    let timestamp = new Date().getTime().toString().trim();

    return `${name}-${timestamp}-${uuid4()}${extension}`;
  }
}
