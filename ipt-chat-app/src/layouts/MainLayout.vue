<template>
  <q-layout view="lhr lpR lFr">
    <q-header bordered class="bg-orange text-dark">
      <q-toolbar>
        <q-btn flat @click="leftDrawer = !leftDrawer" round dense icon="menu" />

        <q-toolbar-title>{{ pathName }}</q-toolbar-title>
        <q-btn
          flat
          label="Logout"
          icon="mdi-logout"
          no-caps
          @click="handleLogout"
        />
        <q-btn
          flat
          @click="rightDrawer = !rightDrawer"
          round
          dense
          icon="menu"
        />
      </q-toolbar>
    </q-header>

    <q-drawer bordered v-model="leftDrawer" show-if-above>
      <q-img class="" fit="fill" :src="BgUser" style="height: 210px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar
            size="56px"
            class="q-mb-sm bg-orange text-dark text-capitalize text-bold"
          >
            {{ userStore.fullname.charAt(0) }}
          </q-avatar>
          <div
            class="text-weight-bold text-capitalize text-left q-pl-sm column"
          >
            <span>{{ userStore.fullname }}</span>
            <span>@{{ userStore.username }}</span>
          </div>
        </div>
      </q-img>

      <span class="text-grey-9 text-h6 q-ml-md q-mt-xl">Inbox</span>
      <q-separator />
      <q-scroll-area
        class="column"
        style="height: 50%; max-height: calc(100% - 210px)"
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

    <q-drawer show-if-above v-model="rightDrawer" side="right" bordered>
      <div class="column q-gutter-y-md">
        <q-toolbar class="bg-orange text-dark shadow-2">
          <q-toolbar-title>Available Users</q-toolbar-title>
        </q-toolbar>

        <q-virtual-scroll
          v-if="contacts.length > 1"
          :items="contacts"
          style="height: 300px; max-height: calc(100% - 50px)"
          v-slot="{ item, index }"
        >
          <q-list separator>
            <AvailableUsersComponent
              class="text-capitalize"
              :key="index"
              v-bind="item"
            />
          </q-list>
        </q-virtual-scroll>

        <div v-else class="column flex flex-center" style="height: 90vh">
          <span class="text-grey-9 text-weight-bold"
            >Oops!... I guess no one's online</span
          >
          <q-img src="src/assets/empty.png" width="60%" />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import FriendListComponent from "src/components/FriendListChatComponent.vue";
import AvailableUsersComponent from "src/components/AvailableUsersComponent.vue";
import { useRoute, useRouter } from "vue-router";
import { socket } from "src/functions/socket.io";
import { api } from "src/boot/axios";
import { useUserStore } from "stores/user.store";
import { useMessageStore } from "src/stores/msg-store";
import { SessionStorage } from "quasar";
import BgUser from "src/assets/chathub.png";
import jwt_decode from "jwt-decode";

defineComponent({
  name: "MainLayout",
});

const route = useRoute();
const router = useRouter();
const leftDrawer = ref(false);
const rightDrawer = ref(false);
const messageData = msgData;
const pathName = ref("");
const userStore = useUserStore();
const msgStore = useMessageStore();
const decoded = jwt_decode(SessionStorage.getItem("token"));
const contacts = ref([]);

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

const msgData = ref([
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
]);


msgData.value.sort(customSort);


const handleLogout = async () => {
  try {
    const response = await api.post(
      "/user/logout",
      { refreshToken: SessionStorage.getItem("refresh") },
      {
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.status_code === 200) {
      socket.emit("user_logout", decoded.user_id);
      SessionStorage.clear();
      userStore.clearUser();
      router.push("/login");
    } else {
      throw new Error("Something went wrong!.");
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getUserData = async () => {
  try {
    const response = await api.post(
      "/user/get/all",
      { user_id: decoded.user_id },
      {
        headers: {
          Authorization: `Bearer ${SessionStorage.getItem("token")}`,
        },
      }
    );

    userStore.initUser(response.data);
  } catch (error) {
    throw new Error(error);
  }
};

onMounted(() => {
  socket.on("connect", () => {
    console.info("you are connected!");
  });

  socket.emit("user_connected", {
    user_id: decoded.user_id,
    fullname: decoded.fullname,
    username: decoded.username,
    user_status: "online",
  });

  socket.on("user_connected", (user_data) => {
    contacts.value = user_data;
  });

  getUserData();
});

watchEffect(() => {
  pathName.value = route.name;
});
</script>
