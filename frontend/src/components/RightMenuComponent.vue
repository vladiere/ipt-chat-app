<style lang="sass" scoped>
.my-card
  width: 125px
  height: 130px
</style>

<template>
  <div class="column q-pa-md shadow-3">
    <div class="row justify-between items-center" >
      <span class="text-h6 text-primary">Pictures sent</span>
      <q-btn
        flat
        dense
        round
        icon="mdi-delete-empty-outline"
        color="primary"
      >
        <q-tooltip class="bg-grey-10 text-grey-2" :delay="200" anchor="bottom left" self="top middle">Delete all pictures</q-tooltip>
      </q-btn>
    </div>

    <q-separator class="q-my-md" />

    <div v-if="false" class="flex flex-center text-h6 text-weight-light text-primary" style="height: calc(100vh - 185px)">
      Unfortunately, no pictures were sent in the message.
    </div>

    <q-scroll-area
      style="height: calc(100vh - 185px); width: 100%"
      >
      <div class="row q-gutter-md justify-center">
        <q-card class="my-card" v-for="img in 10" :key="img">
          <q-img :src="'https://picsum.photos/1200/900?random=' + img" fit="fill" height="130px">
            <div class="absolute-bottom text-subtitle2 text-center">
              Title
            </div>
          </q-img>
        </q-card>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup lang="ts">

</script>
