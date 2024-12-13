import axios from 'axios'
import type { Media, Album } from '@/types'

const api = axios.create({
  baseURL: '/api'
})

export const mediaApi = {
  async getList(params?: { type?: string; date?: string; location?: string }) {
    const { data } = await api.get<Media[]>('/media', { params })
    return data
  },

  async getById(id: number) {
    const { data } = await api.get<Media>(`/media/${id}`)
    return data
  },

  async getAlbums() {
    const { data } = await api.get<Album[]>('/albums')
    return data
  },

  async createAlbum(album: Partial<Album>) {
    const { data } = await api.post<Album>('/albums', album)
    return data
  }
} 