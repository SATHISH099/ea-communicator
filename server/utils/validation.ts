import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
export * from 'class-validator';

type ErrorMessage = string | Error;
interface AppError {
  name: string;
  error: ErrorMessage;
}
type Errors = AppError[];

const getErrorMessage = (error: any) => {
  let errorMessage = '';
  if (error.children?.length > 0) {
    errorMessage = getErrorMessage(error.children[0]);
  }
  if (error.constraints) {
    errorMessage = Object.values(error.constraints)[0] as string;
  }
  return errorMessage;
};

export const mapErrors = (errors: any[]) => {
  const errMsg: Errors = [];
  errors.forEach((err) => {
    errMsg.push({
      name: err.property,
      error: getErrorMessage(err),
    });
  });
  return errMsg;
};

export const validationPipe = async (
  schema: new () => {},
  requestObject: object,
) => {
  const transformedClass: any = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass);
  if (errors.length > 0) {
    throw createError({
      statusCode: 400,
      message: 'Please fix all the validations errors.',
      data: mapErrors(errors),
    });
  }

  return true;
};
