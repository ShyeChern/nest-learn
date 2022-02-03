import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
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
  age: Joi.number().required(),
  breed: Joi.string().required(),
});

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
