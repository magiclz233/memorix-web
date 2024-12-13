<template>
  <div>
    <h1 class="text-h4 mb-6">欢迎使用 Memorix</h1>
    <v-row>
      <v-col cols="12" md="4" v-for="stat in stats" :key="stat.title">
        <v-card>
          <v-card-title>{{ stat.title }}</v-card-title>
          <v-card-text class="text-h4">{{ stat.count }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { title: '照片数量', count: 0 },
  { title: '视频数量', count: 0 },
  { title: '相册数量', count: 0 }
])
</script> 