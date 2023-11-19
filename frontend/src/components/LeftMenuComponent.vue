<template>
  <div class=" column q-pa-md shadow-4 rounded-borders">
    <div class="row justify-between">
      <span class="text-h6 text-primary">Chat</span>
      <q-btn
        label="new"
        color="grey-5"
        text-color="grey-8"
        dense
        padding="2px 25px"
        />
    </div>
    <q-separator class="q-my-md"/>
    <div class="column q-gutter-y-md">
      <q-virtual-scroll
        style="max-height: calc(100vh - 186px);"
        :items="sampleData"
        separator
        v-slot="{ item, index }"
      >
      <q-item :key="index" class="q-my-sm" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ item.user_fullname.split('')[0] }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ item.user_fullname }}</q-item-label>
          <q-item-label caption lines="2">{{ item.message }}</q-item-label>
        </q-item-section>

        <q-item-section side>

        </q-item-section>
      </q-item>
      </q-virtual-scroll>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface ConversationProps {
    user_id: number;
    user_fullname: string;
    to_id: number;
    message: string;
    date_send: string;
  }

  const sampleData: ConversationProps[] = [
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 2,
      message: 'Hello there!',
      date_send: '2023-11-19T10:30:00',
    },
    {
      user_id: 2,
      user_fullname: 'Jane Smith',
      to_id: 1,
      message: 'Hi John! How are you?',
      date_send: '2023-11-19T11:15:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 2,
      message: "I'm doing well, thanks! How about you?",
      date_send: '2023-11-19T12:00:00',
    },
    {
      user_id: 2,
      user_fullname: 'Jane Smith',
      to_id: 1,
      message: "I'm good too. Any plans for the weekend?",
      date_send: '2023-11-19T12:30:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 3,
      message: 'Hey Mark, long time no see!',
      date_send: '2023-11-19T14:00:00',
    },
    {
      user_id: 3,
      user_fullname: 'Mark Johnson',
      to_id: 1,
      message: 'Hi John! Yeah, it\'s been a while. How have you been?',
      date_send: '2023-11-19T14:30:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 3,
      message: 'I\'ve been great, thanks! Just busy with work.',
      date_send: '2023-11-19T15:00:00',
    },
    {
      user_id: 3,
      user_fullname: 'Mark Johnson',
      to_id: 1,
      message: 'I understand. Work can be hectic. Any exciting projects?',
      date_send: '2023-11-19T15:30:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 4,
      message: 'Hello Sarah! How\'s your day going?',
      date_send: '2023-11-19T16:00:00',
    },
    {
      user_id: 4,
      user_fullname: 'Sarah Brown',
      to_id: 1,
      message: 'Hi John! It\'s been good. How about yours?',
      date_send: '2023-11-19T16:30:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 4,
      message: 'Busy day, but productive. Any exciting plans for the evening?',
      date_send: '2023-11-19T17:00:00',
    },
    {
      user_id: 4,
      user_fullname: 'Sarah Brown',
      to_id: 1,
      message: 'Not much planned. Probably just relaxing at home.',
      date_send: '2023-11-19T17:30:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 5,
      message: 'Hey Michael! Did you see the latest tech news?',
      date_send: '2023-11-19T18:00:00',
    },
    {
      user_id: 5,
      user_fullname: 'Michael Johnson',
      to_id: 1,
      message: 'Hi John! No, what\'s the latest buzz?',
      date_send: '2023-11-19T18:30:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 5,
      message: 'There\'s a new breakthrough in AI research. Fascinating stuff!',
      date_send: '2023-11-19T19:00:00',
    },
    {
      user_id: 5,
      user_fullname: 'Michael Johnson',
      to_id: 1,
      message: 'That sounds interesting! I\'ll check it out.',
      date_send: '2023-11-19T19:30:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 6,
      message: 'Hello Emily! How\'s your week going so far?',
      date_send: '2023-11-19T20:00:00',
    },
    {
      user_id: 6,
      user_fullname: 'Emily Davis',
      to_id: 1,
      message: 'Hi John! It\'s been good. Just a bit hectic with deadlines.',
      date_send: '2023-11-19T20:30:00',
    },
    {
      user_id: 1,
      user_fullname: 'John Doe',
      to_id: 6,
      message: 'I can relate. If you need any help, feel free to ask!',
      date_send: '2023-11-19T21:00:00',
    },
    {
      user_id: 6,
      user_fullname: 'Emily Davis',
      to_id: 1,
      message: 'Thanks, John! I appreciate it.',
      date_send: '2023-11-19T21:30:00',
    },
  ];
</script>
