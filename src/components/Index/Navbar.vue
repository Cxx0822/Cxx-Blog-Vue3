<template>
  <div class="blog-navbar" :class="{'transparent':$route.name==='Home' }">
    <!-- 博客名称路由菜单 -->
    <router-link
      class="router-link-item"
      to="/">
      <h3
        :class="{'active':$route.name==='About'}"
        style="display: inline;padding:20px 20px 20px 60px">
        Cxx's Blog
      </h3>
    </router-link>

    <!-- 首页路由菜单 -->
    <router-link
      :class="{'active':$route.name==='Index'}"
      class="router-link-item"
      to="/">
      首页
    </router-link>

    <!-- 分类路由菜单 -->
    <el-dropdown trigger="click" @mousedown="getTypes">
      <span
        :class="{'active':$route.name==='Category'}"
        class="el-dropdown-link item"
        style="text-decoration-line: none;color: white; font-size: 16px;padding:20px"
      >
        分类
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>

      <template #dropdown>
        <el-dropdown-menu style="background-color: #333333;">
          <el-dropdown-item
            v-for="(type, index) in typeInfo.types"
            :key="index"
            @click="categoryRoute(type.typeName)"
            style="color: white"
          >
            {{ type.typeName }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 归档路由菜单 -->
    <router-link
      :class="{'active':$route.name==='Archives'}"
      class="router-link-item"
      to="/archives">
      归档
    </router-link>

    <!-- 友链路由菜单 -->
    <router-link
      :class="{'active':$route.name==='Friends'}"
      class="router-link-item"
      to="/friends">
      友链
    </router-link>

    <!-- 关于我路由菜单 -->
    <router-link
      :class="{'active':$route.name==='About'}"
      class="router-link-item"
      to="/about">
      关于我
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'

const axios: any = inject('axios') // inject axios

// 直接定义成数组有问题？？
const typeInfo = reactive({
  types: [{
    id: 0,
    typeName: ''
  }]
})

// 获取分类表
const getTypes = ():void => {
  // 调用方法
  axios.get('/type/listAll')
    .then((res: any) => {
      typeInfo.types = res.data.data.typeList
    })
    .catch((error: any) => {
      console.log(error)
    })
}

// 转到分类路由
const categoryRoute = (typeName: string): void => {
  console.log(typeName)
}

</script>

<style lang="less">
.el-dropdown-menu {
  margin: 20px 0 0 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: #1b1c1d !important;
}

.el-dropdown-menu__item {
  padding: 0px 15px 0px 15px !important;

}

.el-dropdown-menu__item:hover {
  background-color: #399BDD!important;
}

</style>

<style lang="less" scoped>
.blog-navbar {
  height: 50px;
  padding-top: 20px;
  background-color: #333333;
  margin-left: auto !important;
  margin-right: auto !important;

  .router-link-item{
    text-decoration-line: none;
    color: white;
    padding: 15px;
  }

  .el-dropdown-link {
    outline-style: none !important;
    outline-color: unset !important;
    height: 100%;
    cursor: pointer;
  }
}
</style>
