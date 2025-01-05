<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Ask a Question</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700">Subject</label>
        <select id="subject" v-model="subject"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
          <option value="">Select a subject</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
          <option value="history">History</option>
          <option value="literature">Literature</option>
        </select>
      </div>

      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Question Title</label>
        <input type="text" id="title" v-model="title"
               class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
               placeholder="What's your question? Be specific.">
      </div>

      <div>
        <label for="content" class="block text-sm font-medium text-gray-700">Question Details</label>
        <textarea id="content" v-model="content" rows="6"
                  class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Provide all the details needed to help others give you a good answer..."></textarea>
      </div>

      <div>
        <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Post Question
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const subject = ref('')
const title = ref('')
const content = ref('')

const handleSubmit = () => {
  // Handle question submission logic here
  console.log('Question submitted:', {
    subject: subject.value,
    title: title.value,
    content: content.value
  })
}
</script>