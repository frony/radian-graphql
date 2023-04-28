import { registerEnumType } from '@nestjs/graphql';

export enum CarColor {
  BLACK = 'Black',
  WHITE = 'White',
  BLUE = 'Blue',
  SILVER = 'Silver',
  GOLD = 'Gold',
  RED = 'Red',
  GREEN = 'Green',
  YELLOW = 'Yellow',
  BROWN = 'Brown',
  OTHER = 'Other',
}

registerEnumType(CarColor, {
  name: 'CarColor',
});
