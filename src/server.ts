import app from './app.js';

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
