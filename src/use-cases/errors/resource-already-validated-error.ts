export class ResourceAlreadyValidatedError extends Error {
  constructor() {
    super('Resource already validated.')
  }
}
