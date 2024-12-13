<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-h4">设置</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="showAddDialog = true">
        添加目录
      </v-btn>
    </div>

    <v-card>
      <v-card-title>媒体目录</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="path in mediaPaths" :key="path.id">
            <template v-slot:prepend>
              <v-icon :color="path.active ? 'success' : 'grey'">
                mdi-folder
              </v-icon>
            </template>
            <v-list-item-title>{{ path.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ path.path }}</v-list-item-subtitle>
            <template v-slot:append>
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="error"
                @click="deletePath(path.id)"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- 添加目录对话框 -->
    <v-dialog v-model="showAddDialog" max-width="500">
      <v-card>
        <v-card-title>添加媒体目录</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addPath">
            <v-text-field
              v-model="newPath.name"
              label="目录名称"
              required
            />
            <div class="d-flex align-center gap-2">
              <v-text-field
                v-model="newPath.path"
                label="目录路径"
                required
                readonly
                :hint="newPath.path || '请选择目录'"
                persistent-hint
              />
              <v-btn
                icon="mdi-folder-open"
                @click="selectDirectory"
              />
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="showAddDialog = false">取消</v-btn>
          <v-btn color="primary" @click="addPath" :disabled="!newPath.path">添加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 隐藏的目录选择器 -->
    <input
      type="file"
      ref="dirInput"
      style="display: none"
      webkitdirectory
      directory
      @change="handleDirectorySelect"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSnackbar } from '@/composables/useSnackbar'
import { configApi } from '@/services/api'

const showAddDialog = ref(false)
const mediaPaths = ref([])
const { showSuccess, showError } = useSnackbar()
const dirInput = ref<HTMLInputElement | null>(null)

const newPath = ref({
  name: '',
  path: ''
})

function selectDirectory() {
  dirInput.value?.click()
}

function handleDirectorySelect(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    const file = input.files[0]
    const path = file.path.replace(/[^\\]*$/, '')  // 获取目录路径
    newPath.value.path = path
    if (!newPath.value.name) {
      newPath.value.name = path.split(/[\\/]/).filter(Boolean).pop() || ''
    }
  }
}

async function loadPaths() {
  try {
    mediaPaths.value = await configApi.getMediaPaths()
  } catch (error) {
    showError('加载目录列表失败')
  }
}

async function addPath() {
  if (!newPath.value.name || !newPath.value.path) {
    showError('请填写完整信息')
    return
  }

  try {
    await configApi.addMediaPath(newPath.value)
    showSuccess('添加目录成功')
    showAddDialog.value = false
    newPath.value = { name: '', path: '' }
    await loadPaths()
  } catch (error: any) {
    showError(error.response?.data?.error || '添加目录失败')
  }
}

async function deletePath(id: number) {
  try {
    await configApi.deleteMediaPath(id)
    showSuccess('删除目录成功')
    await loadPaths()
  } catch (error) {
    showError('删除目录失败')
  }
}

onMounted(loadPaths)
</script> 