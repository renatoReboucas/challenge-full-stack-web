import axios from 'axios'

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/student`,
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('@Auth:token')}`,
  },
})
