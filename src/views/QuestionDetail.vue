<template>
  <NavBarComponent />
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white shadow rounded-lg p-6">
      <!-- Question -->
      <div class="border-b pb-6">
        <div class="flex justify-between items-start">
          <h1 class="text-2xl font-bold text-gray-900">{{ question.title }}</h1>
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {{ question.subject }}
          </span>
        </div>
        <p class="mt-4 text-gray-600">{{ question.content }}</p>
        <div class="mt-4 flex items-center text-sm text-gray-500">
          <span>Asked by {{ question.author }}</span>
          <span class="mx-2">•</span>
          <span>{{ question.date }}</span>
        </div>
      </div>

      <!-- Answers -->
      <div class="mt-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">{{ answers.length }} Answers</h2>
        
        <div v-for="answer in answers" :key="answer.id" class="border-b last:border-0 py-6">
          <p class="text-gray-600">{{ answer.content }}</p>
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center text-sm text-gray-500">
              <span>Answered by {{ answer.author }}</span>
              <span class="mx-2">•</span>
              <span>{{ answer.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Answer -->
      <div class="mt-8">
        <h3 class="text-lg font-medium text-gray-900">Your Answer</h3>
        <form @submit.prevent="handleSubmitAnswer" class="mt-4">
          <textarea v-model="newAnswer"
                    rows="4"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Write your answer here..."></textarea>
          <button type="submit"
                  class="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Post Answer
          </button>
        </form>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import { ref } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

const question = ref({
  id: 1,
  title: 'How do I solve this quadratic equation?',
  content: 'I\'m having trouble solving x² + 5x + 6 = 0. Can someone help me understand the steps?',
  subject: 'Mathematics',
  author: 'student123',
  date: '2 hours ago'
})

const answers = ref([
  {
    id: 1,
    content: 'To solve this quadratic equation, you can use the following steps...',
    author: 'mathTeacher',
    date: '1 hour ago'
  }
])

const newAnswer = ref('')

const handleSubmitAnswer = () => {
  // Handle answer submission logic here
  console.log('Answer submitted:', newAnswer.value)
  newAnswer.value = ''
}
</script>