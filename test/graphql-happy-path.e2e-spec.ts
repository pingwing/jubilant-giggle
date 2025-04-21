import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import {
  createCharacterMutationQueryString,
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

  it('Happy Path 1: should create a new character', async () => {
    const response1 = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: getAllCharactersQueryString })
      .expect(200);
    const responseBody1 = response1.body as GraphqlResponse;

    expect(responseBody1?.errors).toBeUndefined();
    expect(responseBody1?.data?.characters).toHaveLength(1);

    const response2 = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: createCharacterMutationQueryString })
      .expect(200);
    const responseBody2 = response2.body as GraphqlResponse;

    expect(responseBody2?.errors).toBeUndefined();

    const response3 = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query: getAllCharactersQueryString })
      .expect(200);
    const responseBody3 = response3.body as GraphqlResponse;

    expect(responseBody3?.errors).toBeUndefined();
    expect(responseBody3?.data?.characters).toHaveLength(2);


    // expect(responseBody?.data?.characters).toMatchSnapshot();
  });
});
