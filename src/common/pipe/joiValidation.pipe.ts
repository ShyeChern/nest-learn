import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema: ObjectSchema,
    private type: 1 | 2 = 1,
    private options = {},
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    let error;
    if (this.type === 1) {
      ({ error } = this.schema.validate(value, this.options));
    } else if (this.type === 2) {
      ({ error } = await this.schema.validateAsync(value, this.options));
    }
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}
