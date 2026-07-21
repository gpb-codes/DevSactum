import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Minio from 'minio'

@Injectable()
export class StorageService implements OnModuleInit {
  private client: Minio.Client
  private bucket: string

  constructor(private readonly config: ConfigService) {
    this.client = new Minio.Client({
      endPoint: this.config.get('MINIO_ENDPOINT', 'localhost').split(':')[0],
      port: Number(this.config.get('MINIO_ENDPOINT', 'localhost:9000').split(':')[1] || '9000'),
      useSSL: false,
      accessKey: this.config.get('MINIO_ACCESS_KEY', 'devsactum'),
      secretKey: this.config.get('MINIO_SECRET_KEY', 'devsactum'),
    })
    this.bucket = this.config.get('MINIO_BUCKET', 'devsactum-files')
  }

  async onModuleInit() {
    const exists = await this.client.bucketExists(this.bucket)
    if (!exists) {
      await this.client.makeBucket(this.bucket)
    }
  }

  async uploadFile(fileName: string, buffer: Buffer, mimeType: string) {
    await this.client.putObject(this.bucket, fileName, buffer, buffer.length, { 'Content-Type': mimeType })
    return `http://${this.config.get('MINIO_PUBLIC_URL', 'localhost:9000')}/${this.bucket}/${fileName}`
  }

  async getFile(fileName: string) {
    return this.client.getObject(this.bucket, fileName)
  }

  async deleteFile(fileName: string) {
    await this.client.removeObject(this.bucket, fileName)
  }

  getBucket() {
    return this.bucket
  }
}
