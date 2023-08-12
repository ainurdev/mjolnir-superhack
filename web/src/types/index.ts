export type Station = {
  uid?: string;
  name: string;
  description: string;
  avatar: string;
  cover: string;
  monthly_fee: number;
  subscribers?: number;
  last_stream?: string;
  uri?: string;
};

export type StationMetadata = {
  name: string;
  description: string;
  image: Blob | File;
  properties: {
    avatar: Blob | File;
    monthly_fee: number;
  };
};

export type User = {
  wallet: string;
  chainId: string;
};

// Extending the default Request type to include our own options
export type RequestOptions = {
  body?: Record<string, any> | undefined;
  headers?: Record<string, string>;
  query?: Record<string, string>;
  method:
    | 'get'
    | 'post'
    | 'put'
    | 'patch'
    | 'delete'
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE';
  ignoreBaseUrl?: boolean;
  abortTimeout?: number;
  signal?: EventTarget;
};

export type Response<T> = T;

export type RequestResult<T> = Response<T> | undefined;
