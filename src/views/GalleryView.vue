<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-h4">媒体库</h1>
      <div class="flex gap-4">
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="搜索"
          hide-details
          density="compact"
        />
        <v-btn color="primary" prepend-icon="mdi-refresh" @click="scanMedia">
          扫描文件
        </v-btn>
      </div>
    </div>

    <v-row v-if="loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>

    <template v-else>
      <div class="mb-4">
        <v-chip-group v-model="selectedType">
          <v-chip value="all">全部</v-chip>
          <v-chip value="image">图片</v-chip>
          <v-chip value="video">视频</v-chip>
        </v-chip-group>
      </div>

      <v-row>
        <v-col v-for="item in filteredMedia" :key="item.id" cols="12" sm="6" md="4" lg="3">
          <media-card :media="item" @click="openPreview(item)" />
        </v-col>
      </v-row>

      <media-preview
        v-if="selectedMedia"
        :media="selectedMedia"
        v-model:show="showPreview"
        @close="closePreview"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mediaApi } from '@/services/api'
import type { Media } from '@/types'
import MediaCard from '@/components/MediaCard.vue'
import MediaPreview from '@/components/MediaPreview.vue'

const loading = ref(false)
const mediaList = ref<Media[]>([])
const search = ref('')
const selectedType = ref('all')
const showPreview = ref(false)
const selectedMedia = ref<Media | null>(null)

const filteredMedia = computed(() => {
  let filtered = mediaList.value

  // 类型筛选
  if (selectedType.value !== 'all') {
    filtered = filtered.filter(item => item.type === selectedType.value)
  }

  // 搜索筛选
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(searchLower)
    )
  }

  return filtered
})

async function scanMedia() {
  loading.value = true
  try {
    mediaList.value = await mediaApi.scanMedia()
  } catch (error) {
    console.error('扫描媒体文件失败:', error)
  } finally {
    loading.value = false
  }
}

function openPreview(media: Media) {
  selectedMedia.value = media
  showPreview.value = true
}

function closePreview() {
  showPreview.value = false
  selectedMedia.value = null
}

// 初始加载
scanMedia()
</script> 