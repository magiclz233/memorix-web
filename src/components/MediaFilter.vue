<template>
  <v-card class="filter-panel">
    <v-card-title>筛选</v-card-title>
    <v-card-text>
      <v-select
        v-model="filters.type"
        :items="typeOptions"
        label="文件类型"
        clearable
        @update:model-value="updateFilters"
      />

      <v-select
        v-model="filters.timeRange"
        :items="timeRangeOptions"
        label="时间范围"
        clearable
        @update:model-value="updateFilters"
      />

      <v-autocomplete
        v-model="filters.location"
        :items="locationOptions"
        label="位置"
        clearable
        @update:model-value="updateFilters"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMediaStore } from '@/stores/media'

const emit = defineEmits(['update:filters'])
const mediaStore = useMediaStore()

const filters = ref({
  type: null,
  timeRange: null,
  location: null
})

const typeOptions = [
  { title: '照片', value: 'image' },
  { title: '视频', value: 'video' }
]

const timeRangeOptions = [
  { title: '���近一周', value: '7d' },
  { title: '最近一月', value: '1m' },
  { title: '最近一年', value: '1y' }
]

const locationOptions = computed(() => {
  const locations = new Set(mediaStore.mediaList
    .map(m => m.locationName)
    .filter(Boolean))
  return Array.from(locations)
})

function updateFilters() {
  emit('update:filters', filters.value)
}

watch(filters, updateFilters, { deep: true })
</script>

<style scoped>
.filter-panel {
  width: 300px;
}
</style> 