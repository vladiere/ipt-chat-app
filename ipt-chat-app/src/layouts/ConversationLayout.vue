<template>
  <q-layout view="lHr lpR lFr">
    <q-header elevated class="bg-orange text-dark">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar
            size="50px"
            class="bg-dark text-white text-uppercase text-bold q-my-sm q-mr-sm"
            >L</q-avatar
          >Lance Phillip
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-img
        class=""
        fit="fill"
        src="src/assets/chathub.png"
        style="height: 220px"
      />
      <div class="q-px-md q-py-sm">
        <q-input
          placeholder="Search or start a new conversation"
          dense
          input-style="font-size: 12px"
          outlined
          v-model="searchQuery"
          @input="handleSearchUser"
          rounded
          bg-color="white"
        >
          <template v-slot:append>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
      <q-separator />

      <q-scroll-area style="height: calc(100% - 277px)">
        <q-list
          v-if="!searchQuery"
          separator
          class="rounded-borders"
          style="max-width: 300px"
        >
          <FriendListComponent
            v-for="msg in messageData"
            :key="msg.datesend"
            v-bind="msg"
          />
        </q-list>
        <q-list v-else separator style="max-width: 300px">
          <AvailableUsersComponent
            v-for="contact in filteredUsers"
            :key="contact.user_id"
            v-bind="contact"
          />
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
      <div class="column flex flex-center" style="height: 32%">
        <div class="col self-start">
          <q-btn
            @click="handleLogout"
            dense
            no-caps
            flat
            icon="mdi-logout"
            label="Logout"
          />
        </div>

        <q-avatar
          size="80px"
          class="q-mb-sm bg-orange text-dark text-capitalize text-h4 text-bold"
        >
          {{ userStore.fullname.charAt(0) }}
        </q-avatar>
        <div class="text-capitalize text-center q-pl-sm column">
          <span class="text-h6">
            {{ userStore.fullname }}
          </span>
          <span class="text-body"> @{{ userStore.username }} </span>
        </div>
      </div>
      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="Account settings"
        class="q-mt-lg"
      >
        <q-card>
          <q-card-section class="q-mt-xs column q-gutter-y-md">
            <q-item-label>Change Password</q-item-label>
            <q-input
              v-model="changePass.newPassword"
              outlined
              dense
              bg-color="grey-1"
              label="New password"
            />
            <q-input
              v-model="changePass.confirmNewPassword"
              outlined
              dense
              bg-color="grey-3"
              label="Confirm new password"
            />
            <q-btn
              color="orange"
              text-color="dark"
              label="Save changes"
              no-caps
              class="self-center"
              rounded
            />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-1 q-pa-sm text-white column">
      <q-input
        placeholder="Type something..."
        rounded
        outlined
        borderless
        bg-color="white"
        dense
        v-model="myMessage"
      >
        <template v-slot:before>
          <q-btn icon="mdi-emoticon-outline" round flat />
        </template>
        <template v-slot:after>
          <q-btn icon="mdi-paperclip" round flat />
        </template>
      </q-input>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { computed, defineComponent, onMounted, ref } from "vue";
import { useUserStore } from "stores/user.store";
import FriendListComponent from "src/components/FriendListChatComponent.vue";
import AvailableUsersComponent from "src/components/AvailableUsersComponent.vue";
import { useRouter } from "vue-router";
import { socket } from "src/functions/socket.io";
import { api } from "src/boot/axios";
import { SessionStorage } from "quasar";
import jwt_decode from "jwt-decode";

defineComponent({
  name: "ConversationLayout",
});

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

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

const msgData = ref([]);

const contacts = ref([]);

msgData.value.sort(customSort);

const router = useRouter();
const myMessage = ref("");
const messageData = msgData;
const userStore = useUserStore();
const searchQuery = ref("");
const decoded = jwt_decode(SessionStorage.getItem("token"));
const changePass = ref({
  newPassword: "",
  confirmNewPassword: "",
});

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

const filteredUsers = computed(() => {
  return contacts.value.filter((contact) =>
    contact.fullname.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const handleSearchUser = (value) => {
  searchQuery.value = value;
};

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
</script>
