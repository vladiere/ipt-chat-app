<template>
  <div
    class="absolute-center"
    v-if="loading"
  >
    <q-spinner-ios
      color="orange"
      size="5.5em"
    />
  </div>
  <div v-else class="column relative-position">
    <div
      class="row q-pa-sm bg-grey-1 items-center q-gutter-x-md shadow-2 text-capitalize"
    >
      <q-avatar
        avatar
        size="3em"
        class="bg-orange text-dark text-uppercase text-bold"
      >
      {{ userFullname }}
      </q-avatar>
      <span class="text-bold">
        {{ userData.fullname }}
      </span>
    </div>
    <q-virtual-scroll
      v-if="messages.length > 0"
      style="
        height: calc(100vh - 112px);
        max-height: calc(100vh - 112px);
        overflow-x: auto;
      "
      class="q-pa-sm q-pb-xl"
      :items="messages"
      separator
      v-slot="{ item, index }"
    >
      <q-chat-message
        :key="index"
        :sent="userQuery[0] !== item.to"
        :bg-color="decoded.user_id !== item.user_id ? 'orange' : 'grey-5'"
        :avatar="avatarFace"
        :stamp="formatTimeAgo(item.stamp)"
      >
        <div>{{ item.messages }}</div>
      </q-chat-message>
    </q-virtual-scroll>
  </div>
</template>

<script setup>
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import avatarFace from "src/assets/user.png";
import { socket } from "src/functions/socket.io";
import jwt_decode from "jwt-decode";
import { SessionStorage } from "quasar";
import { useRouter } from "vue-router";
import { api } from 'src/boot/axios.js';

defineComponent({
  name: "ChatRoomComponent",
});

const messages = ref([]);
const myMessage = ref("");
const decoded = jwt_decode(SessionStorage.getItem("token"));
const router = useRouter();
const userData = ref([]);
const userFullname = ref('')
const loading = ref(true);
const userQuery = ref([])
const currentUserId = ref(null);

function getCurrentDateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const timeDiff = now - new Date(timestamp);

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 10 ? "just now" : `${seconds} seconds ago`;
  }
};

const sendMessage = async () => {
  if (myMessage.value !== "") {
    const messageData = {
      user_id: decoded.user_id,
      fullname: decoded.fullname,
      to: props.value.socket_id,
      messages: myMessage.value,
      stamp: getCurrentDateTime(),
    };

    messages.value.push(messageData);

    await socket.emit("send_message", messageData);
    myMessage.value = "";
  }
};

const getUserData = async () => {
  try {
   const response = await api.post(
      '/user/get/all',
      { user_id: userQuery.value[1] },
      {
        headers: {
          Authorization: `Bearer ${
            SessionStorage.getItem('token')
          }`,
        },
      }
    );
    console.log(response.data);
    userData.value = response.data;
    userFullname.value = userData.value.fullname.charAt(0)
  } catch (error) {
    throw new Error(error);
  }
}

onMounted(async () => {

  userQuery.value = router.currentRoute.value.params.id.split('_');
  currentUserId.value = userQuery.value[1];

  setTimeout(() => {
    loading.value = false
    getUserData();
  }, 1200);

  socket.on("received_message", (data) => {
    messages.value.push(data);
  });

});


</script>
