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
        <span class="text-subtitle1 text-weight-light text-primary">Email Address</span>
        <q-input
          dense
          type="email"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Enter your email address *',
            val => emailRegex.test(val) || 'Invalid email address'
          ]"
          v-model="form.email"
        />
        <span class="text-subtitle1 text-weight-light text-primary q-mt-sm">Password</span>
        <q-input
          dense
          lazy-rules
          :type="!isPwd ? 'password' : 'text'"
          :rules="[
            val => val && val.length > 0 || 'Enter your password *',
            val => val.length > 6 || 'Password must be at least 6 characters'
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
import { baseApi } from 'boot/axios';
import { SpinnerTail } from 'src/utils/loading';
import { useRouter } from 'vue-router';
import { debounce } from 'quasar';

defineComponent({
  name: 'LoginPage'
});

const form = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: ''
});
const isPwd = ref(false);
const router = useRouter();
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const sendForm = debounce(async () => {
  try {
    const response = await baseApi.post('/auth/register', { firstname: form.value.firstname, lastname: form.value.lastname, email: form.value.email, password: form.value.password });
    if (response.status === 200) {
      SpinnerTail(true, 'Redirecting to Login please wait...');
      setTimeout(() => {
        SpinnerTail(false);
        router.push('/auth/login');
      }, 3000);
    } else {
      console.error(response);
    }
  } catch (error) {
    throw error;
  } finally {
    SpinnerTail(false);
  }
}, 1500)

const handleRegister = async () => {
  try {
    SpinnerTail(true, 'Checking...');
    await sendForm();
  } catch (error) {
    throw error;
  }
}
</script>
