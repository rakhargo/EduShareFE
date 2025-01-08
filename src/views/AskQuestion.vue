<template>
  <NavBarComponent />
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Ask a Question</h1>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>  
        <label class="block text-sm font-medium text-gray-700">Subject</label>  
        <div class="mt-1 space-y-2">  
          <div v-for="option in subjectOptions" :key="option.value" class="flex items-center">  
            <input type="checkbox" :id="option.value" :value="option.value" v-model="subject"  
                   class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500">  
            <label :for="option.value" class="ml-2 block text-sm text-gray-700">{{ option.label }}</label>  
          </div>  
        </div>  
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
  <FooterComponent />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { postQuestion } from '@/api/question';

const subjectOptions = [  
  { value: 'Mathematics', label: 'Mathematics' },  
  { value: 'Physics', label: 'Physics' },  
  { value: 'Chemistry', label: 'Chemistry' },  
  { value: 'Biology', label: 'Biology' },  
  { value: 'History', label: 'History' },  
  { value: 'Literature', label: 'Literature' }  
]

const subject = ref([])  
const title = ref('')  
const content = ref('')
const userId = sessionStorage.getItem('userId')
const router = useRouter();

const handleSubmit = async () => {
  // Handle question submission logic here
  console.log('Question submitted:', {
    subject: subject.value,
    title: title.value,
    content: content.value
  })

  try {
    const response = await postQuestion(title.value, content.value, subject.value, userId);
    console.log('Post successful:', response);

    // Redirect to Home.vue after a short delay
    router.push('/question/' + response.id);
  } catch (error) {
    console.error('Post failed:', error);

  }

};
</script>