import Vue from 'vue'
import axios from 'axios'

export default function ({ $axios }) {
  $axios.onRequest((config) => {
    // config.headers.token =
    config.headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      token: localStorage.getItem('token')
    }
  })
}

Vue.use(axios)
