<template>
  <q-page padding class="bg-grey-4">
    <q-splitter
      v-model="splitterModel"
      style="height: 95vh;"
    >
    <template v-slot:before>
      <div class="q-pa-md column full-height">
        <div class="col column justify-center content-center q-gutter-y-md">

          <div class="text-h3 text-bold">
            <span class="bg-purple-13 q-px-md text-white">Amici</span>
            <span class="text-blue-10">Kodiert</span>
          </div>
          <div class="text-h5 text-grey-10">
            "Unlock Connections, Embrace Friendship - Welcome to Amici Kodiert!</div>
        </div>
      </div>
    </template>
    <template v-slot:after>
      <div class="q-pa-md column full-height">
        <q-form
        greedy
        @submit.prevent="handleLogin"
        class="col column justify-center q-gutter-y-md"
        >
        <span class="text-h4 text-bold">Login</span>
        <q-input
          label="Username"
          v-model="form.username"
          outlined
          filled
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter your username',
          ]"
        />
        <q-input
          label="Password"
          outlined
          filled
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter your password',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn
          label="Login"
          color="purple-13"
          text-color="grey-3"
          type="submit"
          :loading="loading"
        />
        <q-btn label="Register" no-caps color="blue-10" flat to="/register" />
      </q-form>
      </div>
    </template>
  </q-splitter>
    <!-- <div :class="$q.platform.is.mobile ? 'column' : 'relative'">
      <q-form
        greedy
        @submit.prevent="handleLogin"
        :class="
          $q.platform.is.mobile
            ? 'absolute-center column'
            : 'absolute-center column q-gutter-y-xs'
        "
        :style="$q.platform.is.mobile ? 'width: 95vw' : 'width: 25%'"
      >
        <q-input
          label="Username"
          v-model="form.username"
          outlined
          filled
          :rules="[
            (val) => (val && val.length > 0) || 'please enter your username',
          ]"
        />
        <q-input
          label="Password"
          outlined
          filled
          v-model="form.password"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter your password',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn
          label="Login"
          color="primary"
          text-color="grey-3"
          type="submit"
          :loading="loading"
        />
        <q-btn label="Register" no-caps flat to="/register" />
      </q-form>
    </div> -->
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

defineComponent({
  name: "LoginPage",
});

const isPwd = ref(true);
const splitterModel = ref(70)
const router = useRouter();
const $q = useQuasar();
const form = ref({
  username: "",
  password: "",
});
const loading = ref(false);

const handleLogin = async () => {
  try {
    const response = await api.post("/user/login", { form: form.value });

    $q.sessionStorage.set(
      "token",
      response.data.id + " " + response.data.token
    );
    loading.value = true;
    router.push("/");
  } catch (error) {
    throw new Error(error);
  }
};
</script>
