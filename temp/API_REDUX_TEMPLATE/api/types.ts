import type { CancelTokenSource } from 'axios'

export interface Category {
  [x: string]: any
}

export interface Profile {
  [x: string]: any
}

export interface Notification {
  id: number
  read?: boolean
  title?: string
  order_id: number | string
  notificationable_status?: string
  notification_id: number | string
  [x: string]: any
}
export interface PayloadBase {
  cancelToken?: CancelTokenSource
  language?: string
  deviceLanguage?: boolean
}

export interface ApiResponse<T> {
  cancel?: boolean
  code: number
}

export interface AddressReq {
  [x: string]: any
}

export interface NewBankReq {
  bankId: number | undefined
  bankAccount: string
  ownerAccount: string
  isDefault: 'Y' | 'N'
}

export interface Message {
  [x: string]: any
  id?: string | null
  type: string
  primary_key?: string
  attributes: {
    content?: any
    created_at?: any
    updated_at?: any
    sender_id?: number
    sender_type?: string
    room_id?: any
    media?: {
      type?: string
      url?: string
      [y: string]: any
    }
    [z: string]: any
  }
}

export interface SystemNotification {
  id: number
  notify_type: string
  title: string
  content?: string
  city?: string
  start_date?: string
  end_date?: string
  [x: string]: any
}

/** New Type */
export interface Auth {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
}

export interface IQuanlity {
  128: string
  320: string
}
export interface IArtists {
  name: string
  link: string
}

export interface IAlbum {
  id: string
  link: string
  title: string
  name: string
  isoffical: boolean
  artists_names: string
  artists: IArtists
  thumbnail: string
  thumbnail_medium: string
}

export interface IArtist {
  id: string
  name: string
  link: string
  cover: string
  thumbnail: string
}
export interface IMusic {
  id: string
  name: string
  title: string
  code: string
  content_owner: number
  isoffical: true
  isWorldWide: true
  playlist_id: string
  artists: IArtists[]
  artists_names: string
  performer: string
  type: string
  link: string
  lyric: string
  thumbnail: string
  duration: 261
  source: IQuanlity
  album: IAlbum
  artist: IArtist
  ads: boolean
  is_vip: boolean
  ip: string
}


export interface ISong {
  id: string
  name: string
  title: string
  code: string
  content_owner: number
  isoffical: true
  isWorldWide: true
  playlist_id: string
  artists: IArtists[]
  artists_names: string
  performer: string
  type: string
  link: string
  lyric: string
  thumbnail: string
  duration: 261
  source: IQuanlity
  album: IAlbum
  artist: IArtist
  ads: boolean
  is_vip: boolean
  ip: string
}

