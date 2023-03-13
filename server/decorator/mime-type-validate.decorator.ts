import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';

export function IsOfMimeType(
  property: string[] | string,
  options?: ValidationOptions,
) {
  const allowedMimeTypes = Array.isArray(property) ? property : [property];
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(file) {
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
