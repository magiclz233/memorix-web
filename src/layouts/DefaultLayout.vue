<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path"
          :prepend-icon="item.icon"
          :title="item.title"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Memorix</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-magnify"></v-btn>
      <v-btn icon="mdi-filter"></v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
const menuItems = [
  { title: '首页', path: '/', icon: 'mdi-home' },
  { title: '相册', path: '/gallery', icon: 'mdi-image-multiple' },
  { title: '时间线', path: '/timeline', icon: 'mdi-timeline' },
  { title: '地图', path: '/map', icon: 'mdi-map' },
  { title: '设置', path: '/settings', icon: 'mdi-cog' }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 