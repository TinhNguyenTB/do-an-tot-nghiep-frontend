import { UserInfo } from '@/services/auth/login/type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface RbacStoreActions {
  login: (userInfo: UserInfo) => void
  logout: () => void
  isLoggedIn: () => boolean
  getPermissions: () => string[]
}

export type RbacStoreType = UserInfo & RbacStoreActions

const initialState: UserInfo = {
  email: '',
  id: 0,
  name: '',
  organizationId: null,
  permissions: [],
  roles: []
}

export const useRbacStore = create<RbacStoreType>()(
  persist(
    (set, get) => ({
      ...initialState,

      login: (userInfo) => {
        set({
          ...userInfo,
          isLoggedIn: () => true
        })
      },

      logout: () => {
        set({
          ...initialState,
          isLoggedIn: () => false
        })
      },

      isLoggedIn: () => {
        return get().id > 0 && !!get().email
      },

      getPermissions: () => {
        return get().permissions
      }
    }),
    {
      name: 'user-storage', // Tên lưu trữ
      // Tùy chọn: Chỉ lưu những trường cần thiết và loại bỏ các actions
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state as RbacStoreType).filter(
            ([key]) => !['login', 'logout', 'isLoggedIn', 'getPermissions'].includes(key)
          )
        ) as UserInfo
    }
  )
)
