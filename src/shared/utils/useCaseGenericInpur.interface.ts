export interface IUseCaseData<T> {
  request: IUseCaseGenericInput;
  repo: T;
}

export interface IUseCaseGenericInput {
  body: unknown;
  params: unknown;
  query: unknown;
  headers: {
    authorization?: string;
    refresh_authorization?: string;
  };

  middlewareData?: {
    idUser: string;
    username: string;
    email: string;
    role: string;
  };
  parts(): any;
  file: () => any;
}
