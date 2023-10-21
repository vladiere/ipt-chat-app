<template>
  <q-item
    v-if="decoded.user_id !== props.user_id"
    clickable
    v-ripple
    @click="handleClickToChat(props)"
  >
    <q-item-section avatar>
      <q-avatar color="orange" text-color="dark">
        {{ props.fullname.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.fullname }}</q-item-label>
      <q-item-label caption lines="1" class="text-green">{{
        props.user_status
      }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon name="chat_bubble" color="green" />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { SessionStorage } from "quasar";
import jwt_decode from "jwt-decode";
import { ref } from "vue";
import { useRouter } from "vue-router";

const decoded = ref(jwt_decode(SessionStorage.getItem("token")));
const router = useRouter();

const props = defineProps([
  "fullname",
  "socket_id",
  "user_id",
  "user_status",
  "username",
]);

const handleClickToChat = (user_data) => {
  const userData = { ...user_data };

  router.replace({
    name: "Chat Room",
    params: { id: userData.socket_id + '_' + userData.user_id },
  });
};
</script>
