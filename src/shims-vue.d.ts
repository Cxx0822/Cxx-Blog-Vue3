/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明.scss文件
declare module '*.scss' {
  const classes: {
    readonly [key: string]: string
  }
  export default classes
  declare module '*.scss'
}
