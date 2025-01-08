<template>
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Bar Chart -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center gap-2 mb-6">
          <BarChart3 class="w-5 h-5 text-blue-600" />
          <h2 class="text-xl font-semibold">Distribusi Aktivitas</h2>
        </div>
        <div class="relative h-64 flex flex-col items-center">
          <!-- Y-axis labels -->
          <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-sm text-gray-600 pr-2">
            <span>{{ maxValue }}</span>
            <span v-if="Math.round(maxValue * 0.75) != maxValue">{{ Math.round(maxValue * 0.75) }}</span>
            <span v-if="Math.round(maxValue * 0.5) != Math.round(maxValue * 0.75)">{{ Math.round(maxValue * 0.5) }}</span>
            <span v-if="Math.round(maxValue * 0.25) != Math.round(maxValue * 0.5)">{{ Math.round(maxValue * 0.25) }}</span>
            <span v-if="Math.round(maxValue * 0.25) != 0">0</span>
          </div>
          <!-- Grid lines -->
          <div class="absolute left-8 right-0 h-full flex flex-col justify-between">
            <div v-for="i in 5" :key="i" class="border-b border-gray-200 h-0"></div>
          </div>
          <!-- Bars -->
          <div class="absolute left-8 right-0 h-full flex items-end justify-around">
            <div
                class="w-16 bg-blue-500 rounded-t transition-all duration-500 ease-in-out hover:bg-blue-600"
                :style="`height: ${(data.questions / (maxValue || 1)) * 100}%`"
            ></div>
            <div
              class="w-16 bg-green-500 rounded-t transition-all duration-500 ease-in-out hover:bg-green-600"
              :style="`height: ${(data.answers / (maxValue || 1)) * 100}%`"
            ></div>
          </div>
        </div>
  
        <!-- Legend Outside of the Chart -->
        <div class="flex justify-around mt-4">
          <div class="flex items-center">
            <span class="w-4 h-4 bg-blue-500 mr-2"></span>
            <span class="text-sm font-medium text-gray-600">Pertanyaan</span>
          </div>
          <div class="flex items-center">
            <span class="w-4 h-4 bg-green-500 mr-2"></span>
            <span class="text-sm font-medium text-gray-600">Jawaban</span>
          </div>
        </div>
      </div>
  
      <!-- Pie Chart -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex items-center gap-2 mb-4">
          <PieChart class="w-5 h-5 text-blue-600" />
          <h2 class="text-xl font-semibold">Rasio Aktivitas</h2>
        </div>
        <div class="flex items-center gap-8">
          <div class="relative w-48 h-48">
            <svg viewBox="0 0 36 36" class="w-full h-full">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                stroke-width="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3B82F6"
                stroke-width="3"
                :stroke-dasharray="`${percentages.questions}, 100`"
                class="transform origin-center -rotate-90"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                stroke-width="3"
                :stroke-dasharray="`${percentages.answers}, 100`"
                class="transform origin-center -rotate-90"
                :style="{ strokeDashoffset: `-${percentages.questions}` }"
              />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900">
              {{ total }} Total
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-blue-500 rounded"></div>
              <div class="text-sm">
                <span class="font-medium">Pertanyaan</span>
                <span class="text-gray-500 ml-2">{{ percentages.questions }}%</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 bg-green-500 rounded"></div>
              <div class="text-sm">
                <span class="font-medium">Jawaban</span>
                <span class="text-gray-500 ml-2">{{ percentages.answers }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { computed } from 'vue'
    import { BarChart3, PieChart } from 'lucide-vue-next'
    
    const props = defineProps({
      data: {
        type: Object,
        required: true,
        validator: (value) => {
          return 'questions' in value && 'answers' in value
        }
      }
    })
    
    const total = computed(() => props.data.questions + props.data.answers)
    const maxValue = computed(() => Math.max(props.data.questions, props.data.answers))
    const percentages = computed(() => ({
      questions: Math.round((props.data.questions / total.value) * 100),
      answers: Math.round((props.data.answers / total.value) * 100)
    }))
  </script>
  