import prisma from "../config/prisma.js";
import { Scene } from "@prisma/client";

type CreateSceneData = {
    title: string;
    description?: string | null;
    image: string;
};

export const getAllScenes = async (): Promise<Scene[]> => {
    return await prisma.scene.findMany({
        select : {
            id: true,
            title: true,
            description: true,
            image: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const getSceneById = async (id: string): Promise<Scene | null> => {
    return await prisma.scene.findUnique({
        where: { id: parseInt(id) },
        select : {
            id: true,
            title: true,
            description: true,
            image: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const createScene = async (sceneData: CreateSceneData): Promise<Scene> => {
    const { title, description, image } = sceneData;

    return await prisma.scene.create({
        data: {
            title,
            description,
            image
        },
        select : {
            id: true,
            title: true,
            description: true,
            image: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const updateScene = async (id: string, sceneData: Partial<CreateSceneData>): Promise<Scene> => {
    const { title, description, image } = sceneData;

    return await prisma.scene.update({
        where: { id: parseInt(id) },
        data: {
            title,
            description,
            image
        },
        select : {
            id: true,
            title: true,
            description: true,
            image: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const deleteScene = async (id: string): Promise<Scene> => {
    return await prisma.scene.delete({
        where: { id: parseInt(id) }
    });
}