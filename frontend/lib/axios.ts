/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import config from '../config.json'
import { Local } from './local'

export const httpClient = axios.create({
  baseURL: config.API_URL,
  headers: {
    Authorization: `Bearer ${Local.getAccessToken()}`,
  },
})
