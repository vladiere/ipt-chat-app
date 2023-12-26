<template>
  <q-layout :view="Platform.is.mobile ? 'hhh lpR fFf' : 'hHr LpR lFr'">

    <q-header bordered class="bg-blue-1 text-dark">
      <q-toolbar>
        <q-btn v-if="Platform.is.mobile" dense flat size="lg" icon="mdi-sort-variant" @click="toggleLeftDrawer" />

        <q-space/>

        <span class="text-capitalize">{{ userStore.user.firstname }} {{ userStore.user.lastname }}</span>

        <q-btn flat label="Logout" no-caps @click="onItemClick"/>

      </q-toolbar>
    </q-header>

    <q-drawer
      bordered
      show-if-above
      v-model="leftDrawerOpen"
      v-if="Platform.is.mobile"
      side="left"
      :mini="miniState"
      :width="Platform.is.mobile ? 220 : 200"
      :breakpoint="500"
      class="bg-blue-1"
    >
        <q-list padding class="q-mt-lg">

            <q-item v-if="Platform.is.mobile" clickable v-ripple :to="{ name: 'user_home', query: { _: 'chats' }}">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-account-group" />
              </q-item-section>

              <q-item-section>
                User Chats
              </q-item-section>

              <q-tooltip class="bg-grey-10 text-grey-2" :delay="200" anchor="bottom right" self="top middle">User Chats</q-tooltip>
            </q-item>

            <q-item v-if="Platform.is.mobile" clickable v-ripple :to="{ name: 'user_home', query: { _: 'available' }}">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-web" />
              </q-item-section>

              <q-item-section>
                Available Users
              </q-item-section>


              <q-tooltip class="bg-grey-10 text-grey-2" :delay="200" anchor="bottom right" self="top middle">Available users</q-tooltip>
            </q-item>

          </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from 'stores/user-store';
import { useRouter } from 'vue-router';
import { debounce, Platform } from 'quasar';
import { SpinnerTail } from 'src/utils/loading';
import userDetails from 'src/utils/getUser';
import { socket } from 'src/utils/socket';
import { jwtDecode } from 'jwt-decode';

const miniState = ref(true);
const router = useRouter();
const userStore = useUserStore();
const leftDrawerOpen = ref(false);
const decode = jwtDecode(userStore.token);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const handleLogoutUser = debounce(async() => {
  try {
    userStore.logout();
    socket.emit('user_logout', decode.uuid);
    router.push('/auth/login')
  } catch (error) {
    throw error;
  } finally {
    SpinnerTail(false);
  }
}, 1500);

const onItemClick = async () => {
  SpinnerTail(true,'Logging out');
  await handleLogoutUser();
}

onMounted(async () => {
  await userDetails.getUserDetails();

  socket.emit('online_user',decode.uuid);

})
</script>
