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

const createCharacterMutation = gql`
  mutation {
    createCharacter(createCharacterInput: { name: "Darth Vader" }) {
      id
      name
    }
  }
`;
export const createCharacterMutationQueryString =
  createCharacterMutation.loc?.source.body;

const updateCharacterMutation = gql`
  mutation UpdateCharacter($idToUpdate: ID!, $newCharacterName: String!) {
    updateCharacter(
      updateCharacterInput: { id: $idToUpdate, name: $newCharacterName }
    ) {
      id
      name
    }
  }
`;
export const updateCharacterMutationQueryString =
  updateCharacterMutation.loc?.source.body;
