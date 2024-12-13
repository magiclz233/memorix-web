import axios from 'axios'
import type { Media } from '@/types'

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
})

export const mediaApi = {
  async scanMedia() {
    const { data } = await api.get<Media[]>('/media/scan')
    return data
  },

  async getMediaUrl(filename: string) {
    return `/api/media/${encodeURIComponent(filename)}`
  }
}

export const configApi = {
  async getMediaPaths() {
    const { data } = await api.get('/config/media-paths')
    return data
  },

  async addMediaPath(path: { name: string; path: string }) {
    const { data } = await api.post('/config/media-paths', path)
    return data
  },

  async deleteMediaPath(id: number) {
    const { data } = await api.delete(`/config/media-paths/${id}`)
    return data
  }
} 