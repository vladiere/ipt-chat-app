<template>
  <div class="column q-gutter-y-md">
    <q-toolbar class="text-dark">
      <q-toolbar-title>Friend List</q-toolbar-title>
    </q-toolbar>
    <q-virtual-scroll
      class="col q-px-md"
      :items="newContacts"
      v-slot="{ item, index }"
      style="height: 400px; max-height: 455px"
    >
      <q-list :key="index">
        <q-item class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ item.letter }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption lines="1">{{ item.email }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              name="chat_bubble"
              :color="item.status === 'online' ? 'green' : 'grey'"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </q-virtual-scroll>
  </div>
</template>

<script setup>
const contacts = [
  {
    id: 1,
    name: "Ruddy Jedrzej",
    email: "rjedrzej0@discuz.net",
    letter: "R",
    status: "online",
  },
  {
    id: 2,
    name: "Mallorie Alessandrini",
    email: "malessandrini1@marketwatch.com",
    letter: "M",
    status: "online",
  },
  {
    id: 3,
    name: "Elisabetta Wicklen",
    email: "ewicklen2@microsoft.com",
    letter: "E",
    status: "online",
  },
  {
    id: 4,
    name: "Seka Fawdrey",
    email: "sfawdrey3@wired.com",
    letter: "S",
    status: "online",
  },
  {
    id: 5,
    name: "Brunhilde Panswick",
    email: "bpanswick4@csmonitor.com",
    letter: "B",
    status: "offline",
  },
  {
    id: 6,
    name: "Winfield Stapforth",
    email: "wstapforth5@pcworld.com",
    letter: "W",
    status: "offline",
  },
  {
    id: 7,
    name: "John Doe",
    email: "johndoe@example.com",
    letter: "J",
    status: "online",
  },
  {
    id: 8,
    name: "Jane Smith",
    email: "janesmith@example.com",
    letter: "J",
    status: "offline",
  },
  {
    id: 9,
    name: "Alice Johnson",
    email: "alice@example.com",
    letter: "A",
    status: "online",
  },
  {
    id: 10,
    name: "Bob Brown",
    email: "bob@example.com",
    letter: "B",
    status: "offline",
  },
  {
    id: 11,
    name: "Eva Martinez",
    email: "eva@example.com",
    letter: "E",
    status: "online",
  },
];

const sortUsersByStatus = (users) => {
  return users.sort((a, b) => {
    if (a.status === "online" && b.status === "offline") {
      return -1; // "online" comes before "offline"
    } else if (a.status === "offline" && b.status === "online") {
      return 1; // "offline" comes after "online"
    } else {
      return 0; // Maintain the order for users with the same status
    }
  });
};

const newContacts = sortUsersByStatus(contacts);
</script>
