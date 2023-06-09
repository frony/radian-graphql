import { registerEnumType } from '@nestjs/graphql';

export enum CarMake {
  ACURA = 'Acura',
  ALFA_ROMEO = 'Alfa Romeo',
  ASTON_MARTIN = 'Aston Martin',
  AUDI = 'Audi',
  BENTLEY = 'Bentley',
  BMW = 'BMW',
  BUGATTI = 'Bugatti',
  BUICK = 'Buick',
  CADILLAC = 'Cadillac',
  CHEVROLET = 'Chevrolet',
  CHRYSLER = 'Chrysler',
  CITROEN = 'Citroen',
  DODGE = 'Dodge',
  FERRARI = 'Ferrari',
  FIAT = 'Fiat',
  FORD = 'Ford',
  GENESIS = 'Genesis',
  GMC = 'GMC',
  HONDA = 'Honda',
  HYUNDAI = 'Hyundai',
  INFINITI = 'Infiniti',
  JAGUAR = 'Jaguar',
  JEEP = 'Jeep',
  KIA = 'Kia',
  KOENIGSEGG = 'Koenigsegg',
  LAMBORGHINI = 'Lamborghini',
  LAND_ROVER = 'Land Rover',
  LEXUS = 'Lexus',
  LINCOLN = 'Lincoln',
  LOTUS = 'Lotus',
  MASERATI = 'Maserati',
  MAZDA = 'Mazda',
  MCLAREN = 'McLaren',
  MERCEDES_BENZ = 'Mercedes-Benz',
  MINI = 'Mini',
  MITSUBISHI = 'Mitsubishi',
  NISSAN = 'Nissan',
  PAGANI = 'Pagani',
  PEUGEOT = 'Peugeot',
  PININFARINA = 'Pininfarina',
  PORSCHE = 'Porsche',
  RAM = 'Ram',
  ROLLS_ROYCE = 'Rolls-Royce',
  SUBARU = 'Subaru',
  TESLA = 'Tesla',
  TOYOTA = 'Toyota',
  TUCKER = 'Tucker',
  VOLKSWAGEN = 'Volkswagen',
  VOLVO = 'Volvo',
  OTHER = 'Other',
}

registerEnumType(CarMake, {
  name: 'CarMake',
});
