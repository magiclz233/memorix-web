<template>
  <v-card class="media-card" @click="$emit('click')">
    <v-img
      :src="thumbnailUrl"
      :aspect-ratio="1"
      cover
      class="media-thumbnail"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="primary" />
        </v-row>
      </template>
    </v-img>

    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <div class="text-truncate">{{ fileName }}</div>
        <v-icon v-if="isVideo">mdi-play-circle</v-icon>
      </div>
      <div class="text-caption text-grey">
        {{ formatDate(media.takenAt || media.createdAt) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import type { Media } from '@/types'

const props = defineProps<{
  media: Media
}>()

const thumbnailUrl = computed(() => `/api/media/${props.media.id}/thumbnail`)
const fileName = computed(() => props.media.filePath.split('/').pop())
const isVideo = computed(() => props.media.fileType.startsWith('video'))

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
}
</style> 