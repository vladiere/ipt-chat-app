<template>
  <q-page padding class="bg-blue-1">
    <div class="row q-gutter-x-sm">
      <LeftMenuComponent class="col-3"/>
      <ChatComponent class="col"/>
      <RightMenuComponent class="col-3"/>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

defineComponent({
  name: 'IndexPage'
});

const LeftMenuComponent = defineAsyncComponent({
  loader: () => import('components/LeftMenuComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: true
});

const ChatComponent = defineAsyncComponent({
  loader: () => import('components/ChatComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: true
});

const RightMenuComponent = defineAsyncComponent({
  loader: () => import('components/RightMenuComponent.vue'),
  delay: 300,
  timeout: 2300,
  suspensible: true
});

</script>
