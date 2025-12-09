import prisma from '../config/prisma.js';
import { User } from '@prisma/client';

type CreateUserData = {
  email: string;
  name?: string | null;
  password: string;
};

type UpdateUserData = {
  email?: string;
  name?: string;
};

type UserResponse = Omit<User, 'password'>;

// Obtener todos los usuarios
export const getAllUsers = async (): Promise<UserResponse[]> => {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

// Obtener un usuario por ID
export const getUserById = async (id: string): Promise<UserResponse | null> => {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true
    }
  });
};

// Crear un nuevo usuario
export const createUser = async (userData: CreateUserData): Promise<Omit<UserResponse, 'updatedAt'>> => {
  const { email, name, password } = userData;
  
  return await prisma.user.create({
    data: {
      email,
      name,
      password
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true
    }
  });
};

// Actualizar un usuario
export const updateUser = async (id: string, userData: UpdateUserData): Promise<Pick<UserResponse, 'id' | 'email' | 'name' | 'updatedAt'>> => {
  const { email, name } = userData;
  
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      ...(email && { email }),
      ...(name && { name })
    },
    select: {
      id: true,
      email: true,
      name: true,
      updatedAt: true
    }
  });
};

// Eliminar un usuario
export const deleteUser = async (id: string): Promise<User> => {
  return await prisma.user.delete({
    where: { id: parseInt(id) }
  });
};

// Verificar si un email ya existe
export const checkEmailExists = async (email: string): Promise<boolean> => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true }
  });
  return !!user;
};
