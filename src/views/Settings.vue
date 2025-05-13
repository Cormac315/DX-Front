<template>
  <div class="settings-container">
    <h2>设置</h2>
    <el-form :model="settings" label-width="120px" class="settings-form">
      <el-form-item label="API地址">
        <el-input v-model="settings.apiUrl" placeholder="请输入API地址"></el-input>
      </el-form-item>
      
      <el-form-item label="API密钥">
        <el-input v-model="settings.apiKey" type="password" placeholder="请输入API密钥"></el-input>
      </el-form-item>
      
      <el-form-item label="模型">
        <el-input v-model="settings.model" placeholder="请输入模型名称"></el-input>
      </el-form-item>
      
      <el-form-item label="主题">
        <el-select v-model="settings.theme">
          <el-option label="浅色" value="light"></el-option>
          <el-option label="深色" value="dark"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="saveSettings">保存设置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      settings: {
        apiUrl: '',
        apiKey: '',
        model: '',
        theme: 'light'
      }
    }
  },
  methods: {
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
}

.settings-form {
  max-width: 600px;
  margin-top: 20px;
}
</style> 