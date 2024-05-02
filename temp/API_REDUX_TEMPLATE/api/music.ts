import request from './request'
import { APIs, timeout } from './config'
import { handleError } from './handleError'
import { createRequest } from './core'

export const getMusic = async () => {
  try {
    const result = await request().get(`${APIs.MUSIC}`)
    const { data } = result

    return {
      success: true,
      data,
    }
  } catch (e) {
    return handleError(e)
  }
}

export const getLyricSong = async (lyricUrl: string) => {
  try {
    const result = await createRequest('', timeout)().get(lyricUrl)
    const { data } = result

    return {
      success: true,
      data,
    }
  } catch (e) {
    return handleError(e)
  }
}

export const getCodeSong = async () => {
  try {
    const result = await request().get(`${APIs.CODE_SONG}`)
    const { data } = result
    return {
      success: true,
      data,
    }
  } catch (e) {
    return handleError(e)
  }
}

export const getSong = async (code: string) => {
  try {
    const result = await createRequest(
      'https://m.zingmp3.vn/xhr/media/get-source',
      timeout,
    )().get(`?type=audio&key=${code}`)
    const { data } = result.data
    return {
      success: true,
      data,
    }
  } catch (e) {
    return handleError(e)
  }
}
