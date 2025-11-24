import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// let refreshTokenPromise = null;

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const status = error.response.status
    if (status === 401) {
      // handleLogoutAPI().then(() => {
      //   // Dùng cookie -> xóa userInfo trong localStrorage
      //   localStorage.removeItem("userInfo");
      //   // Điều hướng đến trang login
      //   location.href = "/login";
      // });
    }
    const originalRequest = error.config

    return Promise.reject(error)
  }
)

export default axiosInstance
