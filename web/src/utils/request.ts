import { BASE_URL } from '@/constants';
import type { RequestOptions, RequestResult } from '@/types';

const createHeaders = (options: RequestOptions): Headers => {
  const headers = new Headers({
    'Content-type': 'application/json',
  });
  if (options.headers) {
    Object.keys(options.headers).forEach(key => {
      if (!options.headers?.[key]) {
        return;
      }

      if (key.toLowerCase() === 'content-type') {
        if (options.headers[key] === 'multipart/form-data') {
          // @ts-ignore
          headers.delete(key);
          return;
        }
        headers.set(key, options.headers?.[key]);
        return;
      }

      headers.append(key, options.headers[key]);
    });
  }

  return headers;
};

const createBody = (options: RequestOptions): string | FormData | undefined => {
  const contentType = options.headers?.['content-type'].toLowerCase();
  if (contentType === 'multipart/form-data') {
    const body = new FormData();
    if (options.body) {
      Object.keys(options.body).forEach(key => {
        if (!options.body?.[key]) {
          return;
        }
        (body as FormData).append(key, options.body[key]);
      });
    }

    return body;
  }

  return options.body ? JSON.stringify(options.body) : undefined;
};

export const request = async <T>(
  resource: string,
  options: RequestOptions = { method: 'GET' },
  onProgress?: (percentComplete: number) => void,
): Promise<RequestResult<T>> => {
  return new Promise(async (resolve, reject) => {
    const headers = createHeaders(options);
    const body: string | undefined | FormData = createBody(options);
    const query = options.query
      ? `?${new URLSearchParams(options.query).toString()}`
      : '';
    const url = `${options.ignoreBaseUrl ? '' : BASE_URL}${resource.replace(
      /^\/+/,
      '',
    )}${query}`;

    const xhr = new XMLHttpRequest();
    xhr.open(options.method.toUpperCase(), url);
    headers.forEach((value, key) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.upload.addEventListener('progress', e => {
      if (e.lengthComputable && onProgress) {
        const percentComplete = (e.loaded / e.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.onload = async () => {
      if (xhr.status >= 300) {
        // @ts-ignore
        reject(new RequestError(xhr));
      } else {
        resolve(await JSON.parse(xhr.responseText));
      }
    };

    xhr.onerror = () => {
        // @ts-ignore
      reject(new RequestError(xhr));
    };

    if (options.abortTimeout) {
      setTimeout(() => {
        xhr.abort();
        // @ts-ignore
        reject(new RequestError(xhr));
      }, options.abortTimeout);
    }

    if (options.signal) {
      options.signal.addEventListener('abort', () => {
        xhr.abort();
        // @ts-ignore
        reject(new RequestError(xhr));
      });
    }

    xhr.send(body);
  });
};

class RequestError extends Error {
    private response: Response;
  
    constructor(response: Response, message?: string) {
      super(message);
      this.response = response;
    }
  
    isUnauthorized(): boolean {
      return this.response.status === 401;
    }
  }
  