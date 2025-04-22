import gql from 'graphql-tag';

export type GraphqlResponse =
  | {
      errors?: readonly object[] | undefined;
      data?: Record<string, unknown> | null | undefined;
      extensions?: Record<string, unknown> | undefined;
    }
  | undefined;

const getAllCharactersQuery = gql`
  query GetAllCharacters {
    characters {
      id
      name
      episodes {
        name
      }
      planet {
        name
      }
    }
  }
`;
export const getAllCharactersQueryString =
  getAllCharactersQuery.loc?.source.body;
