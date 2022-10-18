import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  private options = {
    errors: {
      label: false as const,
    },
  };
  constructor(
    private schema: ObjectSchema,
    private type: 1 | 2 = 1,
    private extraOptions = {},
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    let error;
    if (this.type === 1) {
      ({ error } = this.schema.validate(value, {
        ...this.options,
        ...this.extraOptions,
      }));
    } else if (this.type === 2) {
      try {
        await this.schema.validateAsync(value, {
          ...this.options,
          ...this.extraOptions,
        });
      } catch (e) {
        error = e;
      }
    }
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}
