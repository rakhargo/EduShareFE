<template>
  <NavBarComponent />
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
              <p class="text-sm text-gray-500">Anggota Sejak {{ formatDate(user.joinDate) }}</p>
            </div>
          </div>
          <button @click="isEditing = !isEditing" 
                  class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            {{ isEditing ? 'Liat Profil' : 'Ubah Profil' }}
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
              <p class="text-sm text-gray-500">Pertanyaan</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.answers }}</p>
              <p class="text-sm text-gray-500">Jawaban</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-gray-900">{{ stats.reputation }}</p>
              <p class="text-sm text-gray-500">Reputasi</p>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-medium text-gray-900 mb-2">Statistik</h2>
          <ChartComponent :data="stats" />
          <!-- <p class="text-gray-600">{{ user.bio || 'No bio provided yet.' }}</p> -->
        </div>

        <!-- Bio -->
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-medium text-gray-900 mb-2">Tentang Saya</h2>
          <p class="text-gray-600">{{ user.bio || 'No bio provided yet.' }}</p>
        </div>

        <!-- Recent Activity -->
        <div class="px-6 py-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Aktivitas Terbaru</h2>
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
            <label for="username" class="block text-sm font-medium text-gray-700">Nama Pengguna</label>
            <input type="text" id="username" v-model="editForm.username"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Alamat Email</label>
            <input type="email" id="email" v-model="editForm.email"
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
          </div>

          <div>
            <label for="bio" class="block text-sm font-medium text-gray-700">Tentang Saya</label>
            <textarea id="bio" v-model="editForm.bio" rows="4"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="isEditing = false"
                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Batal
            </button>
            <button type="submit"
                    class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              Simpan Perubahan
            </button>
          </div>
        </form>
      </template>
    </div>
  </div>
  <FooterComponent />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserById, updateUser } from '@/api/user';
import { fetchQuestionByIdDetails } from '@/api/question';
import { fetchAllAnswerById } from '@/api/answer';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import ChartComponent from '../components/ChartComponent.vue';

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

    // Fetch user data using the getUser function
    const response = await getUserById(storedId)
    user.value = response

    // Process user initials
    userInitials.value = user.value.username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()

    // Initialize edit form fields
    editForm.value = {
      username: user.value.username,
      email: user.value.email,
      bio: user.value.bio
    }

    // Update stats
    stats.value = {
      questions: user.value.questions.length,
      answers: user.value.answers.length,
      reputation: user.value.reputation
    }

    async function populateRecentActivity(user) {
      const questionsWithDetails = await Promise.all(
        user.value.questions.map(async (q) => {
          const questionDetails = await fetchQuestionByIdDetails(q);
          return questionDetails
            ? { action: `Ditanyakan: ${questionDetails.content}`, date: new Date() }
            : { action: `Ditanyakan: ${q} (Detail tidak ditemukan)`, date: new Date() };
        })
      );
      
      const answerWithDetails = await Promise.all(
        user.value.answers.map(async (a) => {
          const answerDetails = await fetchAllAnswerById(a);
          return answerDetails
            ? { action: `Dijawab: ${answerDetails.content}`, date: new Date() }
            : { action: `Dijawab: ${a} (Detail tidak ditemukan)`, date: new Date() };
        })
      );

      recentActivity.value = [...questionsWithDetails, ...answerWithDetails];
  }

// Contoh pemanggilan fungsi
populateRecentActivity(user);

  } catch (error) {
    console.error('Failed to fetch user data:', error)
  }
}

const handleUpdateProfile = async () => {
  try {
    const storedId = sessionStorage.getItem('userId');
    if (!storedId) throw new Error('User not authenticated');

    const updatedData = {
      username: editForm.value.username,
      email: editForm.value.email,
      bio: editForm.value.bio,
      // password: '',
    };

    const response = await updateUser(storedId, updatedData);
    console.log('Profile updated successfully:', response);
    location.reload();

    // Update local state
    user.value = { ...user.value, ...updatedData };
    isEditing.value = false;
  } catch (error) {
    console.error('Failed to update profile:', error);
    alert('Error updating profile. Please try again.');
  }
};


const formatDate = (date) => {
  if (!date) return 'Unknown';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

onMounted(() => {
  fetchUserData();
});
</script>
