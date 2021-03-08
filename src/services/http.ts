import router from '@/router';
import axios from 'axios';

export const baseURL = process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : `${window.location.origin}/api`;

export default () => {
  const http = axios.create({
    baseURL,
    timeout: 120000,
  });

  http.interceptors.response.use(
    (response) => {
      console.log('response.request.status', response.request.status);
      if (response.request.responseURL.endsWith('/login')) {
        window.location.href = response.request.responseURL;
      }

      return response;
    },
    (reject) => {
      console.log('reject.request.status', reject.request.status);
      if (reject.request.status === 403) {
        router.push({ name: '403' });
      }
    },
  );
  return http;
};
