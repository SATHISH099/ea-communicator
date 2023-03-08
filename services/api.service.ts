import type { z } from 'zod';
import type { FetchOptions } from 'ofetch';
import type { PublicRuntimeConfig } from 'nuxt/schema';
import { useToasterStore } from '~~/store/toaster';

interface ServerError {
  message: string;
  statusCode: number;
}

export enum ApiTarget {
  SELF = 'self',
  SMARTSUITE = 'smartsuite',
}

export class ApiService {
  private url = '';
  private config?: PublicRuntimeConfig;
  private apiTarget: ApiTarget = ApiTarget.SELF;

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
          case 401:
            throw showError({
              statusCode: 401,
              statusMessage: 'Unauthorized',
            });
          default:
            throw showError({
              statusCode: 500,
              statusMessage: 'Internal Server Error',
            });
        }
      }
    },
  };

  constructor(options?: FetchOptions) {
    options ??= {};
    this.setOptions(options);
  }

  initialize() {
    this.config = useRuntimeConfig().public;
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

  async makeRequest<T>(url: string, options: any, schema: z.ZodType<T>) {
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

  getBaseUrl() {
    this.config = useRuntimeConfig().public;
    return this.apiTarget === ApiTarget.SELF
      ? this.config?.API_BASE_URL
      : this.config?.API_SMARTSUITE_BASE_URL;
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

  setTarget(target: ApiTarget) {
    this.apiTarget = target;
  }
}
