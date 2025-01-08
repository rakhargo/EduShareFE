<template>
   <NavBarComponent />
   
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Butuh Bantuan Belajar?
          </h1>
          <p class="mt-3 max-w-md mx-auto text-xl text-blue-100 sm:text-2xl md:mt-5 md:max-w-3xl">
            Gabung dengan komunitas pelajar dan ahli kami. Temukan jawaban atas pertanyaan Anda dengan cepat!
          </p>
          <div class="mt-10 flex justify-center gap-4">
            <router-link to="/ask" class="px-8 py-3 border border-transparent text-lg font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-xl md:px-10">
              Tanya Sekarang
            </router-link>
            <router-link to="/register" class="px-8 py-3 border border-white text-lg font-medium rounded-md text-white hover:bg-blue-700 md:py-4 md:text-xl md:px-10">
              Gabung Sekarang
            </router-link>
          </div>
        </div>
      </div>
    </div>

    

    <!-- Subject Categories -->
    <div class="bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">Bahasan Terpopuler</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="subject in subjects" :key="subject.name" 
               class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
               :class="{'bg-blue-100': selectedSubject === subject.name, 'border-2 border-blue-500': selectedSubject === subject.name}"
               >
            <div @click="handleFilterClick(subject.name)">
              <div class="text-2xl mb-2" v-html="subject.icon"></div>
              <h3 class="font-medium text-gray-900">{{ subject.name }}</h3>
              <p class="text-sm text-gray-500">{{ subject.count }} questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Questions -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Pertanyaan Terbaru</h2>
          <p class="mt-2 text-gray-600">Bantu menjawab pertanyaan orang lain</p>
        </div>
        <div class="flex gap-4">
          <select v-model="selectedSubject" class="rounded-md border-gray-300">
            <option value="">Semua</option>
            <option v-for="subject in subjects" :key="subject.name" :value="subject.name">
              {{ subject.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid gap-6">
        <div v-for="question in filteredQuestions" :key="question.id" class="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100">
          <router-link :to="'/question/' + question.id" class="hover:text-blue-600">
          <div class="flex items-start justify-between">
            <div>
              <h3 class="text-lg font-medium text-gray-900">
                  {{ question.title }}
              </h3>
              <p class="mt-2 text-gray-600 line-clamp-2">{{ question.content }}</p>
            </div>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {{ question.tags.join(', ') }}
            </span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div class="flex items-center space-x-4">
              <span class="flex items-center">
                <span class="text-green-500 mr-1">✓</span>
                {{ question.answers.length }} Jawaban
              </span>
              <!-- <span class="flex items-center">
                <span class="text-blue-500 mr-1">👁</span>
                {{ question.views }} views
              </span> -->
            </div>
            <div class="flex items-center">
              <span class="inline-flex items-center space-x-2">
                <span class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <!-- {{ question.author[0] }} -->
                </span>
                <span>{{ question.authorId }}</span>
              </span>
            </div>
          </div>
        </router-link>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import { ref, computed } from 'vue'
import { onMounted } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { fetchAllQuestion } from '@/api/question';

onMounted( async () => {
  questions.value = await fetchAllQuestion();
  console.log(questions.value);
  questions.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); 
  // Check if the page has already been refreshed
  if (!sessionStorage.getItem('hasRefreshed')) {
    // Set the flag to indicate the page has been refreshed
    sessionStorage.setItem('hasRefreshed', 'true');

    // Reload the page
    window.location.reload();
  } else {
    // Clear the flag so it can reload on the next full page load
    sessionStorage.removeItem('hasRefreshed');
  }
});

const selectedSubject = ref('')

const subjects = ref([
  { name: 'Matematika', icon: '📐', count: '15.2K' },
  { name: 'Fisika', icon: '⚡', count: '12.8K' },
  { name: 'Kimia', icon: '🧪', count: '10.5K' },
  { name: 'Biologi', icon: '🧬', count: '9.3K' },
  { name: 'Sejarah', icon: '📚', count: '8.7K' },
  { name: 'Sastra', icon: '📖', count: '7.9K' },
  { name: 'Ilmu Komputer', icon: '💻', count: '11.2K' },
  { name: 'Bahasa', icon: '🗣', count: '6.8K' },
])
const questions = ref([])

const filteredQuestions = computed(() => {
  if (!selectedSubject.value) {
    return questions.value;
  }
  return questions.value.filter(question =>
    question.tags.includes(selectedSubject.value)
  );
});

const handleFilterClick = (subjectName) => {
  selectedSubject.value = subjectName;
};

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>