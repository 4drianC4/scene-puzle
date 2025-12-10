import { Request, Response } from 'express';
import * as sceneService from '../services/scene.service.js';
import { Prisma } from '@prisma/client';

export const getScenes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const scenes = await sceneService.getAllScenes();
    res.json(scenes);
  } catch (error) {
    console.error('Error al obtener escenas:', error);
    res.status(500).json({ error: 'Error al obtener escenas', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export const getSceneById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const scene = await sceneService.getSceneById(id);
    
    if (!scene) {
      res.status(404).json({ error: 'Escena no encontrada' });
      return;
    }
    
    res.json(scene);
  } catch (error) {
    console.error('Error al obtener escena:', error);
    res.status(500).json({ error: 'Error al obtener escena', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export const createScene = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image } = req.body;
    
    const scene = await sceneService.createScene({ title, description, image });
    res.status(201).json(scene);
  } catch (error) {
    console.error('Error al crear escena:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      res.status(400).json({ error: 'El título de la escena ya existe' });
      return;
    }
    res.status(500).json({ error: 'Error al crear escena', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export const updateScene = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    
    const scene = await sceneService.updateScene(id, { title, description, image });
    res.json(scene);
  } catch (error) {
    console.error('Error al actualizar escena:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ error: 'Escena no encontrada' });
      return;
    }
    res.status(500).json({ error: 'Error al actualizar escena', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}

export const deleteScene = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    await sceneService.deleteScene(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar escena:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      res.status(404).json({ error: 'Escena no encontrada' });
      return;
    }
    res.status(500).json({ error: 'Error al eliminar escena', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}