import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'devsactum-landing-api',
      timestamp: new Date().toISOString(),
    };
  }

  getStatus() {
    return {
      service: 'DevSactum Landing API',
      version: '1.0.0',
      company: 'Dräkkar Labs',
      backends: {
        nestjs: { port: 3001, status: 'running' },
        go: { port: 8000, status: 'microservice' },
      },
    };
  }
}
