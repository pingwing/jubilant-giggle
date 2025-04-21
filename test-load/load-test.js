module.exports = {
  config: {
    target: 'http://localhost:3000',
    phases: [
      {
        name: 'Warm up',
        duration: 10, // Total load test duration in seconds
        arrivalRate: 5, // Number of scenarios to start per second
      },
      {
        name: 'Stress test',
        duration: 20, // Total load test duration in seconds
        arrivalRate: 5, // Number of scenarios to start per second at the beginning of the phase
        rampTo: 200 // Requests per second during the ramp up phase
      },
    ],
  },
  scenarios: [
    {
      name: 'List all characters',
      flow: [
        {
          post: {
            url: '/graphql',
            headers: { 'Content-Type': 'application/json' },
            json: {
              query: `
query {
  characters {
    id
    name
  }
}`,
            },
          },
        },
      ],
    },
    {
      name: 'Create a character',
      flow: [
        {
          post: {
            url: '/graphql',
            headers: { 'Content-Type': 'application/json' },
            json: {
              query: `
mutation {
  createCharacter(createCharacterInput: { name: "TestCharacter" }) {
    id
    name
  }
}`,
            },
          },
        },
      ],
    },
  ],
};
