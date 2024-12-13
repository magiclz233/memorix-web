<template>
  <v-card class="media-card" @click="$emit('click')">
    <v-img
      :src="mediaUrl"
      :aspect-ratio="1"
      cover
      class="media-thumbnail"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
      <v-icon
        v-if="media.type === 'video'"
        class="video-icon"
        size="48"
        color="white"
      >
        mdi-play-circle
      </v-icon>
    </v-img>

    <v-card-text>
      <div class="text-truncate">{{ media.name }}</div>
      <div class="text-caption text-grey">
        {{ formatFileSize(media.size) }} · {{ formatDate(media.modTime) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import { mediaApi } from '@/services/api'
import type { Media } from '@/types'

const props = defineProps<{
  media: Media
}>()

const mediaUrl = computed(() => {
  if (props.media.type === 'video') {
    // 对于视频，可以返回一个视频缩略图
    return '/video-thumbnail.png'
  }
  return mediaApi.getMediaUrl(props.media.id)
})

function formatFileSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

function formatDate(date: string) {
  return format(new Date(date), 'yyyy-MM-dd')
}
</script>

<style scoped>
.media-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.media-card:hover {
  transform: translateY(-4px);
}

.media-thumbnail {
  background-color: #f5f5f5;
  position: relative;
}

.video-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style> 