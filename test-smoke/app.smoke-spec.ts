import * as request from 'supertest';
import {
  getAllCharactersQueryString,
  GraphqlResponse,
} from './graphql-documents';

// const appUrl = 'http://localhost:3000';
const appUrl =
  'http://main-graphql-alb-2125808656.eu-central-1.elb.amazonaws.com';

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request(appUrl).get('/').expect(200).expect('All good!');
  });

  it('should get all characters', async () => {
    const response = await request(appUrl)
      .post('/graphql')
      .send({ query: getAllCharactersQueryString })
      .expect(200);
    const responseBody = response.body as GraphqlResponse;

    expect(responseBody?.errors).toBeUndefined();
    const characters = responseBody?.data?.characters as [];
    expect(characters.length > 0).toEqual(true);
  });
});
