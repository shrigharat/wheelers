const express = require('express');
const vehicleService = require('./src/services/vehicle-service');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(express.json());

vehicleService.seed();

const logger = (req, res, next) => {
  console.log(`Request to: ${req.method} ${req.url}`);
  next();
};

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/vehicles', vehicleService.create);

app.get('/vehicles/:id', vehicleService.get);

app.put('/vehicles/:id', vehicleService.update);

app.delete('/vehicles/:id', (req, res) => {
  res.send(`Vehicle ${req.params.id} deleted`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
