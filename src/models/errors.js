const { uuidv4, z } = require('zod');

class InvalidVehicleSchemaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidVehicleSchemaError';
  }
}

module.exports = {
  InvalidVehicleSchemaError,
};
