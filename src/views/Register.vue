<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Buat Akun Anda</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div v-if="message" class="p-4 text-center rounded-md" :class="messageType">
          {{ message }}
        </div>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Nama Pengguna</label>
            <input id="name" v-model="name" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                   placeholder="Full name">
          </div>
          <div>
            <label for="email" class="sr-only">Alamat Email</label>
            <input id="email" v-model="email" type="email" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                   placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Kata Sandi</label>
            <input id="password" v-model="password" type="password" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                   placeholder="Password">
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Daftar
          </button>
        </div>

        <div class="text-center">
          <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
            Sudah Punya Akun? Masuk
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/api/user';

const name = ref('');
const email = ref('');
const password = ref('');
const message = ref(''); // To display success or error messages
const messageType = ref(''); // To style the message
const router = useRouter(); // Initialize the router

const handleRegister = async () => {
  try {
    const response = await registerUser(name.value, email.value, password.value);
    console.log('Register successful:', response);

    // Show a success message
    message.value = 'Pendaftaran Berhasil! Mengalihkan ke halaman masuk...';
    messageType.value = 'bg-green-100 text-green-700'; // Success style

    // Redirect to Home.vue after a short delay
    setTimeout(() => {
      router.push({ name: 'Login' });
    }, 1500);
  } catch (error) {
    console.error('Login failed:', error);

    // Show an error message
    message.value = 'Login failed: ' + (error.message || 'Unknown error');
    messageType.value = 'bg-red-100 text-red-700'; // Error style
  }
};
</script>