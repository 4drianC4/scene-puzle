import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importar rutas
import userRoutes from './routes/user.routes.js';
import characteresRoutes from './routes/character.routes.js';
import scenesRoutes from './routes/scene.routes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/characters', characteresRoutes);
app.use('/api/scenes', scenesRoutes);

// Ruta de prueba
app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    message: 'API funcionando correctamente',
    status: 'ok',
    timestamp: new Date().toISOString(),
    endpoints: {
      users: '/api/users',
      characters: '/api/characters',
      scenes: '/api/scenes'
    }
  });
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Manejo de errores
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

export default app;
