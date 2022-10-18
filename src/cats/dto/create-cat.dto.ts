import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: 'The age of a cat',
    minimum: 1,
    default: 1,
  })
  age: number;

  @ApiProperty()
  breed: string;
}

export const createCatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number()
    .required()
    .error(new Error('Some Custom Message'))
    .external((value) => {
      if (Math.random() < 0.5) {
        throw new Error('Random Error');
      }
      return value;
    }),
  breed: Joi.string().required(),
});
