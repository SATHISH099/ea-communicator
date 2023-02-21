import type { z } from 'zod';
import type { FetchOptions } from 'ofetch';
import { useToasterStore } from '~~/store/toaster';

export class ApiService {
  private url = '';

  private options: FetchOptions = {
    onRequestError: () => {
      const { setMessage } = useToasterStore();
      setMessage('Something went wrong. Please try later.', 'error');
    },
  };

  constructor(options?: FetchOptions) {
    options ??= {};
    this.options = { ...this.options, ...options };
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

  getOptions(options?: FetchOptions) {
    return options || this.options;
  }

  getBaseUrl() {
    const config = useRuntimeConfig();
    return config.public.API_BASE_URL;
  }

  getUrl(url?: string) {
    return url || this.url;
  }

  setUrl(url: string) {
    this.url = url;
  }
}
