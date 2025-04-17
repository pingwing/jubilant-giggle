import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CharactersModule } from './characters/characters.module';
import { EpisodesModule } from './episodes/episodes.module';
import { PlanetsModule } from './planets/planets.module';

const localEnvironment = process.env.ENVIRONMENT === 'LOCAL';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: localEnvironment ? true : false,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    CharactersModule,
    EpisodesModule,
    PlanetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
