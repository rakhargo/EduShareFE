<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="flex items-center space-x-2">
                <span class="text-3xl">🧠</span>
                <span class="text-2xl font-bold text-blue-600">EduShare</span>
              </router-link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link to="/" class="nav-link">Home</router-link>
              <router-link to="/ask" class="nav-link">Ask Question</router-link>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <template v-if="!isAuthenticated">
                <router-link to="/login" class="btn-secondary mr-2">Login</router-link>
                <router-link to="/register" class="btn-primary">Register</router-link>
              </template>
              <template v-else>
                <div class="flex items-center space-x-4">
                  <span class="text-sm text-gray-500">12 points</span>
                  <router-link to="/profile" class="flex items-center space-x-2 nav-link">
                    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-blue-600">JD</span>
                    </div>
                    <span class="hidden md:inline">Profile</span>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer class="bg-white border-t mt-12">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">About Us</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Careers</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Help Center</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Safety Center</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Community Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Terms of Service</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase">Connect</h3>
            <ul class="mt-4 space-y-4">
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Twitter</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Facebook</a></li>
              <li><a href="#" class="text-base text-gray-500 hover:text-gray-900">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-8">
          <p class="text-base text-gray-400 text-center">
            © 2024 EduShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isAuthenticated = ref(false)
</script>

<style>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-blue-600;
}
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors;
}
.btn-secondary {
  @apply bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors;
}
</style>