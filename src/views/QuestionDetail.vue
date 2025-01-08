<template>  
  <NavBarComponent />  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">  
    <div class="bg-white shadow rounded-lg p-6">  
      <!-- Question -->  
      <div class="border-b pb-6" v-if="!isLoading && question">  
        <div class="flex justify-between items-start">  
          <h1 class="text-2xl font-bold text-gray-900">  
            {{ question.title }}  
          </h1>  
          <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">  
            {{ question.tags.join(', ') }} <!-- Assuming tags is an array -->  
          </span>  
        </div>  
        <p class="mt-4 text-gray-600">  
          {{ question.content }}  
        </p>  
        <div class="mt-4 flex items-center text-sm text-gray-500">  
          <span>Ditanyakan Oleh {{ question.authorName }}</span>  
          <span class="mx-2">•</span>  
          <span>{{ formatDate(question.createdAt) }}</span>  
        </div>  
      </div>  
      <div v-else-if="isLoading">  
        <LoadingComponent /> <!-- Use your LoadingComponent here -->  
      </div>  
      <div v-else>  
        <p class="text-gray-600">Question not found.</p>  
      </div>  
  
      <!-- Answers -->  
      <div class="mt-8">  
        <h2 class="text-xl font-bold text-gray-900 mb-4" v-if="!isLoading && question">{{ question.answers.length }} Jawaban</h2>  
          
        <div v-if="!isLoading && question.answers.length > 0">  
          <div v-for="answer in question.answers" :key="answer.id" class="border-b last:border-0 py-6">
            <div class="flex items-start space-x-4">
              <div class="flex flex-col items-center">
                <!-- Upvote Icon -->
                <i class="bi bi-arrow-up-circle text-2xl"
                  :style="{ color: answer.isUpvoted ? 'blue' : 'black' }"
                  @click="toggleUpvote(answer)">
                </i>

                <!-- Upvote Count (on the bottom of the icon) -->
                <p class="text-sm text-gray-500 mt-1">{{ answer.upvotes }}</p>
              </div>
              
              <!-- Answer Content -->
              <div>
                <p class="text-gray-600">{{ answer.content }}</p>  
                <div class="mt-2 flex items-center text-sm text-gray-500">  
                  <span>Answered by {{ answer.authorName }}</span>  
                  <span class="mx-2">•</span>  
                  <span>{{ formatDate(answer.createdAt) }}</span>  
                </div>
              </div>
            </div>
          </div>  
        </div>  
        <div v-else-if="!isLoading">  
          <p class="text-gray-600">Belum ada jawaban.</p>  
        </div>  
      </div>  
  
      <!-- Add Answer -->  
      <div class="mt-8" v-if="isAuthenticated">  
        <h3 class="text-lg font-medium text-gray-900">Jawaban Anda</h3>  
        <form @submit.prevent="handleSubmitAnswer" class="mt-4">  
          <textarea v-model="content"  
                    rows="4"  
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"  
                    placeholder="Tulis jawaban Anda di sini..."></textarea>  
          <button type="submit"  
                  class="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">  
            Kirim Jawaban
          </button>  
        </form>  
      </div>  
    </div>  
  </div>  
</template>  
  
<script setup>  
import { ref, onMounted, computed } from 'vue';  
import { useRoute } from 'vue-router';  
import NavBarComponent from '../components/NavBarComponent.vue';  
import FooterComponent from '../components/FooterComponent.vue';  
import LoadingComponent from '../components/LoadingComponent.vue'; // Import your LoadingComponent  
import { fetchQuestionById, fetchQuestionByIdDetails  } from '@/api/question';  
import { fetchAllAnswerByQuestion, postAnswer, upvoteAnswer, revokeUpvoteAnswer } from '@/api/answer';  
  
const route = useRoute();  
const question = ref(null);  
const content = ref('');  
const userId = sessionStorage.getItem('userId');  
const questionId = route.params.id;  
const isLoading = ref(true); // Loading state  

const isAuthenticated = ref(false)

if (sessionStorage.getItem('accessToken')) {
  isAuthenticated.value = true;
}

function formatDate(dateString) {  
  const date = new Date(dateString);  
  return new Intl.DateTimeFormat('id-ID', {  
    year: 'numeric',  
    month: 'long',  
    day: 'numeric',  
    hour: '2-digit',  
    minute: '2-digit',  
  }).format(date);  
}
  
onMounted(async () => {  
  try {  
    // question.value = await fetchQuestionById(questionId);  
    question.value = await fetchQuestionByIdDetails(questionId);  
    const answers = await fetchAllAnswerByQuestion(route.params.id);

    question.value.answers = answers.map((answer) => ({
      ...answer,
      isUpvoted: Array.isArray(answer.voters) && answer.voters.includes(userId), // Assume `voters` is a list of user IDs who upvoted
    })); 
    console.log(question.value);  
  } catch (error) {  
    console.error('Error fetching question:', error);  
  } finally {  
    isLoading.value = false; // Set loading to false after fetching  
  }  
});  
  
const handleSubmitAnswer = async () => {  
  console.log('Answer submitted:', {  
    content: content.value,  
    questionId: questionId,  
    authorId: userId,  
  });  
  
  try {  
    const response = await postAnswer(content.value, questionId, userId);  
    console.log('Post answer successful:', response);  
    location.reload();  
  } catch (error) {  
    console.error('Post answer failed:', error);  
  }  
}  

const toggleUpvote = async (answer) => {
  try {
    if(!answer.isUpvoted){
      const response = await upvoteAnswer(answer.id, userId);
      answer.upvotes = response.upvotes;
    }
    else{
      const response = await revokeUpvoteAnswer(answer.id, userId);
      answer.upvotes = response.upvotes;
    }
    answer.isUpvoted = !answer.isUpvoted;

  } catch (error) {
    console.error('Upvote failed: ', error);
  }
};
</script>  
  
<style scoped>  
/* Add any additional styles here */  
</style>  
