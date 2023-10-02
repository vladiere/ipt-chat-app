<template>
  <div class="column q-gutter-y-md">
    <q-toolbar class="text-dark">
      <q-toolbar-title>Friend Request</q-toolbar-title>
    </q-toolbar>
    <q-virtual-scroll
      :items="sortedFriendRequests"
      class="col q-px-md"
      v-slot="{ item, index }"
      style="height: 400px; max-height: 455px"
    >
      <q-list :key="index">
        <q-item class="q-my-sm">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ item.name.charAt(0) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption lines="1">{{ item.username }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <div class="row q-gutter-x-sm" v-if="item.status === 'pending'">
              <q-btn
                icon="mdi-account-multiple-plus"
                color="positive"
                flat
                round
                padding="2px"
              >
                <q-tooltip
                  class="bg-grey-10 text-grey-1"
                  :delay="250"
                  anchor="bottom left"
                  self="top middle"
                  >Accept Request</q-tooltip
                >
              </q-btn>
              <q-btn
                icon="mdi-account-multiple-minus"
                flat
                round
                color="negative"
                padding="2px"
              >
                <q-tooltip
                  class="bg-grey-10 text-grey-1"
                  :delay="250"
                  anchor="top left"
                  self="center middle"
                  >Decline Request</q-tooltip
                >
              </q-btn>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-virtual-scroll>
  </div>
</template>

<script setup>
const friendRequests = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    status: "pending",
    stamp: "2023-10-01T08:30:00",
  },
  {
    id: 2,
    name: "Alice Smith",
    username: "alicesmith",
    status: "pending",
    stamp: "2023-10-01T09:15:00",
  },
  {
    id: 3,
    name: "Bob Johnson",
    username: "bobjohnson",
    status: "pending",
    stamp: "2023-10-01T10:45:00",
  },
  {
    id: 4,
    name: "Eva Martinez",
    username: "evamartinez",
    status: "accepted",
    stamp: "2023-09-30T15:20:00",
  },
  {
    id: 5,
    name: "Lucas Brown",
    username: "lucasbrown",
    status: "accepted",
    stamp: "2023-09-30T14:05:00",
  },
  {
    id: 6,
    name: "Sophia Wilson",
    username: "sophiawilson",
    status: "pending",
    stamp: "2023-09-29T17:30:00",
  },
  {
    id: 7,
    name: "Olivia Lee",
    username: "olivialeee",
    status: "pending",
    stamp: "2023-09-29T16:45:00",
  },
  {
    id: 8,
    name: "Liam Clark",
    username: "liamclark",
    status: "accepted",
    stamp: "2023-09-28T11:10:00",
  },
  {
    id: 9,
    name: "Emma Adams",
    username: "emmaadams",
    status: "pending",
    stamp: "2023-09-28T09:30:00",
  },
  {
    id: 10,
    name: "Mia Hall",
    username: "miahall",
    status: "pending",
    stamp: "2023-09-27T20:15:00",
  },
  {
    id: 11,
    name: "David Williams",
    username: "davidwilliams",
    status: "accepted",
    stamp: "2023-09-26T14:30:00",
  },
  {
    id: 12,
    name: "Sophie Turner",
    username: "sophieturner",
    status: "pending",
    stamp: "2023-09-25T19:45:00",
  },
  {
    id: 13,
    name: "Michael Brown",
    username: "michaelbrown",
    status: "accepted",
    stamp: "2023-09-24T12:20:00",
  },
  {
    id: 14,
    name: "Ava Johnson",
    username: "avajohnson",
    status: "pending",
    stamp: "2023-09-23T15:55:00",
  },
  {
    id: 15,
    name: "William Davis",
    username: "williamdavis",
    status: "pending",
    stamp: "2023-09-22T10:10:00",
  },
];

const sortFriendRequestStatus = (requests) => {
  const pendingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const acceptedRequests = requests.filter(
    (request) => request.status === "accepted"
  );
  return [...pendingRequests, ...acceptedRequests];
};

const sortedFriendRequests = sortFriendRequestStatus(friendRequests);
</script>
