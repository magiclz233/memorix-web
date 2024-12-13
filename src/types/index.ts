export interface Media {
  id: string
  name: string
  path: string
  type: 'image' | 'video'
  size: number
  modTime: string
}

export interface Album {
  id: number
  name: string
  description?: string
  createdAt: string
} 