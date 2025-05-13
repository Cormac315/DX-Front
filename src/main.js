import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

// 设置动态标题
router.beforeEach((to, from, next) => {
  let title = '洞玄'
  switch (to.path) {
    case '/':
      title += ' - 主页'
      break
    case '/projects':
      title += ' - 我的项目'
      break
    case '/settings':
      title += ' - 设置'
      break
  }
  document.title = title
  next()
})

app.mount('#app') 