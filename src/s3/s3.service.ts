import { Injectable, NotFoundException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { MimeType } from 'aws-sdk/clients/kendra';
import SendData = ManagedUpload.SendData;
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET,
      region: 'eu-north-1',
      signatureVersion: 'v4',
    });

    const bucket = process.env.S3_BUCKET_NAME;
    if(!bucket) throw new NotFoundException('bucketName is missing');
    this.bucketName = bucket;
  }

  async getPresignedUrl(key: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: 3600,
    };

    try {
      const url1 = await this.s3.getSignedUrlPromise('getObject', params);
      if(!url1) throw new NotFoundException('url is missing');
      const url = url1;
      return url;
    } catch (error) {
      console.log(
        `failed to get presigned URL for key ${key}`,
      error.stack,  
      );
      throw new NotFoundException('error');
    }
  }

  async upload({
    file,
    bucket,
    name,
    mimeType,
  }: {
    file: Buffer;
    name: string;
    mimeType: MimeType;
    bucket?: string;
  }): Promise<SendData> {
    const params = {
      Bucket: bucket || this.bucketName,
      Key: String(name),
      Body: file,
      ContentType: mimeType,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-north-1',
      },
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log('could not upload file to s3', {e, name, mimeType});
      throw e;
    }
  }
}

