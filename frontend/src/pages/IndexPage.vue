<template>
  <q-page padding class="bg-blue-1">
    <div v-if="Platform.is.mobile" :class="Platform.is.mobile ? 'column' : 'row q-gutter-x-sm'">
      <RightMenuComponent :data_object="online_users" class="col-3" v-if="components.right"/>
      <ChatComponent class="col" v-if="components.middle"/>
    </div>
    <div v-else class="row q-gutter-x-sm">
      <RightMenuComponent :data_object="online_users" class="col-3" />
      <ChatComponent class="col"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref, watch } from 'vue';
import { Platform } from 'quasar';
import { socket } from 'src/utils/socket';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user-store';

defineComponent({
  name: 'IndexPage'
});

const LeftMenuComponent = defineAsyncComponent({
  loader: () => import('components/LeftMenuComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: true
});

const ChatComponent = defineAsyncComponent({
  loader: () => import('components/ChatComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: true
});

const RightMenuComponent = defineAsyncComponent({
  loader: () => import('components/RightMenuComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: true
});

const online_users = ref([]);
const userStore = useUserStore();
const decode = jwtDecode(userStore.token);
const router = useRouter()
const components = ref({
  left: true,
  middle: true,
  right: true
})


onMounted(() => {
  socket.on('connect', () => {
    console.log('You are online');
    socket.emit('user_connected', decode.uuid);
  });

  socket.on('user_online', (data) => {
    online_users.value = data;
  });

  socket.on('users_connected', (data) => {
    online_users.value = data;
  })

  const componentpath = router.currentRoute.value.query._;
  if (componentpath) {
    if (componentpath === 'chats') {
      components.value.left = true
      components.value.middle = false;
      components.value.right = false;
    };
    if (componentpath === 'available') {
      components.value.left = false;
      components.value.middle = false;
      components.value.right = true;
    }
  } else {
    components.value.left = false;
    components.value.middle = true;
    components.value.right = false;
  }
});

watch(() => router.currentRoute.value.query, () => {
  console.log(router.currentRoute.value.query);
  const componentpath = router.currentRoute.value.query._;
  if (componentpath) {
    if (componentpath === 'chats') {
      components.value.left = true
      components.value.middle = false;
      components.value.right = false;
    };
    if (componentpath === 'available') {
      components.value.left = false;
      components.value.middle = false;
      components.value.right = true;
    }
  } else {
    components.value.left = false;
    components.value.middle = true;
    components.value.right = false;
  }
})
</script>
