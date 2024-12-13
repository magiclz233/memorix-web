import { ref } from 'vue'

const snackbar = ref({
  show: false,
  text: '',
  color: 'success'
})

export function useSnackbar() {
  function showMessage(text: string, color: string) {
    snackbar.value = {
      show: true,
      text,
      color
    }
  }

  return {
    snackbar,
    showSuccess: (text: string) => showMessage(text, 'success'),
    showError: (text: string) => showMessage(text, 'error')
  }
} 