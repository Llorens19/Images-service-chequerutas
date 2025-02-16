export class ErrorResp extends Error {
  state: number;
  code: string;
  statusCode: number;

  constructor(state: number, code:string, message: string) {
    super(message);
    this.statusCode = state;
    this.state = state;
    this.code = code;
  }
}