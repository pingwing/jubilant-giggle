import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
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

  it('Happy Path 1: should create a new character', () => {
    return request(app.getHttpServer())
      .post(
        '/graphql?query=mutation{createCharacter(name:"test",age:10,gender:"male"){id,name,age,gender}}',
      )
      .expect(200)
      .expect('All good!');
  });
});
