# Scene Puzzle - Express + Prisma (MVC)

Proyecto Express con Prisma siguiendo la arquitectura MVC (Modelo-Vista-Controlador).

## Estructura del Proyecto

```
scene-puzle/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos
├── src/
│   ├── config/
│   │   └── prisma.js          # Configuración de Prisma Client
│   ├── controllers/
│   │   └── user.controller.js # Lógica de negocio de usuarios
│   ├── routes/
│   │   └── user.routes.js     # Rutas de la API
│   ├── middlewares/           # Middlewares personalizados
│   ├── app.js                 # Configuración de Express
│   └── server.js              # Punto de entrada
├── .env                       # Variables de entorno
├── .env.example               # Ejemplo de variables de entorno
├── .gitignore
└── package.json
```

## Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL instalado y corriendo (o Docker para usar docker-compose)
- npm o yarn
- Docker y Docker Compose (opcional)

## 🐳 Ejecución con Docker (Recomendado)

### Desarrollo con Docker

Usar solo la base de datos con Docker y el servidor local:

```bash
# Iniciar PostgreSQL en Docker
docker-compose -f docker-compose.dev.yml up -d

# La base de datos estará en: postgresql://postgres:postgres@localhost:5432/scene_puzle_dev

# En otra terminal, ejecutar el servidor localmente
npm install
npm run prisma:migrate
npm run dev
```

### Producción con Docker

Ejecutar toda la aplicación (servidor + base de datos) en Docker:

```bash
# Construir e iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# La aplicación estará en: http://localhost:3000
```

**Comandos útiles de Docker:**
```bash
# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (⚠️ elimina datos)
docker-compose down -v

# Reconstruir la imagen
docker-compose up -d --build

# Ver estado de los contenedores
docker-compose ps
```

## Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
   
   Edita el archivo `.env` con tu configuración de base de datos:
   ```
   DATABASE_URL="postgresql://usuario:password@localhost:5432/scene_puzle?schema=public"
   PORT=3000
   ```

3. **Crear y migrar la base de datos:**
```bash
npm run prisma:migrate
```

4. **Generar el cliente de Prisma:**
```bash
npm run prisma:generate
```

## Ejecutar el Proyecto

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

## API Endpoints

### Usuarios

- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener un usuario por ID
- `POST /api/users` - Crear un nuevo usuario
  ```json
  {
    "email": "usuario@example.com",
    "name": "Nombre Usuario",
    "password": "password123"
  }
  ```
- `PUT /api/users/:id` - Actualizar un usuario
- `DELETE /api/users/:id` - Eliminar un usuario

## Prisma Commands

- `npm run prisma:migrate` - Crear y aplicar migraciones
- `npm run prisma:studio` - Abrir Prisma Studio (interfaz gráfica)
- `npm run prisma:generate` - Generar el cliente de Prisma

## Arquitectura MVC

- **Modelos (Models):** Definidos en `prisma/schema.prisma`
- **Vistas (Views):** API REST (JSON responses)
- **Controladores (Controllers):** Lógica de negocio en `src/controllers/`
- **Rutas (Routes):** Definición de endpoints en `src/routes/`

## Próximos Pasos

1. Configura tu base de datos PostgreSQL
2. Actualiza el archivo `.env` con tus credenciales
3. Ejecuta las migraciones de Prisma
4. Personaliza el modelo `User` en `schema.prisma` según tus necesidades
5. Añade más modelos, controladores y rutas según tu proyecto

## Tecnologías

- **Express.js** - Framework web
- **Prisma** - ORM para Node.js
- **PostgreSQL** - Base de datos
- **TypeScript** - Tipado estático
- **Docker** - Contenedorización
- **dotenv** - Variables de entorno
- **cors** - Configuración CORS

## 📦 Archivos Docker

- `docker-compose.yml` - Configuración completa para producción (app + db)
- `docker-compose.dev.yml` - Solo PostgreSQL para desarrollo local
- `Dockerfile` - Imagen de la aplicación Node.js
- `.dockerignore` - Archivos excluidos del build de Docker

## 🚀 Deployment

Para desplegar en **Dokploy con Nixpacks**, consulta la guía completa en [DEPLOYMENT.md](./DEPLOYMENT.md)

**Archivos de deployment:**
- `nixpacks.toml` - Configuración de Nixpacks
- `start.sh` - Script de inicio con migraciones
- `.env.production` - Template de variables de entorno
