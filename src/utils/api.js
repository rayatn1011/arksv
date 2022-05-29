import axios from 'axios'

//API網域
const host = {
  local: `${location.protocol}//${location.hostname}:${location.port}`,
  // example: 'https://www.example.com',
}

//創建axios API實例
const userApi = axios.create({
  baseURL: `${host.local}/catAssets/ArkUser`,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  timeout: 10000,
})
const marketApi = axios.create({
  baseURL: `${host.local}/catAssets/catTan`,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
  timeout: 10000,
})
export { userApi, marketApi }
