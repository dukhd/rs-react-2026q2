const ERROR_MESSAGES = {
  HTTP_BASE: (status: number, text: string) =>
    `HTTP Error ${status}: ${text || 'Something went wrong'}`,
  VALIDATION_BASE:
    'Validation Error: The response returned an unexpected format.',
};

export class HttpError extends Error {
  public status: number;
  public statusText: string;
  constructor(status: number, statusText: string) {
    const message = ERROR_MESSAGES.HTTP_BASE(status, statusText);
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.name = 'HttpError';
  }
}

export class ValidationError extends Error {
  constructor() {
    const message = ERROR_MESSAGES.VALIDATION_BASE;
    super(message);
    this.name = 'ValidationError';
  }
}
