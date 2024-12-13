<template>
  <router-view />
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    timeout="3000"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from '@/composables/useSnackbar'

const { snackbar } = useSnackbar()
</script>

<style>
@import '@mdi/font/css/materialdesignicons.css';
@import 'vuetify/styles';
@import './assets/styles/base.css';
</style>
