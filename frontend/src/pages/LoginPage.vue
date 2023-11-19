<style lang="sass" scoped>
img
  width: 30%
</style>

<template>
  <q-page padding class="bg-blue-1 flex flex-center">
    <div class="column items-center q-gutter-y-lg">
      <img :src="Logo" />
      <q-form
        greedy
        @submit.prevent="handleLogin"
        class="column shadow-2 q-pa-md"
        style="width: 320px"
      >
        <span class="text-h5 text-weight-light text-primary q-mb-md">Login</span>
        <span class="text-subtitle1 text-weight-light text-primary">Username</span>
        <q-input
          dense
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Enter your username'
          ]"
          v-model="form.username"
        />
        <span class="text-subtitle1 text-weight-light text-primary q-mt-sm">Password</span>
        <q-input
          dense
          lazy-rules
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            val => val && val.length > 0 || 'Enter your password'
          ]"
          v-model="form.password"
        >
          <template v-slot:append>
            <q-icon :name="isPwd ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" @click="isPwd = !isPwd" />
          </template>
        </q-input>
        <div class="row justify-between q-mt-md">
          <q-btn
            dense
            type="submit"
            padding="2px 30px"
            color="primary"
            no-caps
            label="Login"
          />
          <q-btn
            label="Register"
            flat
            dense
            no-caps
            to="/auth/register"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import Logo from 'src/assets/logo.png';

defineComponent({
  name: 'LoginPage'
});

const form = ref({
  username: '',
  password: ''
});
const isPwd = ref(false);

const handleLogin = async () => {
  try {
    console.log(form.value);
  } catch (error) {
    throw error;
  }
}
</script>
