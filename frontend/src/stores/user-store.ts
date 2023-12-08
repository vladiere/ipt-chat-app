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
      console.log(tokens)
      this.token = tokens.accessToken;
      this.access = tokens.refreshToken;
      this.authenticated = true;
    },
    changeToken (token: string) {
      this.token = token;
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
    },
    logout () {
      this.clearUser();
      this.clearToken();
    }
  },
  persist: {
    storage: localStorage
  }
});
