<template>
  <div class="user-container">
    <!-- 新建用户 -->
    <el-button v-if="checkPermission(roleInfo.createUserRoles)" type="primary" @click="handleCreateUser">新建用户</el-button>

    <!-- 用户信息列表 -->
    <el-table :data="userInfo.userInfoList" style="width:1251px;margin-top:10px;" border>
      <el-table-column align="center" label="序号" width="100">
        <template v-slot="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名" width="150">
        <template v-slot="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名(昵称)" width="150">
        <template v-slot="scope">
          {{ scope.row.nickname }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户描述" width="300">
        <template v-slot="scope">
          {{ scope.row.introduction }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="头像" width="100">
        <template v-slot="scope">
          {{ scope.row.avatar }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="500">
        <template v-slot="scope">
          <!-- 判断是否有权限 -->
          <el-button v-if="checkPermission(roleInfo.updateUserRoles)" type="primary" @click="handleUpdateUser(scope.row)">更新用户信息</el-button>
          <el-button v-if="checkPermission(roleInfo.assignUserRoles)" type="primary" @click="handleAssignUser(scope.row)">分配用户角色</el-button>
          <el-button v-if="checkPermission(roleInfo.deleteUserRoles)" type="danger" @click="handleDeleteUser(scope.$index, scope.row)">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/更新用户对话框 -->
    <el-dialog v-model="dialogInfo.dialogCreateOrUpdateUserVisible" :title="dialogInfo.dialogCreateOrUpdateUserTitle">
      <el-form
        ref="createOrUpdateUserFormRef"
        :model="userInfo.newUser"
        :rules="createOrUpdateUserRules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="userInfo.newUser.username" :disabled="userInfo.isUsernameDisable" placeholder="用户名" />
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input v-model="userInfo.newUser.password" type="password" placeholder="密码" />
        </el-form-item>

        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input v-model="userInfo.newUser.confirmPassword" type="password" placeholder="确认密码" />
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="userInfo.newUser.nickname" placeholder="昵称" />
        </el-form-item>

        <el-form-item label="用户描述">
          <el-input
            v-model="userInfo.newUser.introduction"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="用户描述"
          />
        </el-form-item>

        <el-form-item label="头像">
          <el-input v-model="userInfo.newUser.avatar" placeholder="头像" />
        </el-form-item>
      </el-form>

      <div style="text-align:right;">
        <el-button type="danger" @click="dialogInfo.dialogCreateOrUpdateUserVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmCreateOrUpdateUser(createOrUpdateUserFormRef)">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog v-model="dialogInfo.dialogAssignUserVisible" :title="dialogInfo.dialogAssignUserTitle">
      <h3 style="margin-bottom:30px">角色列表</h3>
      <!-- 当前用户的角色信息 只能选择一个角色 -->
      <el-checkbox-group v-model="roleInfo.currentUserRoleList" :max="1">
        <el-checkbox v-for="(role, index) in roleInfo.roleList" :key="index" :label="role.roleName" />
      </el-checkbox-group>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogInfo.dialogAssignUserVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmAssignUser">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { getAllUserRoleInfo, assignUserRoles, createUser, deleteUser, readUser, updateUser } from '@/api/user'
import { deepClone } from '@/utils/index'
import { getAllRoles, getRoleNameByPermissionName } from '@/api/role'
import { checkPermission } from '@/utils/permission' // 权限判断函数
import { nextTick, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { ElForm } from 'element-plus'

type FormInstance = InstanceType<typeof ElForm>
const createOrUpdateUserFormRef = ref<FormInstance>()

interface roleInfoIF {
  roleName: string
  roleDescription: string
}

interface userInfoIF {
  username: string
  password: string
  confirmPassword: string
  nickname: string
  introduction: string
  avatar: string
  roleList: Array<roleInfoIF>
  // 需要动态用到key-value时，需要声明类型！
  [key: string]: any
}

const defaultUser = {
  username: '',
  nickname: '',
  introduction: '',
  avatar: ''
}

const userInfo = reactive({
  user: Object.assign({}, defaultUser),
  userInfoList: [],
  newUser: {
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    introduction: '',
    avatar: ''
  } as userInfoIF,
  // 数据库密码
  dbPassword: '',
  isUsernameDisable: false
})

const roleInfo = reactive({
  roleList: [{
    roleName: ''
  }],
  // 当前用户的角色信息
  currentUserRoleList: [] as Array<string>,
  // 具体 创建用户 功能的角色
  createUserRoles: [] as Array<string>,
  // 具有 更新用户 功能的角色
  updateUserRoles: [] as Array<string>,
  // 具有 分配用户角色 功能的角色
  assignUserRoles: [] as Array<string>,
  // 具有 删除用户 功能的角色
  deleteUserRoles: [] as Array<string>
})

// #region 表单验证
const validateUsername = (rule:any, value:any, callback:any) => {
  // 自定义用户名认证
  if (value.length < 1) {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const validatePassword = (rule:any, value:any, callback:any) => {
  if (value.length < 6) {
    callback(new Error('请输入不少于6位密码'))
  } else {
    callback()
  }
}

const createOrUpdateUserRules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }],
  confirmPassword: [{ required: true, trigger: 'blur', validator: validatePassword }]
})
// #endregion

const dialogInfo = reactive({
  dialogAssignUserVisible: false,
  // 新建/更新 用户控制
  dialogCreateOrUpdateUserTitle: '新建用户',
  dialogCreateOrUpdateUserVisible: false,
  dialogAssignUserTitle: ''
})

// #region 初始获取用户和角色信息
// 获取所有用户信息
const getUserList = async() => {
  const res = await getAllUserRoleInfo()
  userInfo.userInfoList = res.data.data
}

// 获取所有角色信息
const getRoleList = async() => {
  const res = await getAllRoles()
  roleInfo.roleList = res.data.data
}

// 获取 能够操纵 各个操作权限的 角色信息
const getOperateRoles = async() => {
  // 获取能够操作 创建用户 功能的所有角色名称
  let res = await getRoleNameByPermissionName('createUser')
  roleInfo.createUserRoles = res.data.data

  // 获取能够操作 更新用户 功能的所有角色名称
  res = await getRoleNameByPermissionName('updateUser')
  roleInfo.updateUserRoles = res.data.data

  // 获取能够操作 分配用户角色 功能的所有角色名称
  res = await getRoleNameByPermissionName('assignUserRole')
  roleInfo.assignUserRoles = res.data.data

  // 获取能够操作 删除用户 功能的所有角色名称
  res = await getRoleNameByPermissionName('deleteUser')
  roleInfo.deleteUserRoles = res.data.data
}

// 后端获取数据
getUserList()
getRoleList()
getOperateRoles()
// #endregion

// #region 新建/更新用户操作
// 新建用户按钮
const handleCreateUser = () => {
  dialogInfo.dialogCreateOrUpdateUserVisible = true
  dialogInfo.dialogCreateOrUpdateUserTitle = '新建用户'
}

// 更新用户按钮
const handleUpdateUser = async(row:userInfoIF) => {
  dialogInfo.dialogCreateOrUpdateUserVisible = true
  dialogInfo.dialogCreateOrUpdateUserTitle = '更新用户'
  userInfo.isUsernameDisable = true

  // 查找当前用户信息 并显示到对话框中
  userInfo.newUser.username = row.username
  const res = await readUser(row.username)
  const databaseUserInfo = res.data.data[0]

  // 赋值到对话框中
  for (const key in databaseUserInfo) {
    userInfo.newUser[key] = databaseUserInfo[key]
  }
  // MD5只能正向加密 不能逆向解密
  // 数据库存的是密文密码 无法获取原始输入密码
  // 这里采用 保存数据库密码，如果没有更新密码，则不提交密码信息 的解决方案
  userInfo.dbPassword = userInfo.newUser.password
  userInfo.newUser.confirmPassword = userInfo.newUser.password
}

// 确定新建/更新用户按钮
const confirmCreateOrUpdateUser = async(formEl: FormInstance | undefined) => {
  if (!formEl) return
  // 表单验证
  formEl.validate(async valid => {
    if (valid) {
      if (userInfo.newUser.password !== userInfo.newUser.confirmPassword) {
        ElMessage.error('密码不一致')
      } else {
        // 需要复制一份，后面有删除操作
        const newUpdateUser = deepClone(userInfo.newUser) as any
        // 新建/更新的用户角色信息 注意删除用户的确认密码
        delete newUpdateUser.confirmPassword
        if (dialogInfo.dialogCreateOrUpdateUserTitle === '更新用户') {
          // 没有更新密码
          if (userInfo.dbPassword === newUpdateUser.password) {
            delete newUpdateUser.password
          }
          await updateUser(newUpdateUser)
          ElMessage.success('更新用户成功')
        } else {
          await createUser(newUpdateUser)
          ElMessage.success('新建用户成功')
        }
        for (const key in userInfo.newUser) {
          userInfo.newUser[key] = ''
        }
        dialogInfo.dialogCreateOrUpdateUserVisible = false
        // 重新获取用户信息
        getUserList()
      }
    } else {
      return false
    }
  })
}
// #endregion

// #region 分配用户角色操作
// 分配用户的角色权限 按钮
const handleAssignUser = (row:userInfoIF) => {
  // 复制一份user
  userInfo.user = deepClone(row) as userInfoIF
  dialogInfo.dialogAssignUserVisible = true
  dialogInfo.dialogAssignUserTitle = '给 ' + row.username + ' 分配角色'

  nextTick(() => {
    roleInfo.currentUserRoleList.splice(0, roleInfo.currentUserRoleList.length)
    const roles = row.roleList
    roles.forEach(role => {
      // 将该用户的角色信息放到选项框中
      roleInfo.currentUserRoleList.push(role.roleName)
    })
  })
}

// 确定 分配用户角色 按钮
const confirmAssignUser = async() => {
  // 目前业务为：一个用户有且仅有一个角色
  if (roleInfo.currentUserRoleList.length === 0) {
    ElMessage.error('请分配用户角色')
  } else {
    // 分配用户角色 参数：[用户名,角色]
    await assignUserRoles(userInfo.user.username, roleInfo.currentUserRoleList[0])
    ElMessage.success('分配角色成功')
    dialogInfo.dialogAssignUserVisible = false
  }
  // 重新获取用户信息
  getUserList()
}
// #endregion

// #region 删除用户操作
// 删除用户按钮
const handleDeleteUser = (index:number, row:userInfoIF) => {
  ElMessageBox.confirm('确定要删除该用户吗?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async() => {
      await deleteUser(row.username)
      // 删除列表中的用户数据
      userInfo.userInfoList.splice(index, 1)
      ElMessage.success('删除用户成功!')
    })
    .catch(err => { console.error(err) })
}
// #endregion
</script>

<style lang="scss" scoped>
.user-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
