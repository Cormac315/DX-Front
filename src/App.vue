<template>
  <div class="app-layout">
    <aside class="side-nav">
      <div
        v-for="item in navItems"
        :key="item.path"
        :class="['nav-item', { active: activeIndex === item.path }]"
        @click="onMenuSelect(item.path)"
        @mouseenter="hoverIndex = item.path"
        @mouseleave="hoverIndex = null"
      >
        <span class="nav-icon" v-html="item.icon"></span>
        <transition name="fade">
          <span
            v-if="hoverIndex === item.path"
            class="nav-label"
          >{{ item.label }}</span>
        </transition>
      </div>
    </aside>
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: this.getActiveIndex(this.$route.path),
      hoverIndex: null,
      navItems: [
        {
          path: '/',
          label: '主页',
          icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 10.5L12 4l9 6.5V20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4h-4v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10.5z" stroke="#409EFF" stroke-width="2" fill="none"/></svg>`
        },
        {
          path: '/projects',
          label: '我的项目',
          icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" stroke="#409EFF" stroke-width="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#409EFF" stroke-width="2"/></svg>`
        },
        {
          path: '/settings',
          label: '设置',
          icon: `<svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="#409EFF" stroke-width="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" stroke="#409EFF" stroke-width="2"/></svg>`
        }
      ]
    }
  },
  watch: {
    '$route'(to) {
      this.activeIndex = this.getActiveIndex(to.path)
    }
  },
  methods: {
    onMenuSelect(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
      this.activeIndex = path
    },
    getActiveIndex(path) {
      if (path.startsWith('/projects')) return '/projects'
      if (path.startsWith('/settings')) return '/settings'
      return '/'
    }
  }
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
  background: #f5f7fa;
}
.side-nav {
  width: 60px;
  background: #fff;
  border-right: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  box-shadow: 2px 0 8px 0 rgba(64,158,255,0.04);
  z-index: 10;
}
.nav-item {
  width: 44px;
  height: 44px;
  margin-bottom: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, width 0.2s;
  position: relative;
}
.nav-item.active,
.nav-item:hover {
  background: #eaf4ff;
}
.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-label {
  position: absolute;
  left: 54px;
  white-space: nowrap;
  background: #fff;
  color: #409EFF;
  font-size: 15px;
  padding: 4px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px #409eff22;
  z-index: 100;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.2s;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.main-content {
  flex: 1;
  min-width: 0;
  overflow: auto;
  padding: 0;
}
</style> 