<template>
  <div class="column q-pt-md q-px-md rounded-borders relative-position">
    <div class="row justify-between">
      <div class="row q-gutter-x-sm items-center">
        <span class="text-h6 text-capitalize">lance phillip descartin</span>
        <div class="bg-green q-pa-xs" style="border-radius: 50%">
        </div>
      </div>

      <div class="row q-gutter-x-xs">
        <q-btn
          icon="mdi-paperclip"
          flat
          dense
          color="grey-8"
        />
        <q-btn-dropdown color="grey-8" flat round dense dropdown-icon="mdi-dots-vertical">
          <q-list dense>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Block</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <q-separator class="q-my-md"/>
    <q-scroll-area
      style="height: calc(100vh - 220px); width: 100%; box-shadow: inset 0px 0px 21px -7px rgba(0, 0, 0, 1);"
      class="q-px-md q-py-sm"
    >
      <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
              <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
              <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
              <q-chat-message
        name="me"
        avatar="https://cdn.quasar.dev/img/avatar1.jpg"
        :text="['hey, how are you?']"
        stamp="7 minutes ago"
        sent
        bg-color="amber-7"
      />
      <q-chat-message
        name="Jane"
        avatar="https://cdn.quasar.dev/img/avatar5.jpg"
        :text="['doing fine, how r you?']"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="primary"
      />
    </q-scroll-area>
    <div class="column q-px-md absolute-bottom">
      <q-input
        placeholder="Type something..."
        dense
        outlined
        />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { date } from 'quasar';
  const formattedString = (date_send: string) => date.formatDate(date_send, 'MMM-D-YYYY');

  const onItemClick = () => {
    console.log('clicked');
  }
</script>
