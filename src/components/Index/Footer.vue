<template>
  <!--网站底部-->
  <div class="footer">
    <el-row :gutter="24" style="padding-top: 30px">
      <el-col :sm="8">
        <el-row :gutter="24" class="footer-title">
          <el-col :span="4" :offset="7">联系博主</el-col>
        </el-row>
        <el-row :gutter="24" class="footer-content">
          <el-col :sm="10" :offset="4">
            QQ:{{ personalInfo.QQ }}
            <br>
            邮箱:{{ personalInfo.Email }}
          </el-col>
        </el-row>
      </el-col>

      <el-col :sm="8">
        <el-row :gutter="24" class="footer-title">
          <el-col :span="24">签名</el-col>
        </el-row>
        <el-row :gutter="24" class="footer-content">
          <el-col :span="24" style="font-size: 15px">
            {{ footerMotto }}
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="8">
        <el-row :gutter="24" class="footer-title">
          <el-col :span="24">网站信息</el-col>
        </el-row>
        <el-row :gutter="24" class="footer-content">
          <el-col :span="24">
            总访问量：{{ websiteCount.pv }} <br>
            访客量: {{ websiteCount.uv }}
          </el-col>
        </el-row>
      </el-col>

    </el-row>
    <el-divider ></el-divider>

    <el-row :gutter="24" style="height: 50px;margin-top: 25px;font-size: 12px">
      <el-col :span="24">
        Copyright&nbsp;&copy;&nbsp;2021-2022&nbsp;Skymo's&nbsp;Blog.&nbsp;All&nbsp;rights&nbsp;reserved.&nbsp;
      </el-col>
    </el-row>

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const personalInfo = reactive({
  QQ: '1556464090',
  Email: '1556464090@qq.com'
})

const footerMotto = ref('青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪')

const websiteCount = reactive({
  pv: 0,
  uv: 0
})

</script>

<style scoped>
.footer {
  margin: 0 auto;
  text-align: center;
  min-height: 20px;
  max-width: 100%;
  padding: 0 15px;
}

.footer-title {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
}

.footer-content {
  font-size: 13px;
}
</style>
