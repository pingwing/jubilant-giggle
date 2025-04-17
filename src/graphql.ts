
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateCharacterInput {
    name: string;
}

export class CreateEpisodeInput {
    name: string;
}

export class UpdateEpisodeInput {
    id: string;
    name: string;
}

export class CreatePlanetInput {
    exampleField?: Nullable<number>;
}

export class UpdatePlanetInput {
    id: number;
}

export class Character {
    id: string;
    name: string;
    episodes: Episode[];
}

export abstract class IQuery {
    abstract characters(): Nullable<Character>[] | Promise<Nullable<Character>[]>;

    abstract character(id: string): Nullable<Character> | Promise<Nullable<Character>>;

    abstract episodes(): Nullable<Episode>[] | Promise<Nullable<Episode>[]>;

    abstract episode(id: string): Nullable<Episode> | Promise<Nullable<Episode>>;

    abstract planets(): Nullable<Planet>[] | Promise<Nullable<Planet>[]>;

    abstract planet(id: number): Nullable<Planet> | Promise<Nullable<Planet>>;
}

export abstract class IMutation {
    abstract createCharacter(createCharacterInput: CreateCharacterInput): Character | Promise<Character>;

    abstract createEpisode(createEpisodeInput: CreateEpisodeInput): Episode | Promise<Episode>;

    abstract updateEpisode(updateEpisodeInput: UpdateEpisodeInput): Episode | Promise<Episode>;

    abstract removeEpisode(id: string): Nullable<Episode> | Promise<Nullable<Episode>>;

    abstract createPlanet(createPlanetInput: CreatePlanetInput): Planet | Promise<Planet>;

    abstract updatePlanet(updatePlanetInput: UpdatePlanetInput): Planet | Promise<Planet>;

    abstract removePlanet(id: number): Nullable<Planet> | Promise<Nullable<Planet>>;
}

export class Episode {
    id: string;
    name: string;
}

export class Planet {
    id: string;
    name: string;
}

export class CreatedMetadata {
    createdAt: string;
}

export class UpdatedMetadata {
    updatedAt: string;
}

type Nullable<T> = T | null;
