export class HttpErrorResponse extends Error {
  public readonly name = 'HttpErrorResponse';
  constructor(public status: number,
              public message: string) {
    super(message)
  }
}
