import { defineStore } from 'pinia';
import IUser from 'src/utils/interface/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    access: '',
    user: [] as Array<IUser>,
    authenticated: false,
  }),

  getters: {
    getToken: (state) => state.token,
    getAccess: (state) => state.access,
    isAuthenticated: (state) => state.authenticated,
  },

  actions: {
    initTokens (tokens: object) {
      this.token = tokens.accessToken;
      this.access = tokens.refreshToken;
      this.authenticated = true;
    },
    clearToken () {
      this.token = '';
      this.access = '';
      this.authenticated = false;
    },
    initUser (user: object) {
      this.user = user;
    },
    clearUser () {
      this.user = [];
    }
  },
  persist: {
    storage: localStorage
  }
});
