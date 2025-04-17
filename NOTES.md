Choices I needed to make:

1. Using RESTful or GraphQL API:
    In a real app I always prefer GraphQL, especially with the schema-first approach. In a real setting there will be many reasons to have both GraphQL and REST endpoint, but I find using GraphQL to be a better choice for almost any project. Especially with the Apollo Federation. What's also crucial, GraphQL schema makes a great source of truth for data types and a great start for a built-in documentation of the backend. Apollo Studio also have some cool tools for proposed changes to the schema that allows user collaboration.
2. Deciding which data keys are required:
   1. name is defined for all the characters, I made it required
   2. I made episodes required, it can be set to an empty array // TODO: verify
   3. planet is defined only for 1 character ('Leia Organa'), so I made it not required
3. Deciding how many data entities to create: (I've seen similarities to GraphQL docs (https://graphql.org/learn/schema/), but I feel I should allow a full CRUD here, as always a business question and a matter of priorities / I'm a fan of the MoSCoW method)
    1. episodes are using a repeatable sets of titles, made episodes a separate data set
    2. with planets, I guessed that they also should be enumerated, so I created a separate data set for planets, this would be a business question in a real setting
4. Deciding which DB to use:
   1. This is a business question, we should consider expected usage patterns, application load. SQL databases scale great for high read load, but scaling them for huge write throughput can be challenging. NoSQL DBs can archive far better performance in terms of scalability and cost, and for advanced querying you can always have a separate reporting SQL DB used as a read model.
   2. 
