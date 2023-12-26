<style lang="sass" scoped>
.my-card
  width: 125px
  height: 130px
</style>

<template>
  <div  class="column q-pa-md">
    <div class="row justify-between items-center" >
      <span class="text-h6 text-primary">Available users</span>
    </div>

    <q-separator class="q-my-md" width="100%"/>

    <div v-if="data_object.length === 0" class="flex flex-center text-h6 text-weight-light text-primary" style="height: calc(100vh - 185px)">
      Unfortunately, no users are available right now.
    </div>

    <div class="column q-gutter-y-md">
      <q-virtual-scroll
        style="max-height: calc(100vh - 186px);"
        :items="data_object"
        separator
        v-slot="{ item, index }"
      >
          <q-item :key="index" v-if="item.uuid !== decode.uuid" class="q-my-sm" clickable v-ripple @click="userClicked(item.uuid)">
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ item.firstname.split('')[0].toUpperCase() }}
                <q-badge rounded color="positive" floating  class="q-mt-xs q-mr-xs"/>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-capitalize">{{ item.firstname }} {{ item.lastname }}</q-item-label>
              <q-item-label caption lines="1">{{ item.email }}</q-item-label>
            </q-item-section>

          </q-item>
      </q-virtual-scroll>
    </div>
  </div>

</template>

<script setup lang="ts">
import { jwtDecode } from 'jwt-decode';
import { useUserStore } from 'stores/user-store';
import { useRouter } from 'vue-router';

export interface OnlineUsersProps {
  data_object: object
}

withDefaults(defineProps<OnlineUsersProps>(), {
  data_object: [] as object
});

const router = useRouter()
const userStore = useUserStore();
const decode = jwtDecode(userStore.token);

const userClicked = (uuid: string) => {
  router.replace({ name: 'user_chat', params: { id: uuid }})
}
</script>
