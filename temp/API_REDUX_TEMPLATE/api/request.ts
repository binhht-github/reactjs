import { baseUrl, timeout } from './config'
import { createRequest } from './core'

const request = createRequest(baseUrl, timeout)


export default request
