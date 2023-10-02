<template>
  <q-page padding class="q-gutter-md">
    <!-- content -->
    <q-input outlined rounded label="Search..." dense>
      <template v-slot:append>
        <q-icon name="mdi-magnify" />
      </template>
    </q-input>
    <q-separator />
    <div class="row gutter-x-md">
      <FriendSearchComponent class="col" />
      <q-separator vertical />
      <FriendRequestComponent class="col" />
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent } from "vue";
import FriendSearchComponent from "components/FriendsSearchComponent.vue";
import FriendRequestComponent from "components/FriendRequestComponent.vue";

defineComponent({
  name: "DiscoverNewPeople",
});
</script>
