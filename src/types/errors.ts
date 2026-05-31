const ERROR_MESSAGES = {
  VALIDATION_BASE:
    'Validation Error: The response returned an unexpected format.',
};

export class ValidationError extends Error {
  constructor() {
    const message = ERROR_MESSAGES.VALIDATION_BASE;
    super(message);
    this.name = 'ValidationError';
  }
}
