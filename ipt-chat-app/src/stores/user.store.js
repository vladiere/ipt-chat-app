import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: null,
    fullname: "",
    username: "",
    token: "",
  }),

  actions: {
    initUser(userdata) {
      (this.id = userdata.id),
        (this.fullname = userdata.fullname),
        (this.username = userdata.username),
        (this.token = userdata.token);
    },
    clearUser() {
      (this.id = null),
        (this.fullname = ""),
        (this.token = ""),
        (this.username = "");
    },
  },
});
