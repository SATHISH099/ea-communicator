import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsOfMimeType(
  property: {
    type: string[] | string;
    isMultiple?: boolean;
  },
  options?: ValidationOptions,
) {
  const allowedMimeTypes = Array.isArray(property.type)
    ? property.type
    : [property.type];
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(file) {
          if (property.isMultiple) {
            return file.some((f: any) => allowedMimeTypes.includes(f.type));
          }

          return allowedMimeTypes.includes(file.type);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} mime type must be ${allowedMimeTypes.join(
            ', ',
          )}`;
        },
      },
    });
  };
}
