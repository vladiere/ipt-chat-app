<template>
  <div
    class="row q-pa-sm bg-grey-3 justify-center items-center q-gutter-x-md shadow-2 text-capitalize"
  >
    <q-avatar avatar size="3em" class="bg-orange text-dark"> J </q-avatar>
    <span class="text-bold">Jane</span>
  </div>
  <q-virtual-scroll
    style="max-height: 520px; overflow-x: hidden"
    class="q-pa-sm"
    :items="msgData"
    separator
    v-slot="{ item, index }"
  >
    <q-chat-message
      :key="index"
      :sent="item.fromOrTo === 'from'"
      :avatar="avatarFace"
      :stamp="formatTimeAgo(item.stamp)"
    >
      <div>{{ item.messages }}</div>
    </q-chat-message>
  </q-virtual-scroll>
  <div class="col row q-gutter-x-sm q-py-sm">
    <q-input
      placeholder="Type your messages..."
      v-model="myMsg"
      outlined
      square
      dense
      flat
      @keyup.enter="sendMessage"
      class="col"
    >
      <template v-slot:append>
        <q-btn
          class="col"
          icon="mdi-send"
          color="blue"
          rounded
          flat
          padding="6px"
          size="md"
        >
          <q-tooltip
            class="bg-grey-9 text-grey-1"
            anchor="top left"
            self="top left"
            >Send</q-tooltip
          >
        </q-btn>
        <q-btn
          class="col"
          icon="mdi-paperclip"
          color="grey-3"
          text-color="grey-10"
          rounded
          flat
          padding="6px"
          size="md"
        >
          <q-tooltip
            class="bg-grey-9 text-grey-1"
            anchor="top left"
            self="top left"
            >Add image</q-tooltip
          >
        </q-btn>
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import avatarFace from "src/assets/user.png";

defineComponent({
  name: "ChatRoomComponent",
});

const myMsg = ref("");
const msgData = [
  {
    stamp: "2023-09-30T08:00:00",
    fromOrTo: "from",
    messages: "Hi, how are you?",
    image: "https://picsum.photos/1200/500/?1",
  },
  {
    stamp: "2023-09-30T08:15:00",
    fromOrTo: "to",
    messages: "I'm doing well, thanks!",
    image: "https://picsum.photos/1200/500/?2",
  },
  {
    stamp: "2023-09-30T08:30:00",
    fromOrTo: "from",
    messages: "That's great to hear.",
    image: "https://picsum.photos/1200/500/?3",
  },
  {
    stamp: "2023-09-30T08:45:00",
    fromOrTo: "to",
    messages: "What have you been up to?",
    image: "https://picsum.photos/1200/500/?4",
  },
  {
    stamp: "2023-09-30T09:00:00",
    fromOrTo: "from",
    messages: "Just working on some projects.",
    image: "https://picsum.photos/1200/500/?5",
  },
  {
    stamp: "2023-09-30T09:15:00",
    fromOrTo: "to",
    messages: "Sounds productive.",
    image: "https://picsum.photos/1200/500/?6",
  },
  {
    stamp: "2023-09-30T09:30:00",
    fromOrTo: "from",
    messages: "Yes, it's been a busy day.",
    image: "https://picsum.photos/1200/500/?7",
  },
  {
    stamp: "2023-09-30T09:45:00",
    fromOrTo: "to",
    messages: "I understand. Take a break when you can.",
    image: "https://picsum.photos/1200/500/?8",
  },
];

const sendMessage = () => {
  msgFrom.value.push(myMsg.value);
  myMsg.value = "";
};

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
</script>
