import { SessionStorage } from "quasar";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/NoConversation.vue"),
      },
      {
        path: "/t/:id",
        name: "Chat Room",
        component: () => import("components/ChatRoomComponent.vue"),
      },
      {
        path: "/discover",
        name: "Search and discover new people",
        component: () => import("pages/DiscoverNewPeople.vue"),
      },
    ],
    beforeEnter: (to, from, next) => {
      // Check if there is a token in the session storage
      if (!SessionStorage.getItem("token")) {
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
