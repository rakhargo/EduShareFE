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
                  <span class="text-sm text-gray-500">{{ userPoints }} points</span>
                  <div class="relative">
                    <button 
                      @click="toggleProfileMenu" 
                      class="flex items-center space-x-2 nav-link profile-menu-toggle">
                      <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-sm font-medium text-blue-600">{{ userInitials }}</span>
                      </div>
                    </button>
                    <!-- Profile Dropdown -->
                    <div v-if="showProfileMenu" 
                         class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 profile-menu">
                      <div class="py-1">
                        <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          My Profile
                        </router-link>
                        <button @click="handleLogout" 
                                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
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
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
        &copy; 2025 EduShare. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const showProfileMenu = ref(false)
const isAuthenticated = ref(false)
const userPoints = ref(120) // Simulate user points
const userInitials = ref('JD') // Simulate user initials

if (sessionStorage.getItem('accessToken')) {
  isAuthenticated.value = true;
}

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const handleLogout = () => {
  // Clear sessionStorage
  sessionStorage.clear();
  isAuthenticated.value = false;
  showProfileMenu.value = false;

  console.log('User logged out');

  // Redirect to the login page
  router.push({ name: 'Login' });
}

// Close profile menu when clicking outside
const closeProfileMenu = (e) => {
  const toggleButton = e.target.closest('.profile-menu-toggle');
  const menu = e.target.closest('.profile-menu');
  
  // Close menu only if the click is outside both the menu and toggle button
  if (!toggleButton && !menu) {
    showProfileMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeProfileMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeProfileMenu)
})
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
