<template>
  <q-item clickable :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "EssentialLink",
});

const { title, caption, link, icon } = defineProps([
  "title",
  "caption",
  "link",
  "icon",
]);
</script>
