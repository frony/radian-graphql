import { allCars } from './all-cars.mock';

export class MockCarsRepository {
  private allCars = allCars;

  findAll() {
    return [...this.allCars];
  }

  async findOne(id: number) {
    const carIndex = this.allCars.findIndex(
      (car) => car.VehicleID === id.toString(),
    );
    const car = this.allCars[carIndex];
    return Promise.resolve(car);
  }
}
