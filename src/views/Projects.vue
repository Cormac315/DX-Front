<template>
  <div class="projects-container">
    <div class="projects-header">
      <h2>我的项目</h2>
      <button class="new-project-btn header-btn" @click="goHome" title="新项目">
        <svg width="18" height="18" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 192v640M192 512h640" stroke="#67c23a" stroke-width="64" stroke-linecap="round"/>
        </svg>
        新项目
      </button>
      <button class="delete-all-btn header-btn" @click="confirmDeleteAll" title="删除所有项目">
        <svg width="18" height="18" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M320 896c0 35.2 28.8 64 64 64h256c35.2 0 64-28.8 64-64V320H320v576zM432 432h64v384h-64V432zm160 0h-64v384h64V432z" fill="#f56c6c"/>
          <path d="M864 192h-176V128c0-35.2-28.8-64-64-64H400c-35.2 0-64 28.8-64 64v64H160c-17.6 0-32 14.4-32 32v32c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32v-32c0-17.6-14.4-32-32-32zm-432-64h192v64H432V128z" fill="#f56c6c"/>
        </svg>
        删除所有项目
      </button>
      <el-button type="primary" @click="loadProjects(true)" size="small" class="refresh-btn header-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="margin-right:4px;">
          <path d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V7c1.93 0 3.68.78 4.95 2.05A7 7 0 1 1 5 12H3a9 9 0 1 0 14.65-5.65z" fill="currentColor"/>
        </svg>
        刷新
      </el-button>
    </div>
    <el-empty description="暂无项目" v-if="!projects.length">
      <el-button type="primary" @click="goHome">创建新项目</el-button>
    </el-empty>
    <div v-else class="project-list">
      <div v-for="project in projects" :key="project.id" class="project-card-wrapper">
        <el-card class="project-card" @click="openProject(project.id)" shadow="hover">
          <template #header>
            <div class="card-header">
              <div class="header-title">
                <span class="project-title">{{ project.title }}</span>
              </div>
              <el-tag size="small">{{ formatTime(project.updateTime) }}</el-tag>
            </div>
          </template>
          <div class="project-info">
            <p>
              对话数：{{ project.messages?.length || 0 }}
              <span class="status-label">状态：</span>
              <span class="status-text" :class="{ 'status-running': project.running, 'status-terminated': !project.running }">
                {{ project.running ? '进行中' : '终止' }}
              </span>
            </p>
          </div>
        </el-card>
        <button class="delete-abs-btn" @click.stop="confirmDelete(project.id)" title="删除项目">
          <svg width="18" height="18" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M320 896c0 35.2 28.8 64 64 64h256c35.2 0 64-28.8 64-64V320H320v576zM432 432h64v384h-64V432zm160 0h-64v384h64V432z" fill="#f56c6c"/>
            <path d="M864 192h-176V128c0-35.2-28.8-64-64-64H400c-35.2 0-64 28.8-64 64v64H160c-17.6 0-32 14.4-32 32v32c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32v-32c0-17.6-14.4-32-32-32zm-432-64h192v64H432V128z" fill="#f56c6c"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Delete } from '@element-plus/icons-vue'
const STORAGE_KEY = 'pentest-chat-projects'

export default {
  name: 'Projects',
  components: { Delete },
  data() {
    return {
      projects: []
    }
  },
  created() {
    this.loadProjects()
  },
  mounted() {
    this.loadProjects()
  },
  methods: {
    loadProjects(showMsg = false) {
      this.projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').sort((a, b) => b.updateTime - a.updateTime)
      if (showMsg) {
        this.$message.success({ message: '已刷新', duration: 1000 })
      }
    },
    openProject(id) {
      this.$router.push({ path: '/', query: { projectId: id } })
    },
    goHome() {
      // 新建前检查是否已有运行中项目
      let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      if (projects.some(p => p.running)) {
        this.$message.warning('同一时间只允许一个项目进行中，请先终止其他项目！')
        return
      }
      // 新建一个空项目并跳转
      const d = new Date()
      const title = `Project_${d.getMonth()+1}_${d.getDate()}_${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
      const id = Date.now().toString()
      const newProject = {
        id,
        title,
        messages: [],
        inputMessage: '',
        updateTime: Date.now(),
        targetInfo: {
          ip: '',
          ports: '',
          os: '',
          services: ''
        }
      }
      projects.push(newProject)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
      localStorage.setItem('pentest-chat-last', id)
      this.$router.push({ path: '/', query: { projectId: id } })
    },
    formatTime(ts) {
      if (!ts) return ''
      const d = new Date(ts)
      return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
    },
    deleteProject(id) {
      let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      projects = projects.filter(p => p.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
      this.loadProjects()
    },
    deleteAllProjects() {
      localStorage.removeItem(STORAGE_KEY)
      this.loadProjects()
    },
    confirmDelete(id) {
      if (window.confirm('确定要删除该项目吗？')) {
        this.deleteProject(id)
      }
    },
    confirmDeleteAll() {
      if (window.confirm('确定要删除所有项目吗？')) {
        this.deleteAllProjects()
      }
    }
  }
}
</script>

<style scoped>
.projects-container {
  padding: 20px;
}

.projects-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-btn {
  height: 38px;
  min-width: 110px;
  padding: 0 16px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  box-sizing: border-box;
  line-height: 1;
}

.new-project-btn {
  background: #fff;
  border: 1.5px solid #67c23a;
  color: #67c23a;
  font-weight: 500;
  transition: background 0.2s, box-shadow 0.2s, color 0.2s;
}
.new-project-btn svg {
  display: inline-block;
}
.new-project-btn:hover {
  background: #f0f9eb;
  color: #67c23a;
  box-shadow: 0 2px 8px #67c23a33;
}

.delete-all-btn {
  background: #fff;
  border: 1.5px solid #f56c6c;
  color: #f56c6c;
  transition: background 0.2s, box-shadow 0.2s;
}
.delete-all-btn svg {
  display: inline-block;
}
.delete-all-btn:hover {
  background: #fde2e2;
  box-shadow: 0 2px 8px #f56c6c33;
}

.refresh-btn {
  background: #fff;
  color: #409EFF;
  border: 1.5px solid #409EFF;
  transition: background 0.2s, color 0.2s, border 0.2s;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 15px;
  height: 38px;
  min-width: 110px;
  padding: 0 16px;
  border-radius: 6px;
  box-sizing: border-box;
  line-height: 1;
}
.refresh-btn svg {
  display: inline-block;
  vertical-align: middle;
}
.refresh-btn:hover {
  background: #f0f6ff;
  color: #409EFF;
  border-color: #66b1ff;
}

.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.project-card-wrapper {
  position: relative;
}

.project-card {
  height: 100%;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.project-card:hover {
  box-shadow: 0 4px 16px 0 rgba(64,158,255,0.18);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-status {
  display: flex;
  align-items: center;
  gap: 4px;
}

.status-label {
  font-size: 16px;
  color: #666;
  margin-left: 16px;
}

.project-title {
  font-weight: 500;
  font-size: 16px;
}

.status-text {
  font-size: 16px;
  color: #f56c6c;
  font-weight: 500;
}

.status-text.status-running {
  color: #67c23a;
}

.status-text.status-terminated {
  color: #f56c6c;
}

.delete-abs-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #fff;
  border: 1px solid #f56c6c;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  z-index: 10;
}
.delete-abs-btn:hover {
  background: #fde2e2;
  box-shadow: 0 2px 8px #f56c6c33;
}

.project-info {
  color: #666;
}
</style> 