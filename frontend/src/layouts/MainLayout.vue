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
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Profile</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section>
                    <q-item-label>Logout</q-item-label>
                  </q-item-section>
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
        <!-- <q-btn flat size="lg" to="/" dense padding="0px" icon="mdi-message-text" text-color="primary" /> -->
        <!-- <q-btn flat size="lg" padding="0px" icon="mdi-cog-outline" text-color="primary" /> -->
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
  import { ref } from 'vue';

  const miniState = ref(true);
  const leftDrawerOpen = ref(false);
  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }
  const onItemClick = () => {
    console.log('clicked')
  }
</script>
