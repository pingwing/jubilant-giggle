
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    characters(): Nullable<Nullable<Character>[]> | Promise<Nullable<Nullable<Character>[]>>;
    character(id: string): Nullable<Character> | Promise<Nullable<Character>>;
    episodes(): Nullable<Nullable<Episode>[]> | Promise<Nullable<Nullable<Episode>[]>>;
    episode(id: string): Nullable<Episode> | Promise<Nullable<Episode>>;
    planets(): Nullable<Nullable<Planet>[]> | Promise<Nullable<Nullable<Planet>[]>>;
    planet(id: string): Nullable<Planet> | Promise<Nullable<Planet>>;
}

export interface Character {
    id: string;
    name: string;
    episodes?: Nullable<Nullable<Episode>[]>;
    planet?: Nullable<Planet>;
}

export interface Episode {
    id: string;
    name: string;
}

export interface Planet {
    id: string;
    name: string;
}

type Nullable<T> = T | null;
