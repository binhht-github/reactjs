import { IMusic, ISong } from "@/api/types"

export interface MusicState {
  isRotateThumnail: boolean
  isLottie: boolean
  song: ISong
  indexSong: number
}
