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
        @submit.prevent="handleRegister"
        class="column shadow-2 q-pa-md"
        style="width: 40vw"
      >
        <span class="text-h5 text-weight-light text-primary q-mb-md">Register</span>
        <div class="row q-gutter-x-md">
          <div class="col column">
            <span class="text-subtitle1 text-weight-light text-primary">Firstname</span>
            <q-input
              dense
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Enter your lastname'
              ]"
              v-model="form.firstname"
            />
          </div>
          <div class="col column">
            <span class="text-subtitle1 text-weight-light text-primary">Lastname</span>
            <q-input
              dense
              lazy-rules
              :rules="[
                val => val && val.length > 0 || 'Enter your lastname'
              ]"
              v-model="form.lastname"
            />
          </div>

        </div>
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
            label="Register"
          />
          <q-btn
            label="Login"
            flat
            dense
            no-caps
            to="/auth/login"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import Logo from 'src/assets/logo.png';
import { api } from 'boot/axios';
import SpinnerTail from 'src/utils/loading';
import { useRouter } from 'vue-router';

defineComponent({
  name: 'LoginPage'
});

const form = ref({
  firstname: '',
  lastname: '',
  username: '',
  password: ''
});
const isPwd = ref(false);
const router = useRouter();

const handleRegister = async () => {
  try {
    const response = await api.post('/api/register', { form: form.value });
    if (response.status === 200) {
      SpinnerTail(3000, 'Redirecting to Login please wait...');
      router.push('/auth/login');
    } else {
      console.error(response);
    }
  } catch (error) {
    throw error;
  }
}
</script>
