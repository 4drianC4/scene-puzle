import { Request, Response } from "express";
import * as characterService from "../services/character.service.js";
import { Prisma } from "@prisma/client";

export const getCharacters = async ( _req : Request, res : Response ): Promise<void> => {
    try {
        const characters = await characterService.getAllCharacters();
        res.json(characters);
    } catch ( error ) {
        res.status( 500 ).json( { error: "Error al obtener personajes" } );
    }
};

export const getCharacterById = async ( req : Request, res : Response ): Promise<void> => {
    try {
        const { id } = req.params;
        const character = await characterService.getCharacterById( id );

        if ( !character ) {
            res.status( 404 ).json( { error: "Personaje no encontrado" } );
            return;
        }

        res.json( character );
    } catch ( error ) {
        res.status( 500 ).json( { error: "Error al obtener personaje" } );
    }
}; 

export const createCharacter = async ( req : Request, res : Response ): Promise<void> => {
    try {
        const { name, image, description, sceneId } = req.body;
        const character = await characterService.createCharacter( { name, image, description, sceneId } );
        res.status( 201 ).json( character );
    } catch ( error ) {
        if ( error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002" ) {
            res.status( 400 ).json( { error: "El nombre del personaje ya existe" } );
            return;
        }
        res.status( 500 ).json( { error: "Error al crear personaje" } );
    }
};

export const updateCharacter = async ( req : Request, res : Response ): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, image, description, sceneId } = req.body;

        const character = await characterService.updateCharacter( id, { name, image, description, sceneId } );
        res.json( character );
    } catch ( error ) {
        if ( error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025" ) {
            res.status( 404 ).json( { error: "Personaje no encontrado" } );
            return;
        }
        res.status( 500 ).json( { error: "Error al actualizar personaje" } );
    }
};

export const deleteCharacter = async ( req : Request, res : Response ): Promise<void> => {
    try {
        const { id } = req.params;
        await characterService.deleteCharacter( id );
        res.status( 204 ).send();
    } catch ( error ) {
        if ( error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025" ) {
            res.status( 404 ).json( { error: "Personaje no encontrado" } );
            return;
        }
        res.status( 500 ).json( { error: "Error al eliminar personaje" } );
    }
}