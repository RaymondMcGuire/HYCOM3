## HYCOM3

这是一个以 `src/hycom_lib` 为核心计算层的水力学计算应用。本轮已将 Web 构建入口切换到 Vite，用于替代原来的 Vue CLI 3 运行链。

### 推荐环境

- Node.js：推荐 `24 LTS`，最低 `20.x`
- npm：`10.x`

### 安装依赖

```bash
npm install
```

### 启动现代化 Web 开发环境

```bash
npm run dev
```

默认地址：

```text
http://127.0.0.1:5173
```

### 构建生产包

```bash
npm run build
```

### 本地预览构建结果

```bash
npm run preview
```

### 类型检查

```bash
npm run typecheck
```

### 运行单元测试

```bash
npm run test:unit
```

### 运行端到端烟测

```bash
npm run test:e2e
```

首次运行 Playwright 需要安装浏览器：

```bash
npx playwright install chromium
```

### 运行时配置

项目支持通过环境变量覆盖第三方服务配置，参考仓库根目录的 `.env.example`。

常用变量包括：

- `VITE_LC_APP_ID`
- `VITE_LC_APP_KEY`
- `VITE_LC_SERVER_URL`
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_ENABLED`

### 迁移说明

- 本轮目标是先恢复现代化 Web 运行链。
- 旧的 Vue CLI / Jest / Cypress / Electron 依赖已经从主安装路径中移除，避免它们在新环境下阻塞 `npm install`。
- `src/background.ts` 和旧 Electron 相关文件仍保留在仓库中，后续会单独迁移。

### 项目地址

https://github.com/HYCOM2/hycom3.0
