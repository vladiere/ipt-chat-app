<template>
  <q-page padding class="bg-grey-4">
    <div class="relative">
      <q-form
        greedy
        class="absolute-center column"
        style="width: 40%"
        @submit.prevent="handleRegister"
        @reset="ifSuccess"
      >
        <span class="text-h4 text-bold self-center q-mb-lg"
          >Register your account</span
        >
        <div class="col row q-gutter-x-md q-pb-sm">
          <q-input
            label="Lastname"
            v-model="form.lastname"
            color="orange"
            label-color="dark"
            outlined
            class="col"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your lastname',
            ]"
          />
          <q-input
            label="Firstname"
            v-model="form.firstname"
            color="orange"
            label-color="dark"
            outlined
            class="col"
            :rules="[
              (val) => (val && val.length > 0) || 'Please enter your firstname',
            ]"
          />
        </div>
        <div class="col column q-gutter-y-sm q-pb-sm">
          <q-input
            label="Username"
            v-model="form.username"
            color="orange"
            label-color="dark"
            outlined
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Please enter your unique username',
            ]"
          />
          <q-input
            label="Password"
            outlined
            v-model="form.password"
            color="orange"
            label-color="dark"
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
        </div>
        <div class="row justify-between">
          <q-btn
            flat
            label="Back to Login"
            no-caps
            color="dark"
            class="self-center"
            icon="mdi-arrow-left"
            rounded
            to="/"
          />
          <q-btn
            color="orange"
            text-color="dark"
            label="Register"
            type="submit"
            class="self-center"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from "vue";
import { jwtApi } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

defineComponent({
  name: "RegisterPage",
});

const isPwd = ref(true);
const $q = useQuasar();
const ifSuccess = ref(false);
const router = useRouter();
const form = ref({
  firstname: "",
  lastname: "",
  username: "",
  password: "",
});

const handleRegister = async () => {
  try {
    await jwtApi.post("/user/register", { form: form.value });
    ifSuccess.value = true;

    $q.notify({
      message: "Sucessfully register",
      position: "top-right",
      type: "positive",
    });
    router.push("/");
  } catch (error) {
    throw new Error(error);
  }
};
</script>
