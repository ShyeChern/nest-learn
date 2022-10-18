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
    .error(() => {
      return new Error('Some Custom Message');
    }),
  breed: Joi.string().required(),
});
