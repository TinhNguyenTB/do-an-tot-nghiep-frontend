import { MENU_URL } from '@/constants/menuUrl'
import { logout } from '@/services/auth/logout'
import { refreshTokenAPI } from '@/services/auth/refresh'
import { useRbacStore } from '@/store/rbacStore'
import { message } from 'antd'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

// Hàm xử lý Logout tập trung
const handleUnauthorizedLogout = async () => {
  await logout()
  useRbacStore.getState().logout()
  location.href = MENU_URL.LOGIN
}

// Khởi tạo Promise để quản lý trạng thái refresh token
let refreshTokenPromise: any = null

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { response } = error
    const originalRequest = error.config

    // --- 1. Xử lý 401 Unauthorized (Lỗi xác thực chung) ---
    if (response?.status === 401) {
      await handleUnauthorizedLogout()
      return Promise.reject(error)
    }

    // --- 2. Xử lý 410 Gone (Cần Refresh Token) ---
    if (response?.status === 410 && originalRequest) {
      if (!refreshTokenPromise) {
        // Tạo Promise mới: Logic phức tạp dùng async/await
        refreshTokenPromise = (async () => {
          try {
            // Gọi API refreshToken
            await refreshTokenAPI()
          } catch (refreshError) {
            // Nếu refresh thất bại, logout và ném lỗi để ngăn retry
            await handleUnauthorizedLogout()
            return Promise.reject(refreshError)
          } finally {
            // Xóa promise để cho phép request refresh token mới sau này
            refreshTokenPromise = null
          }
        })()
      }

      // Đợi refresh token xong, sau đó retry lại request gốc
      try {
        // Chờ Promise refresh token hoàn tất (thành công hoặc thất bại)
        await refreshTokenPromise
        // Retry request gốc
        return axiosInstance(originalRequest)
      } catch (retryError) {
        // Nếu refresh token thất bại (đã bị catch bên trên và logout),
        // thì retryError là lỗi từ refresh token, ta reject luôn.
        return Promise.reject(retryError)
      }
    }

    // --- 3. Xử lý hiển thị lỗi chung ---
    // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API, ngoại trừ 410
    if (response?.status !== 410) {
      message.error(response?.data?.message || error.message)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
