import axios from 'axios'
import env from '../env'
import { Notify } from 'quasar'

const axiosInstance = axios.create({
  baseURL: env.apiUrl // url base cargada de archivo env.js
})

export default async ({ store, Vue }) => {
  Vue.prototype.$axios = axios
  Vue.prototype.$api = axiosInstance

  axiosInstance.interceptors.response.use(function (response) {
    if (response.config.method === 'post') {
      if (response.status === 201) {
        if (response.data.token === undefined) { // Si no es login
          Notify.create({
            color: 'green-4',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Registro guardado con éxito!'
          })
        } else { // Es Login
          localStorage.setItem('TEST_SESSION_INFO', JSON.stringify(response))
        }
      }
    }
    return response.data
  }, function (error) {
    console.log(error, 'error')
  })

  axiosInstance.interceptors.request.use(async function (config) {
    // Antes de enviar cada petición se añade el token si existe

    store.dispatch('generals/fetchAccessToken')
    const token = JSON.parse(localStorage.getItem('TEST_SESSION_INFO'))
    console.log('token', config)
    if (token) {
      /* if (!config.headers) { config.headers = {} }
      config.headers = {
        api_token: token.token
      } */
      config.url = `${config.url}?api_token=${token.token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })
}

export { axiosInstance }
