import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'http://localhost:8080/api' });
// const baseApi = axios.create({ baseURL: 'http://localhost:8080/api' });

const api = axios.create({ baseURL: 'https://iptchatapp.1.us-1.fl0.io/api/' });
const baseApi = axios.create({ baseURL: 'https://iptchatapp.1.us-1.fl0.io/api/' });

const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh/token', {
      refreshToken: SessionStorage.getItem("refresh"),
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    if (!config.headers['Authorization']) {
      config.header['Authorization'] = `Bearer ${SessionStorage.getItem('token')}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async (error) => {
    const prevRequest = error?.config;

    if(error?.response.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;

      const token = await refreshToken();

      if (token) {
        prevRequest.headers['Authorization'] = `Bearer ${token.accessToken}`

        SessionStorage.set('token', token.accessToken);
        return api(prevRequest);
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  app.config.globalProperties.$baseApi = baseApi;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api, baseApi };
