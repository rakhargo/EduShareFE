<template>
  <NavBarComponent />
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Masuk ke Akun Anda</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div v-if="message" class="p-4 text-center rounded-md" :class="messageType">
          {{ message }}
        </div>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email" class="sr-only">Email address</label>
            <input id="email" v-model="email" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                   placeholder="Nama Pengguna">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="password" type="password" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                   placeholder="Kata Sandi">
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Masuk
          </button>
        </div>

        <div class="text-center">
          <router-link to="/register" class="text-sm text-blue-600 hover:text-blue-500">
            Belum Punya Akun? Daftar
          </router-link>
        </div>
      </form>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser, loginResponse } from '@/api/user';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

const email = ref('');
const password = ref('');
const message = ref(''); // To display success or error messages
const messageType = ref(''); // To style the message
const router = useRouter(); // Initialize the router

const handleLogin = async () => {
  try {
    const response = await loginUser(email.value, password.value);
    console.log('Login successful:', response);

    // Save the id and access_token to sessionStorage
    loginResponse(response);

    // Redirect to a protected route or show a success message
    message.value = 'Login berhasil! Mengalihkan...';
    messageType.value = 'bg-green-100 text-green-700';
    setTimeout(() => {
      router.push({ name: 'Home' });
    }, 1500);
  } catch (error) {
    console.error('Login failed:', error);

    // Show an error message
    message.value = 'Login failed: ' + (error.message || 'Unknown error');
    messageType.value = 'bg-red-100 text-red-700';
  }
};

</script>
