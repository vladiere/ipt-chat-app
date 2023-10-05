<template>
  <q-layout view="lHh Lpr lff">
    <q-header bordered class="bg-purple-13 text-white">
      <q-toolbar>
        <q-toolbar-title>{{ pathName }}</q-toolbar-title>
        <q-btn
          flat
          label="Logout"
          icon="mdi-logout"
          no-caps
          @click="handleLogout"
        />
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      </q-toolbar>
    </q-header>

    <q-drawer bordered v-model="drawer" show-if-above>
      <q-list padding style="margin-top: 150px">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-img class="absolute-top" :src="BgUser" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm bg-blue text-capitalize">
            {{ userStore.fullname.charAt(0) }}
          </q-avatar>
          <div class="text-weight-bold text-white bg-purple-13 rounded-borders text-capitalize text-left q-pl-sm" style="width: 50%;">
            {{ userStore.fullname }}
            @{{ userStore.username }}
          </div>
        </div>
      </q-img>

      <q-separator />

      <span class="text-grey-7 q-ml-md q-mt-md">Inbox</span>
      <q-scroll-area
        class="column"
        style="height: 50%; max-height: calc(100% - 200px)"
      >
        <q-list separator class="rounded-borders" style="max-width: 300px">
          <FriendListComponent
            v-for="msg in messageData"
            :key="msg.datesend"
            v-bind="msg"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import FriendListComponent from "src/components/FriendList/FriendListChatComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { socket } from "boot/socket.io";
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { useUserStore } from "stores/user.store";
import BgUser from "src/assets/bg-user.svg";

defineComponent({
  name: "MainLayout",
});

const route = useRoute();

const customSort = (a, b) => {
  if (a.msgstatus === "unread" && b.msgstatus === "read") {
    return 1;
  } else if (a.msgstatus === "read" && b.msgstatus === "unread") {
    return -1;
  } else {
    // If both have the same status, sort by datesend in ascending order
    return b.datesend.localeCompare(a.datesend);
  }
};

const linksList = [
  {
    title: "Inbox",
    caption: "messages inbox",
    icon: "mdi-inbox-arrow-up",
    link: "/home",
  },
  {
    title: "Sent",
    caption: "messages sent",
    icon: "mdi-send-check",
    link: "/sent",
  },
  {
    title: "Friends ",
    caption: "People that are your friends",
    icon: "mdi-account-multiple-outline",
    link: "/discover",
  },
];

const msgData = [
  {
    user_id: 1,
    fullname: "John Doe",
    message: "Hello, how are you?",
    datesend: "2023-09-15 10:30:00",
    msgstatus: "unread",
  },
  {
    user_id: 2,
    fullname: "alice smith",
    message: "I'm doing great! How about you?",
    datesend: "2023-09-15 10:32:00",
    msgstatus: "read",
  },
  {
    user_id: 3,
    fullname: "Bob Johnson",
    message: "I'm also doing well, thanks for asking!",
    datesend: "2023-09-15 10:35:00",
    msgstatus: "unread",
  },
  {
    user_id: 4,
    fullname: "Eva Wilson",
    message: "Hey, what's up?",
    datesend: "2023-09-15 10:40:00",
    msgstatus: "unread",
  },
  {
    user_id: 5,
    fullname: "Michael Brown",
    message: "Not much, just working on some code.",
    datesend: "2023-09-15 10:45:00",
    msgstatus: "read",
  },
];

msgData.sort(customSort);

const router = useRouter();
const drawer = ref(false);
const messageData = msgData;
const essentialLinks = linksList;
const pathName = ref("");
const $q = useQuasar();
const userStore = useUserStore();

const handleLogout = () => {
  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
  $q.sessionStorage.clear();
  userStore.clearUser();
  router.push("/login");
};

socket.on("loggedIn", (data) => {
  console.info(data);
});

const getUserData = async () => {
  try {
    const token = $q.sessionStorage.getItem("token").split(" ")[1] || null;
    const user_id = $q.sessionStorage.getItem("token").split(" ")[0];

    const response = await api.post(
      "/user/get/all",
      { user_id: user_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    userStore.initUser(response.data);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

onMounted(() => {
  getUserData();
  if ($q.sessionStorage.getItem("token") === null) {
    router.push("/login");
  }
});

watchEffect(() => {
  pathName.value = route.name;
});
</script>
