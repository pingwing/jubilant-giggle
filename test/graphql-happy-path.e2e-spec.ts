import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import {
  createCharacterMutationQueryString,
  getAllCharactersQueryString,
  GraphqlResponse,
  updateCharacterMutationQueryString,
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
    // STEP 1: get all characters to check the starting state
    const server = app.getHttpServer();
    const response1 = await request(server)
      .post('/graphql')
      .send({ query: getAllCharactersQueryString })
      .expect(200);
    const responseBody1 = response1.body as GraphqlResponse;
    expect(responseBody1?.errors).toBeUndefined();
    expect(responseBody1?.data?.characters).toHaveLength(7);

    // STEP 2: add a new character
    const response2 = await request(server)
      .post('/graphql')
      .send({ query: createCharacterMutationQueryString })
      .expect(200);
    const responseBody2 = response2.body as GraphqlResponse;
    expect(responseBody2?.errors).toBeUndefined();
    const newlyCreatedCharacterId = (
      responseBody2?.data?.createCharacter as { id: string }
    ).id;
    expect(newlyCreatedCharacterId).toBeDefined();

    // STEP 3: get all characters to confirm the new character was added
    const response3 = await request(server)
      .post('/graphql')
      .send({ query: getAllCharactersQueryString })
      .expect(200);
    const responseBody3 = response3.body as GraphqlResponse;
    expect(responseBody3?.errors).toBeUndefined();
    expect(responseBody3?.data?.characters).toHaveLength(8);

    // STEP 4: update name of newly created character
    const newCharacterName = 'Jens Maul';
    const response4 = await request(server)
      .post('/graphql')
      .send({
        query: updateCharacterMutationQueryString,
        variables: { idToUpdate: newlyCreatedCharacterId, newCharacterName },
      })
      .expect(200);
    const responseBody4 = response4.body as GraphqlResponse;
    expect(responseBody4?.errors).toBeUndefined();

    // STEP 5: get all characters to confirm that the character was renamed
    const response5 = await request(server)
      .post('/graphql')
      .send({ query: getAllCharactersQueryString })
      .expect(200);
    const responseBody5 = response5.body as GraphqlResponse;
    expect(responseBody5?.errors).toBeUndefined();
    expect(responseBody5?.data?.characters).toHaveLength(8);
    expect(
      (responseBody5?.data?.characters as { name: string }[])[7].name,
    ).toEqual(newCharacterName);
  });
});
