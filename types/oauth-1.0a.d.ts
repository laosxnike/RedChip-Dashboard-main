declare module 'oauth-1.0a' {
  export interface OAuth {
    new (options: {
      consumer: { key: string; secret: string };
      signature_method: string;
      hash_function: (base_string: string, key: string) => string;
    }): OAuth;
    authorize(request: { url: string; method: string }, token: { key: string; secret: string }): { [key: string]: string };
    toHeader(authorization: { [key: string]: string }): { Authorization: string };
    token: string;
  }

  const OAuth: OAuth;
  export default OAuth;
}

