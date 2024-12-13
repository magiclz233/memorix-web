export interface Media {
  id: number
  filePath: string
  fileType: string
  createdAt: string
  takenAt?: string
  locationLat?: number
  locationLng?: number
  locationName?: string
  fileSize: number
  metadata: Record<string, any>
}

export interface Album {
  id: number
  name: string
  description?: string
  createdAt: string
} 