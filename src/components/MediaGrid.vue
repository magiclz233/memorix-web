<template>
  <v-row>
    <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4" lg="3">
      <media-card :media="item" @click="$emit('select', item)" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { Media } from '@/types'
import MediaCard from './MediaCard.vue'

defineProps<{
  items: Media[]
}>()

defineEmits<{
  (e: 'select', media: Media): void
}>()
</script> 