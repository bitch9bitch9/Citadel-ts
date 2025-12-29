import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(() => {
  // 檢查是否是在 GitHub Actions 環境下執行
  // GitHub Actions 預設會有 GITHUB_ACTIONS 這個環境變數
  const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

  return {
    plugins: [react()],
    base: isGitHubPages ? '/Citadel-ts/' : '/', 
  }
})