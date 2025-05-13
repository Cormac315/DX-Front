<template>
  <div class="home-container">
    <div class="chat-container">
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="Logo" class="logo-image">
      </div>
      <div
        class="dynamic-island"
        :class="{ collapsed: isIslandCollapsed }"
        @mouseenter="isIslandCollapsed = false"
        @mouseleave="isIslandCollapsed = true"
      >
        <div v-if="isIslandCollapsed" class="island-collapsed">
          <svg width="38" height="18" viewBox="0 0 38 18" fill="none">
            <rect x="1" y="1" width="36" height="16" rx="8" fill="#222" fill-opacity="0.85" stroke="#409EFF" stroke-width="2"/>
            <circle cx="19" cy="9" r="4" fill="#409EFF" fill-opacity="0.7"/>
          </svg>
        </div>
        <transition name="island-expand">
          <div v-show="!isIslandCollapsed" class="island-content">
            <el-input v-model="title" class="island-title-input" size="large" :maxlength="40" />
            <div class="island-actions">
              <el-tooltip content="初始化" placement="bottom">
                <el-button class="action-btn" @click="onInit" circle>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <polygon points="8,6 18,12 8,18" fill="#409EFF"/>
                  </svg>
                </el-button>
              </el-tooltip>
              <el-tooltip content="终止任务" placement="bottom">
                <el-button class="action-btn" @click="onTerminate" circle>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" rx="2" fill="#faad14"/>
                  </svg>
                </el-button>
              </el-tooltip>
              <el-tooltip content="生成报告" placement="bottom">
                <el-button class="action-btn" @click="onReport" circle>
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <rect x="4" y="4" width="16" height="16" rx="2" fill="#67c23a"/>
                    <path d="M8 8h8M8 12h8M8 16h4" stroke="#fff" stroke-width="2"/>
                  </svg>
                </el-button>
              </el-tooltip>
              <el-tooltip content="保存项目" placement="bottom">
                <el-button class="action-btn" circle @click="handleSaveClick">
                  <span class="save-svg-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" fill="#409EFF"/>
                      <rect x="7" y="3" width="10" height="4" fill="#fff"/>
                      <rect x="8" y="14" width="8" height="5" rx="1" fill="#fff"/>
                      <rect x="10" y="5" width="4" height="2" rx="1" fill="#409EFF"/>
                      <rect x="9" y="8" width="6" height="2" rx="1" fill="#fff"/>
                    </svg>
                  </span>
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除项目" placement="bottom">
                <el-button class="action-btn" circle @click="confirmDeleteProject">
                  <span class="delete-svg-icon">
                    <svg width="20" height="20" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M320 896c0 35.2 28.8 64 64 64h256c35.2 0 64-28.8 64-64V320H320v576zM432 432h64v384h-64V432zm160 0h-64v384h64V432z" fill="#f56c6c"/>
                      <path d="M864 192h-176V128c0-35.2-28.8-64-64-64H400c-35.2 0-64 28.8-64 64v64H160c-17.6 0-32 14.4-32 32v32c0 17.6 14.4 32 32 32h704c17.6 0 32-14.4 32-32v-32c0-17.6-14.4-32-32-32zm-432-64h192v64H432V128z" fill="#f56c6c"/>
                    </svg>
                  </span>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </transition>
      </div>
      <div class="chat-messages" ref="messageContainer">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message-row', message.type === 'user' ? 'user-row' : 'bot-row']"
        >
          <div class="avatar-wrapper">
            <div class="avatar">
              <template v-if="message.type === 'bot'">
                <!-- 机器人SVG -->
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="16" width="32" height="20" rx="10" fill="#409EFF"/>
                  <circle cx="16" cy="26" r="3" fill="#fff"/>
                  <circle cx="32" cy="26" r="3" fill="#fff"/>
                  <rect x="20" y="32" width="8" height="2" rx="1" fill="#fff"/>
                  <rect x="22" y="10" width="4" height="8" rx="2" fill="#409EFF"/>
                </svg>
              </template>
              <template v-else>
                <!-- 用户SVG（无外圈，仅蓝色人形） -->
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="24" fill="#fff"/>
                  <circle cx="24" cy="18" r="8" fill="#fff" stroke="#409EFF" stroke-width="2"/>
                  <path d="M24 30c-6 0-12 3-12 7v1a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-1c0-4-6-7-12-7z" fill="#fff" stroke="#409EFF" stroke-width="2"/>
                </svg>
              </template>
            </div>
          </div>
          <div
            class="bubble-block"
            :class="message.type === 'user' ? 'bubble-block-reverse' : 'bubble-block-normal'"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
          >
            <div 
              class="bubble" 
              :class="[
                message.type === 'user' ? 'user-bubble' : 'bot-bubble',
                hoveredIndex === index ? 'bubble-hovered' : ''
              ]"
            >
              {{ message.content }}
            </div>
            <div
              class="bubble-actions"
              v-show="hoveredIndex === index"
            >
              <button class="action-btn" @click="copyMessage(message.content)">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="#409EFF"/></svg>
              </button>
              <button class="action-btn" @click="deleteMessage(index)">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-4.5l-1-1z" fill="#f56c6c"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="ds-input-bar">
        <div class="ds-input-row">
          <el-input
            v-model="inputMessage"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 5 }"
            placeholder="请在此输入并与系统交互，使用Enter进行发送，使用Shift+Enter换行"
            @keydown="handleInputKeydown"
            class="ds-input"
          />
          <div class="ds-btn-group">
            <button class="icon-btn upload-btn" @click="triggerFileInput" title="上传附件">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5" stroke="#409EFF" stroke-width="1.8" stroke-linecap="round"/>
                <path d="M6 11l6-6 6 6" stroke="#409EFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <input ref="fileInput" type="file" multiple style="display:none" @change="handleFileChange" />
            <button class="icon-btn send-btn" :disabled="!inputMessage.trim()" @click="sendMessage">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18"><path d="M3 20l18-8-18-8v6l12 2-12 2v6z" fill="currentColor"/></svg>
            </button>
          </div>
        </div>
        <div v-if="selectedFiles.length" class="file-list">
          <div v-for="(file, idx) in selectedFiles" :key="file.name + idx" class="file-item">
            <span>{{ file.name }}</span>
            <span class="remove-file" @click="removeFile(idx)">×</span>
          </div>
        </div>
      </div>
      <el-dialog v-model="showInitDialog" title="初始化目标信息" width="400px" :close-on-click-modal="false">
        <el-form label-width="80px">
          <el-form-item label="目标名称">
            <el-input v-model="targetInfo.name" maxlength="32" show-word-limit placeholder="请输入目标名称" />
          </el-form-item>
          <el-form-item label="目标IP">
            <el-input v-model="targetInfo.ip" maxlength="15" placeholder="如 192.168.1.1" />
          </el-form-item>
          <el-form-item label="指导信息">
            <el-input v-model="targetInfo.desc" type="textarea" :rows="4" maxlength="200" show-word-limit placeholder="（可选）您可以让洞玄获取目标的Web Shell权限甚至是Root权限" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="showInitDialog = false">取消</el-button>
          <el-button type="primary" @click="confirmInit">确定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { Tools, Save } from '@element-plus/icons-vue'

function getNowProjectTitle() {
  const d = new Date()
  return `Project_${d.getMonth()+1}_${d.getDate()}_${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`
}

const STORAGE_KEY = 'pentest-chat-projects'

export default {
  name: 'Home',
  components: { Tools, Save },
  data() {
    return {
      messages: [],
      inputMessage: '',
      isToolbarCollapsed: false,
      title: getNowProjectTitle(),
      projectId: null,
      inited: false,
      showInitDialog: false,
      targetInfo: {
        name: '',
        ip: '',
        desc: ''
      },
      selectedFiles: [],
      hoveredIndex: null,
      isIslandCollapsed: true
    }
  },
  created() {
    // 如果有路由参数projectId，则加载历史对话，否则尝试恢复未完成的会话
    if (this.$route && this.$route.query.projectId) {
      this.loadProject(this.$route.query.projectId)
    } else {
      this.restoreLastProject()
    }
  },
  watch: {
    title() {
      this.saveProject()
    },
    messages: {
      handler() { this.saveProject() },
      deep: true
    },
    inputMessage() {
      this.saveProject()
    }
  },
  methods: {
    sendMessage() {
      if (!this.inputMessage.trim()) return
      if (!this.inited) {
        this.messages.push({
          type: 'bot',
          content: '请先初始化'
        })
        this.inputMessage = ''
        this.$nextTick(() => {
          const container = this.$refs.messageContainer
          container.scrollTop = container.scrollHeight
        })
        return
      }
      this.messages.push({
        type: 'user',
        content: this.inputMessage
      })
      this.inputMessage = ''
      this.$nextTick(() => {
        const container = this.$refs.messageContainer
        container.scrollTop = container.scrollHeight
      })
      this.saveProject()
    },
    handleInputKeydown(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        this.sendMessage()
      }
      // Shift+Enter 默认行为就是换行，无需处理
    },
    onInit() {
      this.showInitDialog = true
    },
    confirmInit() {
      const name = this.targetInfo.name || '';
      const ip = this.targetInfo.ip || '';
      if (!name.trim()) {
        this.$message.error('目标名称不能为空')
        return
      }
      if (!ip.trim() || !/^\d{1,3}(\.\d{1,3}){3}$/.test(ip.trim())) {
        this.$message.error('请输入正确的IP地址')
        return
      }
      // 可以根据需要添加更多校验
      this.inited = true
      this.showInitDialog = false
      this.$message.success('初始化成功')
    },
    onTerminate() {
      // TODO: 终止任务逻辑
      this.$message.warning('终止任务功能待实现')
    },
    onReport() {
      // TODO: 生成报告逻辑
      this.$message.success('生成报告功能待实现')
    },
    toggleToolbar() {
      this.isToolbarCollapsed = !this.isToolbarCollapsed
    },
    saveProject() {
      // 保存到localStorage，包括inputMessage
      let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      // 如果没有projectId，生成唯一id并赋值
      if (!this.projectId) {
        this.projectId = Date.now().toString() + Math.floor(Math.random()*10000)
      }
      let id = this.projectId
      let idx = projects.findIndex(p => p.id === id)
      const project = {
        id,
        title: this.title,
        messages: this.messages || [],
        inputMessage: this.inputMessage || '',
        updateTime: Date.now(),
        inited: this.inited,
        targetInfo: this.targetInfo
      }
      if (idx >= 0) {
        projects[idx] = project
      } else {
        projects.push(project)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
      localStorage.setItem('pentest-chat-last', id)
    },
    loadProject(id) {
      let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      let p = projects.find(p => p.id === id)
      if (p) {
        this.title = p.title
        this.messages = p.messages || []
        this.inputMessage = p.inputMessage || ''
        this.projectId = p.id
        this.inited = p.inited || false
        this.targetInfo = p.targetInfo || {
          name: '',
          ip: '',
          desc: ''
        }
        // 如果是新建项目且内容为空，自动保存一次，确保能在我的项目中看到
        if ((!p.messages || p.messages.length === 0) && (!p.inputMessage || p.inputMessage === '')) {
          this.saveProject()
        }
      }
    },
    restoreLastProject() {
      // 恢复上次未完成的会话
      const lastId = localStorage.getItem('pentest-chat-last')
      if (lastId) {
        this.loadProject(lastId)
      } else {
        this.saveProject()
      }
    },
    confirmDeleteProject() {
      if (window.confirm('确定要删除当前对话项目吗？')) {
        this.deleteCurrentProject()
      }
    },
    deleteCurrentProject() {
      let projects = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      projects = projects.filter(p => p.id !== this.projectId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
      // 跳转到我的项目页面
      this.$router.push('/projects')
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(e) {
      this.selectedFiles = Array.from(e.target.files);
    },
    removeFile(idx) {
      this.selectedFiles.splice(idx, 1);
    },
    handleSaveClick() {
      this.saveProject();
      this.$message.success('保存成功');
    },
    copyMessage(content) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(content);
        this.$message.success('已复制');
      } else {
        // 兼容性处理
        const textarea = document.createElement('textarea');
        textarea.value = content;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        this.$message.success('已复制');
      }
    },
    deleteMessage(index) {
      this.messages.splice(index, 1);
      this.saveProject();
      this.$message.success('已删除');
    }
  }
}
</script>

<style scoped>
:global(body), :global(html) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:global(.el-main) {
  padding: 0 !important;
}
.home-container {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  height: 100%;
  min-height: 0;
  overflow: auto;
  padding-bottom: 80px;
  box-sizing: border-box;
}

.logo-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
}

.logo-image {
  width: 800px;
  height: auto;
  opacity: 0.8;
  max-width: 90vw;
  max-height: 60vh;
}

.dynamic-island {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  transition: min-width 0.4s cubic-bezier(.55,0,.1,1), max-width 0.4s cubic-bezier(.55,0,.1,1), padding 0.4s, box-shadow 0.4s, background 0.4s;
  min-width: 420px;
  max-width: 700px;
  background: rgba(30, 30, 30, 0.85);
  border-radius: 32px;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
  padding: 10px 32px;
  gap: 24px;
  backdrop-filter: blur(8px);
  justify-content: center;
}
.dynamic-island.collapsed {
  min-width: 38px;
  max-width: 38px;
  padding: 0;
  background: rgba(30, 30, 30, 0.85);
  box-shadow: 0 2px 8px 0 rgba(64,158,255,0.10);
  justify-content: center;
  cursor: pointer;
}
.island-collapsed {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 18px;
  pointer-events: auto;
}
.island-content {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
}
.island-expand-enter-active, .island-expand-leave-active {
  transition: opacity 0.3s;
}
.island-expand-enter-from, .island-expand-leave-to {
  opacity: 0;
}

.island-title-input {
  flex: 1;
  min-width: 120px;
  max-width: 320px;
  background: transparent;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border: none;
  text-align: center;
}

:deep(.island-title-input .el-input__wrapper) {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  color: #fff !important;
}

:deep(.island-title-input .el-input__inner) {
  color: #fff !important;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.island-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  background: rgba(255,255,255,0.12);
  border: none;
  color: #fff;
  transition: background 0.2s;
}

.action-btn:hover {
  background: rgba(64,158,255,0.18);
}

.chat-messages {
  flex: 1 1 0;
  overflow-y: auto;
  padding: 20px;
  position: relative;
  z-index: 2;
  min-height: 0;
}

.message-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid #409EFF;
  background: #fff;
  margin-right: 12px;
  box-shadow: 0 0 0 2px #e6f0fa;
  flex-shrink: 0;
}

.user-row .avatar-wrapper {
  margin-left: 16px;
  margin-right: 0;
  order: 2;
}

.bubble-block {
  display: flex;
  align-items: center;
  width: 100%;
}
.bubble-block-reverse {
  flex-direction: row-reverse;
}
.bubble-block-normal {
  flex-direction: row;
}
.bubble-actions {
  margin: 0 8px;
  display: flex;
  gap: 8px;
  position: relative;
}

.user-row {
  justify-content: flex-end;
}

.user-row .bubble {
  background-color: #409EFF;
  color: white;
}

.bot-row {
  justify-content: flex-start;
}

.bot-row .bubble {
  background-color: #eaf4ff;
  color: #2563a6;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ds-input-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto 0 auto;
  max-width: 700px;
  width: 100%;
  background: #e3e4e8;
  border-radius: 28px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
  padding: 12px 24px 12px 24px;
  z-index: 20;
  border: none;
  gap: 0;
  height: auto;
  min-height: unset;
  overflow: visible;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ds-input-bar:focus-within {
  transform: translateY(-60px);
}

.ds-input-row {
  display: flex;
  width: 100%;
  position: relative;
}

.ds-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #222;
  line-height: 1.6;
}

.ds-btn-group {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 0 2px 2px 0;
  z-index: 21;
  transition: none;
  margin-left: 24px;
}

.icon-btn {
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
  font-size: 16px;
  color: #409EFF;
}

.icon-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.icon-btn:hover:not(:disabled) {
  background: #f0f6ff;
  box-shadow: 0 4px 16px rgba(64, 158, 255, 0.10);
}

.file-list {
  position: absolute;
  left: 32px;
  bottom: 70px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  max-width: 80%;
  word-break: break-all;
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remove-file {
  color: #f56c6c;
  font-weight: bold;
  cursor: pointer;
  margin-left: 4px;
  font-size: 16px;
  transition: color 0.2s;
}

.remove-file:hover {
  color: #d32f2f;
}

.delete-btn {
  margin-left: 8px;
  background: #fff;
  color: #f56c6c;
  border: 1.5px solid #f56c6c;
  box-shadow: 0 2px 8px 0 rgba(245,108,108,0.08);
  transition: background 0.2s, color 0.2s;
}

.delete-btn:hover {
  background: #fde2e2;
  color: #f56c6c;
}

.delete-svg-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.ds-input .el-textarea__inner) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  font-size: 16px;
  color: #222;
  line-height: 1.6;
  resize: none;
}

:deep(.ds-input .el-textarea) {
  background: transparent !important;
}

:deep(.ds-input .el-input__wrapper) {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  padding: 0 !important;
}

:deep(.ds-input .el-textarea__inner)::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}

:deep(.ds-input .el-textarea__inner)::-webkit-scrollbar-thumb {
  background: #c1c5cc;
  border-radius: 6px;
  min-height: 24px;
}

:deep(.ds-input .el-textarea__inner)::-webkit-scrollbar-thumb:hover {
  background: #a3a7b3;
}

:deep(.ds-input .el-textarea__inner)::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 6px;
}

/* 高亮气泡样式 */
.bubble-hovered {
  box-shadow: 0 0 0 3px #409EFF;
  transition: box-shadow 0.2s;
}

.bubble {
  max-width: 70%;
  min-width: 60px;
  width: fit-content;
  padding: 12px 16px;
  border-radius: 12px;
  word-break: break-word;
  box-sizing: border-box;
  flex-shrink: 0;
  display: block;
}
</style> 