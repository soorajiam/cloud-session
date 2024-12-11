<template>
  <div class="min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
    <div v-if="pending" class="flex items-center gap-3">
      <div class="w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce"></div>
      <div class="w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce [animation-delay:-.3s]"></div>
      <div class="w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce [animation-delay:-.5s]"></div>
    </div>
    <div v-else-if="error" class="text-red-500 dark:text-red-400 text-2xl font-light flex items-center gap-2">
      <i class="pi pi-exclamation-circle"></i>
      <span>{{ error.message }}</span>
    </div>
    <div v-else-if="!flattenedSlides.length" class="text-gray-600 dark:text-gray-300 text-2xl font-light">
      No slides available
    </div>
    <div v-else class="w-full max-w-6xl mx-auto">
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-12 rounded-2xl shadow-xl">
        <div class="mb-6 flex justify-between items-center">
          <span class="text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Slide {{ currentSlide + 1 }} of {{ flattenedSlides.length }}
          </span>
          <div class="flex gap-2">
            <div class="w-3 h-3 rounded-full" 
                 v-for="(_, index) in flattenedSlides" 
                 :key="index"
                 :class="index === currentSlide ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-300 dark:bg-gray-600'">
            </div>
          </div>
        </div>

        <div class="min-h-[400px] transition-all duration-300">
          <h1 v-if="currentSlideData.mainTitle" 
              class="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">
            {{ currentSlideData.mainTitle }}
          </h1>
          
          <div v-if="currentSlideData.title" 
               class="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">
            {{ currentSlideData.title }}
          </div>
          
          <div class="space-y-8">
            <div v-if="typeof currentSlideData.content === 'string'" 
                 class="text-gray-700 dark:text-gray-200 text-xl leading-relaxed">
              {{ currentSlideData.content }}
            </div>
            <ul v-else-if="Array.isArray(currentSlideData.content)" class="space-y-4">
              <li v-for="(item, index) in currentSlideData.content" 
                  :key="index" 
                  class="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-xl shadow-sm
                         transform transition-all duration-200 hover:scale-[1.02] cursor-default
                         dark:text-gray-200">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 flex justify-center gap-6">
        <button @click="prevSlide" 
                :disabled="currentSlide === 0"
                class="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg 
                       text-indigo-600 dark:text-indigo-400 font-medium transition-all duration-200
                       hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white disabled:opacity-50 
                       disabled:hover:bg-white/80 dark:disabled:hover:bg-gray-800/80 disabled:hover:text-indigo-600 dark:disabled:hover:text-indigo-400
                       disabled:cursor-not-allowed">
          <i class="pi pi-arrow-left mr-2"></i>
          Previous
        </button>
        
        <button @click="nextSlide"
                :disabled="currentSlide === flattenedSlides.length - 1"
                class="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg
                       text-indigo-600 dark:text-indigo-400 font-medium transition-all duration-200
                       hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white disabled:opacity-50
                       disabled:hover:bg-white/80 dark:disabled:hover:bg-gray-800/80 disabled:hover:text-indigo-600 dark:disabled:hover:text-indigo-400
                       disabled:cursor-not-allowed">
          Next
          <i class="pi pi-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentSlide = ref(0)

// Fetch slides from API
const { data: slidesData, pending, error } = await useFetch('/api/presentation')

// Flatten slides to create individual slides for each content item
const flattenedSlides = computed(() => {
  if (!slidesData.value?.slides) return []
  
  return slidesData.value.slides.flatMap(slide => {
    // If content is a string or a single array, return as one slide
    if (typeof slide.content === 'string' || (Array.isArray(slide.content) && slide.content.every(item => typeof item === 'string'))) {
      return [{
        mainTitle: slide.title,
        content: slide.content
      }]
    }
    
    // If content contains arrays, create separate slides for each content item
    return slide.content.map(contentItem => ({
      mainTitle: slide.title,
      content: typeof contentItem === 'string' ? contentItem : contentItem,
      title: Array.isArray(contentItem) ? contentItem[0] : null // Use first item as subtitle if it's an array
    }))
  })
})

// Get current slide data
const currentSlideData = computed(() => flattenedSlides.value[currentSlide.value] || { title: '', content: [] })

function nextSlide() {
  if (currentSlide.value < flattenedSlides.value.length - 1) {
    currentSlide.value++
  }
}

function prevSlide() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyPress)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress)
})

function handleKeyPress(e) {
  if (e.key === 'ArrowRight') nextSlide()
  if (e.key === 'ArrowLeft') prevSlide()
}
</script>
