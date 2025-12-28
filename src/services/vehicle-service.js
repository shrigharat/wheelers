const { success } = require('zod');
const seedData = require('../data/seed-data');
const { InvalidVehicleSchemaError } = require('../models/errors');
const Vehicle = require('../models/vehicle');

const vehiclesList = [];

function seed() {
  vehiclesList.push(...seedData);
}

const get = (req, res) => {
  const vehicleId = req.params.id;
  for (let i = 0; i < vehiclesList.length; i++) {
    const currentVehicle = vehiclesList[i];
    if (currentVehicle.id === vehicleId) {
      return res.json({
        data: currentVehicle,
        success: true,
      });
    }
  }

  return res.status(404).json({
    message: 'Could hot find the resource with specified ID',
    success: false,
  });
};

const create = (req, res) => {
  try {
    const vehicle = new Vehicle(
      req.body.registrationNumber,
      req.body.make,
      req.body.model,
      req.body.year,
      req.body.rentalPrice
    );
    vehiclesList.push(vehicle);
    return res.status(201).json({
      data: vehicle,
      success: true,
    });
  } catch (error) {
    if (error instanceof InvalidVehicleSchemaError) {
      return res.status(400).json({
        message: error.message,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: 'Failed to create vehicle',
        success: false,
      });
    }
  }
};

function update(req, res) {
  try {
    const vehicleId = req.params.id;
    const index = vehiclesList.findIndex((v) => v.id === vehicleId);
    if (index === -1) {
      return res.status(404).json({
        message: 'Could not find requested resource',
        success: false,
      });
    }
    const vehicleBody = req.body;
    const oldVehicleData = vehiclesList[index];
    const newVehicleData = {
      ...oldVehicleData,
      ...vehicleBody,
    };
    vehiclesList[index] = newVehicleData;
    return res.status(200).json({
      message: 'Updated resource successfully',
      success: true,
    });
  } catch (error) {
    return res.status(200).json({
      message: 'Failed to update requested resource',
      success: false,
    });
  }
}

module.exports = {
  seed,
  get,
  create,
  update,
};
