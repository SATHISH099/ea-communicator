import type { z } from 'zod';
import type { FetchOptions } from 'ofetch';
import { useToasterStore } from '~~/store/toaster';

interface ServerError {
  message: string;
  statusCode: number;
}

export class ApiService {
  private url = '';
  private baseURL = '';

  private options: FetchOptions = {
    onRequestError: () => {
      const { setMessage } = useToasterStore();
      setMessage('Something went wrong. Please try later.', 'error');
    },
    onResponseError: (error) => {
      if (error.response?._data) {
        const { statusCode } = error.response?._data as ServerError;
        switch (statusCode) {
          case 404:
            throw showError({
              statusCode: 404,
              statusMessage: 'Page Not Found',
            });
            break;
          case 401:
            throw showError({
              statusCode: 401,
              statusMessage: 'Unauthorized',
            });
            break;
          default:
            throw showError({
              statusCode: 500,
              statusMessage: 'Internal Server Error',
            });
            break;
        }
      }
    },
  };

  constructor(options?: FetchOptions) {
    options ??= {};
    this.setOptions(options);
    const config = useRuntimeConfig();
    this.baseURL = config.public.API_BASE_URL;
  }

  get<T>(schema: z.ZodType<T>, url?: string, options?: FetchOptions) {
    return this.makeRequest(this.getUrl(url), this.getOptions(options), schema);
  }

  post<T>(
    schema: z.ZodType<T>,
    data: any,
    url?: string,
    options?: FetchOptions,
  ) {
    const body = data as Record<string, any>;
    options = { method: 'post', body, ...options };
    return this.makeRequest(this.getUrl(url), this.getOptions(options), schema);
  }

  put<T>(
    schema: z.ZodType<T>,
    data: Record<string, any>,
    url?: string,
    options?: FetchOptions,
  ) {
    const body = data as Record<string, any>;
    options = { method: 'put', body, ...options };
    return this.makeRequest(this.getUrl(url), this.getOptions(options), schema);
  }

  delete<T>(schema: z.ZodType<T>, url?: string, options?: FetchOptions) {
    options = { method: 'delete', ...options };
    return this.makeRequest(this.getUrl(url), this.getOptions(options), schema);
  }

  async makeRequest<T>(
    url: string,
    options: FetchOptions,
    schema: z.ZodType<T>,
  ) {
    let response: unknown;
    const baseURL = this.getBaseUrl();
    options = { baseURL, ...options };
    try {
      response = await $fetch(url, options);
    } catch (error) {
      return;
    }
    return this.checkSchema(response, schema);
  }

  checkSchema<T>(data: any, schema: z.ZodType<T>) {
    const response = schema.safeParse(data);
    if (!response.success) {
      console.error(response.error);
    }
    return data;
  }

  setBaseUrl(url: string) {
    this.baseURL = url;
  }

  getBaseUrl() {
    return this.baseURL;
  }

  setOptions(options: FetchOptions) {
    this.options = { ...this.options, ...options };
  }

  getOptions(options?: FetchOptions) {
    return { ...this.options, ...options };
  }

  getUrl(url?: string) {
    return url || this.url;
  }

  setUrl(url: string) {
    this.url = url;
  }
}
