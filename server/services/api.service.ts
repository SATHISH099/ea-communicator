import type { z } from 'zod';
import { FetchOptions, $fetch } from 'ofetch';
import { showError } from 'nuxt/app';

type ServerError = {
  message: string;
  statusCode: number;
  error_description: string;
};
type Post<T> = {
  data: unknown;
  schema?: z.ZodType<T>;
  url?: string;
  options?: FetchOptions;
};
type Get<T> = {
  schema?: z.ZodType<T>;
  url?: string;
  options?: FetchOptions;
};

export class ApiService {
  private url = '';

  private options: FetchOptions = {
    onRequestError: () => {
      throw showError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
      });
    },
    onResponseError: (error) => {
      if (error.response?._data) {
        const {
          message,
          statusCode,
          error_description: errorDescription,
        } = error.response?._data as ServerError;
        const statusMessage = errorDescription || message;
        throw showError({
          statusCode,
          statusMessage,
        });
      }
    },
  };

  constructor(options?: FetchOptions) {
    options ??= {};
    this.setOptions(options);
  }

  get<T>({ options, schema, url }: Get<T> = {}) {
    return this.makeRequest(this.getUrl(url), this.getOptions(options), schema);
  }

  post<T>({ data, options, schema, url }: Post<T>) {
    const body = data as Record<string, unknown>;
    options = { method: 'post', body, ...options };
    return this.makeRequest(this.getUrl(url), this.getOptions(options), schema);
  }

  async makeRequest<T>(
    url: string,
    options: FetchOptions,
    schema?: z.ZodType<T>,
  ) {
    const baseURL = this.getBaseUrl();
    options = { baseURL, ...options };
    const response = await $fetch(url, options);
    return this.checkSchema(response, schema);
  }

  checkSchema<T>(data: unknown, schema?: z.ZodType<T>) {
    if (schema) {
      const response = schema.safeParse(data);
      if (!response.success) {
        console.error(response.error);
      }
    }
    return data as T;
  }

  getBaseUrl() {
    return useRuntimeConfig().SSO_API_URL;
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
