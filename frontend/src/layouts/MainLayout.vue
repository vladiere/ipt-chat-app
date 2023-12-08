<template>
  <q-layout view="hHr LpR lFr">

    <q-header elevated >
      <q-toolbar>
        <q-btn dense flat size="lg" icon="mdi-sort-variant" @click="toggleLeftDrawer" />

        <q-space/>

        <q-item>
          <q-item-section avatar>
            <q-avatar color="blue-10" text-color="grey-2">
              L
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>Vladiere Kazhu Blecks</q-item-label>
            <q-item-label caption>Available</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-btn-dropdown color="grey-9" flat dense dropdown-icon="mdi-chevron-down">
              <q-list dense>
                <q-item clickable v-close-popup @click="onItemClick('profile')">
                  <q-item-section avatar>
                    <q-icon name="mdi-account" />
                  </q-item-section>

                  <q-item-section> Profile </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick('logout')">
                  <q-item-section avatar>
                    <q-icon name="mdi-logout" />
                  </q-item-section>

                  <q-item-section> Logout </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-item-section>
        </q-item>

      </q-toolbar>
    </q-header>

    <q-drawer
      elevated
      show-if-above
      v-model="leftDrawerOpen"
      side="left"

      :mini="miniState"
      :width="200"
      :breakpoint="500"
      class="bg-blue-1"
    >
        <q-list padding class="q-mt-lg">
            <q-item clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-message-text" />
              </q-item-section>
              <q-tooltip class="bg-grey-10 text-grey-2" :delay="200" anchor="bottom right" self="top middle">Messages</q-tooltip>
            </q-item>

            <q-item clickable v-ripple to="/settings">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-cog-outline" />
              </q-item-section>
              <q-tooltip class="bg-grey-10 text-grey-2" :delay="200" anchor="bottom right" self="top middle">Settings</q-tooltip>
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
import { debounce } from 'quasar';
import { SpinnerTail } from 'src/utils/loading';
import userDetails from 'src/utils/getUser';

const miniState = ref(true);
const router = useRouter();
const userStore = useUserStore();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const handleLogoutUser = debounce(async() => {
  try {
    userStore.logout();
    router.push('/auth/login')
  } catch (error) {
    throw error;
  } finally {
    SpinnerTail(false);
  }
}, 1500);

const onItemClick = async (options: string) => {
  console.log(options)
  if (options === 'logout') {
    SpinnerTail(true,'Logging out');
    await handleLogoutUser();
  } else {
    router.push({ name: options });
  }
}

onMounted(async () => {
  await userDetails.getUserDetails();
})
</script>
