const { uuidv4, z } = require('zod');
const { InvalidVehicleSchemaError } = require('./errors');

const VehicleSchema = z.object({
  registrationNumber: z.string().min(1),
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1),
  rentalPrice: z.optional(z.number().min(0)),
});

class Vehicle {
  constructor(registrationNumber, make, model, year, rentalPrice) {
    const result = VehicleSchema.safeParse({
      registrationNumber,
      make,
      model,
      year,
      rentalPrice,
    });

    if (!result.success) {
      throw new InvalidVehicleSchemaError('Invalid schema error');
    }

    this.id = uuidv4();
    this.registrationNumber = result.data.registrationNumber;
    this.make = result.data.make;
    this.model = result.data.model;
    this.year = result.data.year;
    this.rentalPrice = result.data.rentalPrice;
  }

  toJSON() {
    return {
      id: this.id,
      registrationNumber: this.registrationNumber,
      make: this.make,
      model: this.model,
      year: this.year,
      rentalPrice: this.rentalPrice,
    };
  }
}

module.exports = Vehicle;
