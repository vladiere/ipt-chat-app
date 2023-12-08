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
        @submit.prevent="sendForm"
        autocomplete="off"
        class="column shadow-2 q-pa-md"
        style="width: 320px"
      >
        <span class="text-h5 text-weight-light text-primary q-mb-md">Login</span>
        <span class="text-subtitle1 text-weight-light text-primary">Email address</span>
        <q-input
          dense
          lazy-rules
          type="email"
          :rules="[
            val => val && val.length > 0 || 'Enter your email address *',

          ]"
          v-model="form.email"
        />
        <span class="text-subtitle1 text-weight-light text-primary q-mt-sm">Password</span>
        <q-input
          dense
          lazy-rules
          :type="!isPwd ? 'password' : 'text'"
          :rules="[
            val => val && val.length > 0 || 'Enter your password *'
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
import { SpinnerTail } from 'src/utils/loading';
import { baseApi } from 'boot/axios';
import { useUserStore } from 'stores/user-store';
import { useRouter } from 'vue-router';
import { socket } from 'src/utils/socket';
import { Notify, debounce } from 'quasar';

defineComponent({
  name: 'LoginPage'
});

const form = ref({
  username: '',
  password: ''
});
const isPwd = ref(false);
const userStore = useUserStore();
const router = useRouter()


const handleLogin = debounce(async () => {
  try {
    const response = await baseApi.post('/auth/login', { email: form.value.email, password: form.value.password });

    if(response.data.status === 200) {
      userStore.initTokens(response.data);
      SpinnerTail(true, 'Redirecting to homepage please wait...');
      socket.emit('user_connected');
      router.push('/');
    } else {
      Notify.create({
        message: response.data.message,
        position: 'top',
        type: 'negative',
        timeout: 2300,
        progress: true
      });
    }
  } catch (error) {
    throw error;
  } finally {
    SpinnerTail(false);
  }
}, 1500);

const sendForm = async () => {
  try {
    SpinnerTail(true, 'Loading...');
    await handleLogin();
  } catch (error) {
    throw error;
  }
}
</script>
