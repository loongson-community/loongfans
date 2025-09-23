import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

export default {
  // 继承核心样式
  extends: DefaultTheme,
  // 覆盖布局但继承功能
  Layout: Layout
}
