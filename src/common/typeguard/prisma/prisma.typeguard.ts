import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export function isPrismaClientValidationError(
  error: unknown,
): error is PrismaClientValidationError {
  return error instanceof PrismaClientValidationError;
}
export function isPrismaClientKnownRequestError(
  error: unknown,
): error is PrismaClientKnownRequestError {
  return error instanceof PrismaClientKnownRequestError;
}
export function isPrismaClientUnknowRequestError(
  error: unknown,
): error is PrismaClientUnknownRequestError {
  return error instanceof PrismaClientUnknownRequestError;
}
export function isPrismaClientRustPanicError(
  error: unknown,
): error is PrismaClientRustPanicError {
  return error instanceof PrismaClientRustPanicError;
}
export function isClientInitializationError(
  error: unknown,
): error is PrismaClientInitializationError {
  return error instanceof PrismaClientInitializationError;
}
export function isPrismaClientError(error: unknown): boolean {
  return (
    isPrismaClientValidationError(error) ||
    isPrismaClientKnownRequestError(error) ||
    isPrismaClientUnknowRequestError(error) ||
    isPrismaClientRustPanicError(error) ||
    isClientInitializationError(error)
  );
}
