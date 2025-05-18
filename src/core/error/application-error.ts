export class ApplicationError extends Error {

  private errorNumber: number;
  constructor(errorNumber: number, message: string) {
    super(message);
    this.errorNumber = errorNumber;
  }

  get ErrorNumber(): number {
    return this.errorNumber;
  }

}