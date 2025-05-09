# Star Wars

Nest.js based backend for cataloging Star Wars characters. The backend is available through GraphQl.

## App demo
I deployed the app at:
```http://main-graphql-alb-2125808656.eu-central-1.elb.amazonaws.com```

The GraphQL endpoint is at:
```http://main-graphql-alb-2125808656.eu-central-1.elb.amazonaws.com/graphql```

You can test it using any GraphQL client. I added some example requests for Bruno (open source alternative to Postman, https://www.usebruno.com/).

## Running the app

The app expects node version 22. I'm using v22.14.0. Check your node version using `node -v`.

Start the setup by installing packages in the main app directory:

```
npm install
```

Then run the project using:

```
npm run start
```

App starts a local graphQl server on http://localhost:3000/graphql.

## Getting the data

Go to http://localhost:3000/graphql and run this query:

```
query GetCharactersPaginated {
  characters(getCharactersInput: { first: 20, after: 0  }) {
    name
    episodes {
      name
    }
    planet {
      name
    }
  }
}
```

It returns this dataset:

```
{
  "data": {
    "characters": [
      {
        "name": "Luke Skywalker",
        "episodes": [
          {
            "name": "NEWHOPE"
          },
          {
            "name": "EMPIRE"
          },
          {
            "name": "JEDI"
          }
        ],
        "planet": null
      },
      {
        "name": "Darth Vader",
        "episodes": [
          {
            "name": "NEWHOPE"
          },
          {
            "name": "EMPIRE"
          },
          {
            "name": "JEDI"
          }
        ],
        "planet": null
      },
      {
        "name": "Han Solo",
        "episodes": [
          {
            "name": "NEWHOPE"
          },
          {
            "name": "EMPIRE"
          },
          {
            "name": "JEDI"
          }
        ],
        "planet": null
      },
      {
        "name": "Leia Organa",
        "episodes": [
          {
            "name": "NEWHOPE"
          },
          {
            "name": "EMPIRE"
          },
          {
            "name": "JEDI"
          }
        ],
        "planet": {
          "name": "Alderaan"
        }
      },
      {
        "name": "Wilhuff Tarkin",
        "episodes": [
          {
            "name": "NEWHOPE"
          }
        ],
        "planet": null
      },
      {
        "name": "C-3PO",
        "episodes": [
          {
            "name": "NEWHOPE"
          },
          {
            "name": "EMPIRE"
          },
          {
            "name": "JEDI"
          }
        ],
        "planet": null
      },
      {
        "name": "R2-D2",
        "episodes": [
          {
            "name": "NEWHOPE"
          },
          {
            "name": "EMPIRE"
          },
          {
            "name": "JEDI"
          }
        ],
        "planet": null
      }
    ]
  }
}
```

Available GraphQl queries:

```
characters: [Character]!
character(id: ID!): Character
episodes: [Episode]!
episode(id: ID!): Episode
planets: [Planet]!
planet(id: ID!): Planet
```

Available mutations

```
createCharacter(createCharacterInput: CreateCharacterInput!): Character!
updateCharacter(updateCharacterInput: UpdateCharacterInput!): Character!
removeCharacter(id: ID!): Character
createEpisode(createEpisodeInput: CreateEpisodeInput!): Episode!
updateEpisode(updateEpisodeInput: UpdateEpisodeInput!): Episode!
removeEpisode(id: ID!): Episode
createPlanet(createPlanetInput: CreatePlanetInput!): Planet!
updatePlanet(updatePlanetInput: UpdatePlanetInput!): Planet!
removePlanet(id: ID!): Planet
```

## Running on production
My recommended approach would be building the app (npm run build), packaging it as a docker image and running the docker image on Amazon ECS. I added smoke tests to verify the app is working.

## Author

Przemysław Gierski
