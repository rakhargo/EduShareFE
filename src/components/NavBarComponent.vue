<template>
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
            <div v-if="isAuthenticated" class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <!-- <router-link to="/" class="nav-link">Beranda</router-link> -->
              <router-link to="/ask" class="nav-link">Tanya Sekarang</router-link>
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
                  <span class="text-sm text-gray-500">{{ userPoints }} point</span>
                  <div class="relative">
                    <button 
                      @click="toggleProfileMenu" 
                      class="flex items-center space-x-2 nav-link profile-menu-toggle">
                      <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span class="text-sm font-medium text-blue-600">{{ userInitials }}</span>
                      </div>
                    </button>
                    <div v-if="showProfileMenu" 
                         class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 profile-menu">
                      <div class="py-1">
                        <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Profil Saya
                        </router-link>
                        <button @click="handleLogout" 
                                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Keluar
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
</template>

<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { onMounted, ref, onUnmounted } from 'vue';

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
      router.push('/');
      location.reload();
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
        const token = sessionStorage.getItem('accessToken');
        isAuthenticated.value = !!token;
        console.log(token);

    });

    onUnmounted(() => {
        document.removeEventListener('click', closeProfileMenu)
    })
</script>