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
const api = axios.create({ baseURL: 'http://localhost:8080/api' });
const baseApi = axios.create({ baseURL: 'http://localhost:8080/api' });

const refreshToken = async () => {
  try {
    const response = await api.post("/user/refresh/token", {
      refreshToken: SessionStorage.getItem("refresh"),
    });

    return response.data[0];
  } catch (error) {
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    const currentDate = new Date();

    const decoded = jwt_decoded(SessionStorage.getItem("token"));
    if (decoded.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();

      config.headers["Authorization"] = `Bearer ${data.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
