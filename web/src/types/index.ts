export type Station = {
  cid?: string;
  id?: string;
  owner: string;
  monthlyFee: number;
  name?: string;
  description?: string;
  image?: string;
  cover?: string;
  streamCid?: string;
  isStreamPrivate: boolean;
};

export type StationMetadata = {
  name: string;
  description: string;
  image: Blob | File;
  properties: {
    cover: Blob | File;
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

export type StationQueryWhere = {
  id: string;
  id_not: string;
  id_gt: string;
  id_lt: string;
  id_gte: string;
  id_lte: string;
  id_in: string[];
  id_not_in: string[];
  id_contains: string;
  id_contains_nocase: string;
  id_not_contains: string;
  id_not_contains_nocase: string;
  id_starts_with: string;
  id_starts_with_nocase: string;
  id_not_starts_with: string;
  id_not_starts_with_nocase: string;
  id_ends_with: string;
  id_ends_with_nocase: string;
  id_not_ends_with: string;
  id_not_ends_with_nocase: string;
  owner: string;
  owner_not: string;
  owner_gt: string;
  owner_lt: string;
  owner_gte: string;
  owner_lte: string;
  owner_in: string[];
  owner_not_in: string[];
  owner_contains: string;
  owner_contains_nocase: string;
  owner_not_contains: string;
  owner_not_contains_nocase: string;
  owner_starts_with: string;
  owner_starts_with_nocase: string;
  owner_not_starts_with: string;
  owner_not_starts_with_nocase: string;
  owner_ends_with: string;
  owner_ends_with_nocase: string;
  owner_not_ends_with: string;
  owner_not_ends_with_nocase: string;
  cid: string;
  cid_not: string;
  cid_gt: string;
  cid_lt: string;
  cid_gte: string;
  cid_lte: string;
  cid_in: string[];
  cid_not_in: string[];
  cid_contains: string;
  cid_contains_nocase: string;
  cid_not_contains: string;
  cid_not_contains_nocase: string;
  cid_starts_with: string;
  cid_starts_with_nocase: string;
  cid_not_starts_with: string;
  cid_not_starts_with_nocase: string;
  cid_ends_with: string;
  cid_ends_with_nocase: string;
  cid_not_ends_with: string;
  cid_not_ends_with_nocase: string;
  monthlyFee: number;
  monthlyFee_not: number;
  monthlyFee_gt: number;
  monthlyFee_lt: number;
  monthlyFee_gte: number;
  monthlyFee_lte: number;
  monthlyFee_in: number[];
  monthlyFee_not_in: number[];
};

export type NFTStorageStatus = {
  cid: string;
  created: Date;
  size: number;
};
