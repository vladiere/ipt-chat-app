import { SessionStorage } from "quasar";

const routes = [
  {
    path: "/",
    // component: () => import("layouts/MainLayout.vue"),
    component: () => import("layouts/ConversationLayout.vue"),
    children: [
      {
        path: "/t/:id",
        name: "Chat Room",
        component: () => import("pages/ChatRoomPage.vue"),
      },
      {
        path: "",
        name: "Home",
        component: () => import("pages/NoConversationPage.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      // Check if there is a token in the session storage
      if (
        !SessionStorage.getItem("token") ||
        SessionStorage.getItem("token") == undefined
      ) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
  },
  {
    path: "/register",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/RegisterPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
