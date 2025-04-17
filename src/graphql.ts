
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateEpisodeInput {
    exampleField?: Nullable<number>;
}

export interface UpdateEpisodeInput {
    id: number;
}

export interface CreatePlanetInput {
    exampleField?: Nullable<number>;
}

export interface UpdatePlanetInput {
    id: number;
}

export interface Character {
    id: string;
    name: string;
}

export interface IQuery {
    characters(): Nullable<Character>[] | Promise<Nullable<Character>[]>;
    character(id: number): Nullable<Character> | Promise<Nullable<Character>>;
    episodes(): Nullable<Episode>[] | Promise<Nullable<Episode>[]>;
    episode(id: number): Nullable<Episode> | Promise<Nullable<Episode>>;
    planets(): Nullable<Planet>[] | Promise<Nullable<Planet>[]>;
    planet(id: number): Nullable<Planet> | Promise<Nullable<Planet>>;
}

export interface Episode {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface IMutation {
    createEpisode(createEpisodeInput: CreateEpisodeInput): Episode | Promise<Episode>;
    updateEpisode(updateEpisodeInput: UpdateEpisodeInput): Episode | Promise<Episode>;
    removeEpisode(id: number): Nullable<Episode> | Promise<Nullable<Episode>>;
    createPlanet(createPlanetInput: CreatePlanetInput): Planet | Promise<Planet>;
    updatePlanet(updatePlanetInput: UpdatePlanetInput): Planet | Promise<Planet>;
    removePlanet(id: number): Nullable<Planet> | Promise<Nullable<Planet>>;
}

export interface Planet {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;
