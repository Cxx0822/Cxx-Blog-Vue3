import { useUserStore } from '@/store/user'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export const checkPermission = (value:Array<string>):boolean => {
  if (value && value instanceof Array) {
    const userStore = useUserStore()
    const roles = userStore.roles

    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
