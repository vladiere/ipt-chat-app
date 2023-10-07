<template>
  <q-page padding class="bg-grey-4">
    <q-splitter v-model="splitterModel" style="height: 95vh">
      <template v-slot:before>
        <div class="q-pa-md column full-height">
          <div class="col column justify-center content-center q-gutter-y-md">
            <q-img
              src="src/assets/discussion.png"
              fit="cover"
              style="width: 10%"
            />
            <div class="row text-h3 text-bold">
              <span class="text-dark">Amici</span>
              <span class="bg-orange text-dark q-px-md">Viestintä</span>
            </div>
            <div class="text-h5 text-grey-10">
              "Unlock Connections, Embrace Friendship - Welcome to Amici
              Viestintä!
            </div>
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
              color="orange"
              label-color="dark"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter your username',
              ]"
            />
            <q-input
              label="Password"
              outlined
              color="orange"
              label-color="dark"
              v-model="form.password"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'Please enter your password',
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
              color="orange"
              text-color="grey-10"
              type="submit"
              :loading="loading"
            />
            <q-btn label="Register" no-caps color="dark" flat to="/register" />
          </q-form>
        </div>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { jwtApi } from "src/boot/axios";
import { SessionStorage } from "quasar";
import { useRouter } from "vue-router";

defineComponent({
  name: "LoginPage",
});

const isPwd = ref(true);
const splitterModel = ref(70);
const router = useRouter();
const form = ref({
  username: "",
  password: "",
});
const loading = ref(false);

const handleLogin = async () => {
  try {
    const response = await jwtApi.post("/user/login", { form: form.value });

    SessionStorage.set("token", response.data.accessToken);
    SessionStorage.set("refresh", response.data.refreshToken);

    loading.value = true;
    router.push("/");
  } catch (error) {
    throw new Error(error);
  }
};
</script>
