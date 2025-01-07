<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white shadow rounded-lg">
      <!-- Profile Header -->
      <div class="px-6 py-8 border-b">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                <span class="text-2xl font-bold text-blue-600">{{ userInitials }}</span>
              </div>
            </div>
            <div class="ml-6">
              <h1 class="text-2xl font-bold text-gray-900">{{ user.username }}</h1>
              <p class="text-sm text-gray-500">Member since {{ formatDate(user.joinDate) }}</p>
            </div>
          </div>
          <button @click="isEditing = !isEditing" 
                  class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            {{ isEditing ? 'View Profile' : 'Edit Profile' }}
          </button>
        </div>
      </div>

      <!-- View Mode -->
      <template v-if="!isEditing">
        <!-- Stats -->
        <div class="px-6 py-4 border-b">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.questions }}</p>
              <p class="text-sm text-gray-500">Questions</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.answers }}</p>
              <p class="text-sm text-gray-500">Answers</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.reputation }}</p>
              <p class="text-sm text-gray-500">Reputation</p>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-medium text-gray-900 mb-2">About</h2>
          <p class="text-gray-600">{{ user.bio || 'No bio provided yet.' }}</p>
        </div>

        <!-- Recent Activity -->
        <div class="px-6 py-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" 
                 class="border-l-4 border-blue-500 pl-4 py-2">
              <p class="text-sm text-gray-600">{{ activity.action }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ formatDate(activity.date) }}</p>
            </div>
          </div>
        </div>
      </template>

      <!-- Edit Mode -->
      <template v-else>
        <form @submit.prevent="handleUpdateProfile" class="px-6 py-6 space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" v-model="editForm.username"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" v-model="editForm.email"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea id="bio" v-model="editForm.bio" rows="4"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="isEditing = false"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loginUser } from '@/api/user'

const isEditing = ref(false)

const user = ref({
  username: '',
  email: '',
  bio: '',
  joinDate: new Date()
})

const userInitials = ref('')
const stats = ref({
  questions: 0,
  answers: 0,
  reputation: 0
})

const recentActivity = ref([])

const editForm = ref({
  username: '',
  email: '',
  bio: ''
})

const fetchUserData = async () => {
  try {
    const storedId = sessionStorage.getItem('userId')
    const accessToken = sessionStorage.getItem('accessToken')

    if (!storedId || !accessToken) throw new Error('User not authenticated')

    // Simulate API call for user data (replace with actual API)
    const response = await loginUser(storedId)
    user.value = response
    userInitials.value = user.value.username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
    editForm.value = { ...user.value }
  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

const handleUpdateProfile = async () => {
  try {
    console.log('Updating user profile:', editForm.value)
    isEditing.value = false
  } catch (error) {
    console.error('Failed to update profile:', error)
  }
}

onMounted(fetchUserData)
</script>
