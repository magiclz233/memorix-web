<template>
  <v-dialog
    :model-value="show"
    @update:model-value="$emit('update:show')"
    fullscreen
    :scrim="false"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ media.name }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="pa-0">
        <div class="media-container">
          <img
            v-if="media.type === 'image'"
            :src="mediaUrl"
            class="media-content"
          />
          <video
            v-else
            :src="mediaUrl"
            controls
            class="media-content"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mediaApi } from '@/services/api'
import type { Media } from '@/types'

const props = defineProps<{
  media: Media
  show: boolean
}>()

defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'close'): void
}>()

const mediaUrl = computed(() => {
  return mediaApi.getMediaUrl(props.media.id)
})
</script>

<style scoped>
.media-container {
  height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
}

.media-content {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style> 