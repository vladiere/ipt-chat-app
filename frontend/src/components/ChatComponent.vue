<style lang="sass" scoped>
.chat-container
  height: calc(100vh - 200px)
  width: 100%
  box-shadow: inset 0px 0px 21px -7px rgba(0, 0, 0, 1)
</style>

<template>
  <div class="column rounded-borders relative-position full-height">
    <div v-if="uuidTo" class="row justify-between">
      <div class="row q-gutter-x-sm items-center">
        <span class="text-h6 text-capitalize">{{ fromUser.firstname }} {{ fromUser.lastname }}</span>
        <q-badge color="positive" />
      </div>

      <q-btn
        flat
        dense
        rounded
        icon="mdi-paperclip"
        color="grey-10"
      />

    </div>

    <q-separator class="q-my-md"/>
    <q-scroll-area v-if="uuidTo" ref="scrollAreaRef" :class="Platform.is.mobile ? 'q-pa-sm chat-container ' : 'q-px-md q-py-sm chat-container '" @scroll="onScroll" >
      <div v-if="messages.length === 0" :class="Platform.is.mobile ? 'flex flex-center text-h6 text-grey-7' : 'flex flex-center text-h5 text-weight-bold text-grey-6'" style="height: calc(100vh - 230px)">
        <span>Start a conversation now.</span>
      </div>

        <q-chat-message
          v-for="message in messages"
          :key="message.uuid"
          :name="message.uuid_from === decode.uuid ? 'me' : fromUser.firstname + ' ' + fromUser.lastname"
          :text="[ message.message ]"
          :stamp="generateTimeStamps(message.createdAt)"
          avatar="https://cdn.pixabay.com/photo/2017/01/10/03/54/avatar-1968236_640.png"
          :sent="message.uuid_from === decode.uuid"
          :text-color="message.uuid_from === decode.uuid ? 'grey-1' : 'grey-10'"
          :bg-color="message.uuid_from === decode.uuid ? 'primary' : 'amber-7'"
        />

      <q-scroll-observer />
    </q-scroll-area>

    <div v-else :class="Platform.is.mobile ? 'q-pa-sm chat-container ' : 'q-px-md q-py-sm chat-container '">
      <div :class="Platform.is.mobile ? 'flex flex-center text-h6 text-grey-7' : 'flex flex-center text-h5 text-weight-bold text-grey-6'" style="height: calc(100vh - 230px)">
        <span>Start a conversation now.</span>
      </div>
    </div>


    <div class="column q-pt-sm">
      <q-input
        placeholder="Type something..."
        v-model="sendMessage.message"
        dense
        :readonly="uuidTo"
        outlined
        @keyup.enter="sendToUserMessage"
       >
       <template v-slot:append>
         <q-icon name="send" color="primary" class="rotate-315" @click="sendToUserMessage"/>
       </template>
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, nextTick } from 'vue';
import { Platform } from 'quasar';
import { socket } from 'src/utils/socket';
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'stores/user-store';
import { api } from 'boot/axios';
import generateTimeStamps from 'src/utils/timestamps';

const router = useRouter();
const userStore = useUserStore();
const decode = jwtDecode(userStore.token);
const scrollAreaRef = ref(null);
const messages = ref([]);
const uuidTo = ref('');
const fromUser = ref({});
const scrollSize = ref(0);
const file = ref(null);

const onItemClick = () => {
  console.log('clicked');
}

const sendMessage = ref({
  uuid_to: '',
  uuid_from: decode.uuid,
  message: '',
});

const sendToUserMessage = () => {
  if (sendMessage.value.message) {
    socket.emit('send_message', (sendMessage.value));
    sendMessage.value.message = '';
    scrollToBottom();
  }
}

const getUserToUserMessage = async () => {
  try {
    if (uuidTo.value) {
      const response = await api.post('/user/message', { uuid_to: uuidTo.value, uuid_from: decode.uuid }, {
        headers: {
          Authorization: `Bearer ${userStore.token}`
        }
      });
      fromUser.value = response.data.fromUser;
      messages.value = response.data.messages;
    }
  } catch (error) {
    throw error;
  } finally {
    scrollToBottom();
  }
}


const scrollToBottom = async () => {
  console.log(scrollAreaRef.value !== null)
  if (scrollAreaRef.value !== null || undefined) {
    await nextTick(); // Wait for the next update cycle
    scrollAreaRef.value.$el.scrollTop = scrollAreaRef.value.$el.clientHeight;
  }
};

const onScroll = (details) => {
  scrollSize.value = details.verticalSize;
}

onMounted(async () => {
  if (router.currentRoute.value.params.id) {
    sendMessage.value.uuid_to = router.currentRoute.value.params.id;
    uuidTo.value = router.currentRoute.value.params.id;
  }

  await getUserToUserMessage();

  socket.on('get_connected', () => {
    console.log('Connection is back');
  });

  socket.on('get_message', (data) => {
    messages.value.push(data);
  });

});

watch(scrollSize, (val) => {
  scrollAreaRef.value.setScrollPosition('vertical', val, 300)
})

watch(() => router.currentRoute.value.params.id, async (val) => {
  console.log(!val, val)
  if (val) {
    uuidTo.value = val;
    await getUserToUserMessage();
  } else {
    messages.value = [];
    fromUser.value = [];
  }
})

</script>
