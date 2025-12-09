import prisma from '../config/prisma.js';
import { Character } from '@prisma/client';

type CreateCharacterData = {
    name: string;
    image: string;
    description?: string | null;
    sceneId: number;
};

export const getAllCharacters = async (): Promise<Character[]> => {
    return await prisma.character.findMany({
        select : {
            id: true,
            name: true,
            image: true,
            description: true,
            sceneId: true,
            createdAt: true,
            updatedAt: true
        }
    });
};

export const getCharacterById = async (id: string): Promise<Character | null> => {
    return await prisma.character.findUnique({
        where: { id: parseInt(id) },
        select : {
            id: true,
            name: true,
            image: true,
            description: true,
            sceneId: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const createCharacter = async (characterData: CreateCharacterData): Promise<Character> => {
    const { name, image, description, sceneId } = characterData;

    return await prisma.character.create({
        data: {
            name,
            image,
            description,
            sceneId
        },
        select : {
            id: true,
            name: true,
            image: true,
            description: true,
            sceneId: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const updateCharacter = async (id: string, characterData: Partial<CreateCharacterData>): Promise<Character> => {
    return await prisma.character.update({
        where: { id: parseInt(id) },
        data: characterData,
        select : {
            id: true,
            name: true,
            image: true,
            description: true,
            sceneId: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const deleteCharacter = async (id: string): Promise<Character> => {
    return await prisma.character.delete({
        where: { id: parseInt(id) }
    });
}