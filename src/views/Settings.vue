<template>
  <div class="settings-container">
    <h2>设置</h2>
    <el-form :model="settings" label-width="120px" class="settings-form">
      <el-form-item label="后端地址">
        <div class="input-with-button">
          <el-input v-model="settings.backendUrl" placeholder="请输入后端地址，如：http://localhost:8080">
            <template #prefix>
              <el-icon><Link /></el-icon>
            </template>
          </el-input>
          <el-button type="primary" :loading="testing" @click="testBackendConnection">
            {{ testing ? '测试中...' : '测试连接' }}
          </el-button>
        </div>
      </el-form-item>

      <el-form-item label="API地址">
        <el-input v-model="settings.apiUrl" placeholder="请输入API地址">
          <template #prefix>
            <el-icon><Connection /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <el-form-item label="API密钥">
        <el-input v-model="settings.apiKey" type="password" placeholder="请输入API密钥">
          <template #prefix>
            <el-icon><Key /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <el-form-item label="模型">
        <el-input v-model="settings.model" placeholder="请输入模型名称">
          <template #prefix>
            <el-icon><Cpu /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      
      <el-form-item label=" " label-width="0">
        <div class="full-width-center">
          <el-button type="primary" @click="saveSettings">保存设置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Link, Connection, Key, Cpu } from '@element-plus/icons-vue'

export default {
  name: 'Settings',
  components: {
    Link,
    Connection,
    Key,
    Cpu
  },
  data() {
    return {
      settings: {
        backendUrl: '',
        apiUrl: '',
        apiKey: '',
        model: ''
      },
      testing: false
    }
  },
  methods: {
    async testBackendConnection() {
      if (!this.settings.backendUrl) {
        this.$message.warning('请先输入后端地址')
        return
      }

      this.testing = true
      try {
        const response = await fetch(`${this.settings.backendUrl}/health`)
        if (response.ok) {
          this.$message.success('后端连接测试成功')
        } else {
          this.$message.error('后端连接测试失败')
        }
      } catch (error) {
        this.$message.error('后端连接测试失败：' + error.message)
      } finally {
        this.testing = false
      }
    },
    saveSettings() {
      // TODO: 实现保存设置的逻辑
      this.$message.success('设置已保存')
    }
  }
}
</script>

<style scoped>
.settings-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.settings-form {
  margin-top: 20px;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.input-with-button {
  display: flex;
  gap: 12px;
  align-items: center;
}

.input-with-button .el-input {
  flex: 2;
  min-width: 320px;
}

.input-with-button .el-button {
  flex: none;
  min-width: 110px;
  padding-left: 18px;
  padding-right: 18px;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff inset !important;
}

:deep(.el-input__prefix) {
  color: #909399;
}

h2 {
  margin: 0 0 24px;
  font-size: 24px;
  color: #303133;
  text-align: center;
}

.full-width-center {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 12px;
}
</style> 