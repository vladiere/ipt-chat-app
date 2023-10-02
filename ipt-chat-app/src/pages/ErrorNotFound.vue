<template>
  <div
    class="fullscreen bg-grey-2 text-grey-10 text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 15vh">404 | Not Found</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="grey-8"
        icon="mdi-step-backward"
        unelevated
        to="/"
        label="Go Home"
        no-caps
        flat
      />
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

defineComponent({
  name: "ErrorNotFound",
});
</script>
