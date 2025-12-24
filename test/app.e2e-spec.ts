import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        if (!res.body.success) throw new Error('Success should be true');
        if (res.body.data.status !== 'ok') throw new Error('Status not ok');
      });
  });

  it('/health/secure (GET) - Unauthorized', () => {
    return request(app.getHttpServer())
      .get('/health/secure')
      .expect(401);
  });
});
