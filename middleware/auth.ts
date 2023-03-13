import { ApiService } from '~~/services/api.service';
import { authUserSchema } from '~~/store/auth';

export default defineNuxtRouteMiddleware((_to) => {
  const token = localStorage.getItem('token');
  const apiService = new ApiService();

  const response = apiService.get(authUserSchema, '/api/auth', {
    params: { token },
  });
});
