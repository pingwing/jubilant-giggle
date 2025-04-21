import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import {
  getAllCharactersQueryString,
  GraphqlResponse,
} from './graphql-documents';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get all characters', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: getAllCharactersQueryString })
      .expect(200);
    const responseBody = response.body as GraphqlResponse;

    expect(responseBody?.errors).toBeUndefined();
    expect(responseBody?.data?.characters).toMatchSnapshot();
  });

  // it('Happy Path 1: should create a new character', async () => {
  //   const response = await request(app.getHttpServer())
  //     .post('/graphql')
  //     .send({ query: getAllCharactersQueryString })
  //     .expect(200);
  //   const responseBody = response.body as GraphqlResponse;
  //
  //   expect(responseBody?.errors).toBeUndefined();
  //   expect(responseBody?.data?.characters).toMatchSnapshot();
  // });
});
