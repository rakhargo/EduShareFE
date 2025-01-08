<template>
    <NavBarComponent />
  
    <div>
      <!-- Dashboard Hero Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center">
            <h1 class="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Dashboard EduShare
            </h1>
            <p class="mt-3 max-w-md mx-auto text-xl text-blue-100 sm:text-2xl md:mt-5 md:max-w-3xl">
              Dapatkan wawasan tentang penggunaan dan kinerja platform.
            </p>
          </div>
        </div>
      </div>
  
      <!-- Stats Section -->
      <div class="bg-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-3 gap-8 text-center">
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ totalQuestions }}</div>
              <div class="mt-2 text-sm text-gray-600">Total Pertanyaan Dibuat</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ totalAnswered }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Terjawab</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ totalUnanswered }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Belum Terjawab</div>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-8 text-center mt-8">
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ ma }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Matematika</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ fi }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Fisika</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ ki }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Kimia</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ bi }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Biologi</div>
            </div>
          </div>

          <div class="grid grid-cols-4 gap-8 text-center mt-8">
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ sej }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Sejarah</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ sas }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Sastra</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ bhs }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Bahasa</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ inf }}</div>
              <div class="mt-2 text-sm text-gray-600">Pertanyaan Informatika</div>
            </div>
          </div>

          <!-- <div class="grid grid-cols-3 gap-8 text-center mt-8">
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ totalUsers }}</div>
              <div class="mt-2 text-sm text-gray-600">Registered Users</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ totalExperts }}</div>
              <div class="mt-2 text-sm text-gray-600">Expert Tutors</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-6">
              <div class="text-4xl font-bold text-blue-600">{{ totalSubjects }}</div>
              <div class="mt-2 text-sm text-gray-600">Subjects Covered</div>
            </div>
          </div> -->
        </div>
      </div>
  
      <!-- Recent Activity Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Aktivitas Pengguna Terkini</h2>
        </div>
        <div class="grid gap-6">
          <div
            v-for="activity in questions"
            :key="activity.id"
            class="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-100"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="text-lg font-medium text-gray-900">{{ activity.title }}</h3>
                <p class="mt-2 text-gray-600">{{ activity.content }}</p>
              </div>
              <span class="text-sm text-gray-500">
                {{ new Date(activity.createdAt).toLocaleString('en-GB', { 
                  day: '2-digit', 
                  month: '2-digit', 
                  year: 'numeric', 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit', 
                  hour12: false 
                }) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <FooterComponent />
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { fetchAllQuestion } from '@/api/question';
  import { getAllUsers } from '@/api/user';
  import NavBarComponent from "../components/NavBarComponent.vue";
  import FooterComponent from "../components/FooterComponent.vue";
  
  const questions = ref([]);
  const users = ref([]);
  const ma = ref(0);
  const fi = ref(0);
  const ki = ref(0);
  const bi = ref(0);
  const sej = ref(0);
  const sas = ref(0);
  const bhs = ref(0);
  const inf = ref(0);

  const totalQuestions = ref(0);
  const totalAnswered = ref(0);
  const totalUnanswered = ref(0);
  const totalUsers = ref(0);

  const totalExperts = ref(15000);
  const totalSubjects = ref(100);

  onMounted(async () => {
  try {
    questions.value = await fetchAllQuestion();
    totalQuestions.value = questions.value.length;

    // users.value = await getAllUsers();
    // totalUsers.value = users.value.length;

    ma.value = questions.value.filter(q => q.tags.includes("Matematika")).length;
    fi.value = questions.value.filter(q => q.tags.includes("Fisika")).length;
    ki.value = questions.value.filter(q => q.tags.includes("Kimia")).length;
    bi.value = questions.value.filter(q => q.tags.includes("Biologi")).length;
    sej.value = questions.value.filter(q => q.tags.includes("Sejarah")).length;
    sas.value = questions.value.filter(q => q.tags.includes("Sastra")).length;
    bhs.value = questions.value.filter(q => q.tags.includes("Bahasa")).length;
    inf.value = questions.value.filter(q => q.tags.includes("Informatika")).length;

    // Count answered and unanswered questions
    totalAnswered.value = questions.value.filter(q => q.answers.length > 0).length;
    totalUnanswered.value = totalQuestions.value - totalAnswered.value;

    console.log('Total Questions:', totalQuestions.value);
    console.log('Answered Questions:', totalAnswered.value);
    console.log('Unanswered Questions:', totalUnanswered.value);

    // Sort questions by creation date (newest first)
    questions.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Handle page refresh
    if (!sessionStorage.getItem('hasRefreshed')) {
      sessionStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    } else {
      sessionStorage.removeItem('hasRefreshed');
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
});

  </script>
  
  