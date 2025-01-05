<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white shadow rounded-lg">
      <!-- Profile Header -->
      <div class="px-6 py-8 border-b">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
              <span class="text-2xl font-bold text-blue-600">{{ userInitials }}</span>
            </div>
          </div>
          <div class="ml-6">
            <h1 class="text-2xl font-bold text-gray-900">{{ user.name }}</h1>
            <p class="text-sm text-gray-500">Member since {{ user.joinDate }}</p>
          </div>
        </div>
      </div>

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
            <p class="text-2xl font-bold text-gray-900">{{ stats.helpfulVotes }}</p>
            <p class="text-sm text-gray-500">Helpful Votes</p>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="px-6 py-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div class="space-y-4">
          <div v-for="activity in recentActivity" :key="activity.id" 
               class="border-l-4 border-blue-500 pl-4 py-2">
            <p class="text-sm text-gray-600">{{ activity.action }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ activity.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const user = ref({
  name: 'John Doe',
  joinDate: 'January 2024'
})

const userInitials = computed(() => {
  return user.value.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
})

const stats = ref({
  questions: 15,
  answers: 42,
  helpfulVotes: 128
})

const recentActivity = ref([
  {
    id: 1,
    action: 'Asked a question about Mathematics',
    date: '2 hours ago'
  },
  {
    id: 2,
    action: 'Answered a question about Physics',
    date: '1 day ago'
  },
  {
    id: 3,
    action: 'Received a helpful vote',
    date: '2 days ago'
  }
])
</script>