<template>
  <v-dialog
    v-model="show"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ fileName }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn icon @click="downloadMedia">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container class="fill-height">
        <v-row justify="center" align="center">
          <v-col cols="12" class="text-center">
            <template v-if="isImage">
              <img
                :src="mediaUrl"
                class="preview-image"
                :style="imageStyle"
                @load="onImageLoad"
              >
            </template>
            <template v-else-if="isVideo">
              <video
                :src="mediaUrl"
                controls
                class="preview-video"
              ></video>
            </template>
          </v-col>
        </v-row>
      </v-container>

      <v-card-text>
        <div class="metadata-panel">
          <h3 class="text-h6 mb-4">文件信息</h3>
          <v-list>
            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-calendar</v-icon>
              </template>
              <v-list-item-title>拍摄时间</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatDate(media?.takenAt || media?.createdAt) }}
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item v-if="media?.locationName">
              <template v-slot:prepend>
                <v-icon>mdi-map-marker</v-icon>
              </template>
              <v-list-item-title>位置</v-list-item-title>
              <v-list-item-subtitle>{{ media.locationName }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { format } from 'date-fns'
import type { Media } from '@/types'

const props = defineProps<{
  media: Media | null
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:show', value: boolean): void
}>()

const imageStyle = ref({
  maxWidth: '100%',
  maxHeight: '80vh'
})

const mediaUrl = computed(() => props.media ? `/api/media/${props.media.id}` : '')
const fileName = computed(() => props.media?.filePath.split('/').pop() || '')
const isImage = computed(() => props.media?.fileType.startsWith('image'))
const isVideo = computed(() => props.media?.fileType.startsWith('video'))

function formatDate(date?: string) {
  if (!date) return ''
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
}

function onImageLoad(event: Event) {
  const img = event.target as HTMLImageElement
  const ratio = Math.min(
    window.innerWidth / img.naturalWidth,
    window.innerHeight * 0.8 / img.naturalHeight
  )
  imageStyle.value = {
    maxWidth: `${img.naturalWidth * ratio}px`,
    maxHeight: `${img.naturalHeight * ratio}px`
  }
}

function downloadMedia() {
  if (!props.media) return
  const link = document.createElement('a')
  link.href = mediaUrl.value
  link.download = fileName.value
  link.click()
}
</script>

<style scoped>
.preview-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.preview-video {
  max-width: 100%;
  max-height: 80vh;
}

.metadata-panel {
  position: fixed;
  right: 0;
  top: 64px;
  bottom: 0;
  width: 300px;
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  overflow-y: auto;
}
</style> 