import { ApiService } from '~~/services/api.service';
import { MediaService } from '~~/services/media.service';

const api = new ApiService();
const media = new MediaService(new ApiService());

const services = {
  api,
  media,
};

type Services = typeof services;
type ServiceKey = keyof Services;

export function useService<T extends ServiceKey>(key: T): Services[T] {
  return services[key];
}
