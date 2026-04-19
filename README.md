## HYCOM3

这是一个以 `src/hycom_lib` 为核心计算层的水力学计算 Web 应用，当前主线基于 `Vue 3 + Vite` 运行。

### 推荐环境

- Node.js：`>=22.12.0 <25`
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

- 当前仓库只保留 Web 主线代码。
- 旧的 Electron / Vue CLI / PWA / Jest / Cypress 残留已从主运行链移除。
- 当前测试链为 `Vitest + Playwright`。

### 项目地址

https://github.com/HYCOM2/hycom3.0
