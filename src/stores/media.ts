import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Media } from '@/types'

export const useMediaStore = defineStore('media', () => {
  const mediaList = ref<Media[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchMediaList() {
    try {
      loading.value = true
      const response = await axios.get('/api/media')
      mediaList.value = response.data
    } catch (err) {
      error.value = '获取媒体列表失败'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    mediaList,
    loading,
    error,
    fetchMediaList
  }
}) 