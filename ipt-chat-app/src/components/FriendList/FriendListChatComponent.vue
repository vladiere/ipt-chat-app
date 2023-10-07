<template>
  <q-item clickable v-ripple @click="convertsationFunction(user_id)">
    <q-item-section avatar>
      <q-avatar size="3em" class="q-mb-sm bg-orange text-dark text-capitalize">
        {{ fullname.charAt(0) }}
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1" class="text-capitalize">{{
        fullname
      }}</q-item-label>
      <q-item-label
        :caption="msgstatus === 'unread'"
        :class="msgstatus === 'unread' ? '' : 'text-bold'"
        style="font-size: 12px"
        lines="1"
      >
        {{ message }}
      </q-item-label>
    </q-item-section>

    <q-item-section side top> {{ formatTimeAgo(datesend) }} </q-item-section>
  </q-item>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const formatTimeAgo = (datesend) => {
  const currentDate = new Date();
  const sentDate = new Date(datesend);

  const timeDifference = currentDate - sentDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) {
    return `${seconds} sec ago`;
  } else if (minutes < 60) {
    return `${minutes} min ago`;
  } else if (hours < 24) {
    return `${hours} hr ago`;
  } else {
    const days = Math.floor(hours / 24);
    return `${days} day(s) ago`;
  }
};

const generateSalt = () => {
  const randomNumber = Math.floor(Math.random() * 1000000000);
  const formattedNumber = randomNumber.toString().padStart(10, "0");

  return formattedNumber;
};

const { user_id, fullname, message, datesend, msgstatus } = defineProps([
  "user_id",
  "fullname",
  "message",
  "datesend",
  "msgstatus",
]);

const convertsationFunction = (userid) => {
  const saltingUserId = generateSalt() + userid;
  router.replace({ name: "Chat Room", params: { id: saltingUserId } });
};
</script>
