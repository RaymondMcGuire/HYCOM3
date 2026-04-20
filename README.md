## HYCOM3

HYCOM3 是一个以 `src/hycom_lib` 为核心计算层的水力学计算 Web 应用，当前主线基于 `Vue 3 + Vite` 运行。

### 推荐环境

- Node.js：`>=22.12.0 <25`
- npm：`10.x`

### 安装依赖

```bash
npm install
```

### 运行时配置

仓库只保留 `.env.example`。本地开发请创建 `.env.local`，生产构建请在部署平台或 `.env.production.local` 中提供下列变量：

```bash
VITE_APP_NAME=HYCOM3
VITE_AUTH_TOKEN_TTL_MINUTES=60

VITE_LC_APP_ID=
VITE_LC_APP_KEY=
# 这里必须填写 LeanCloud 控制台里该应用的“服务器地址”
VITE_LC_SERVER_URL=
VITE_LC_CLOUD_FUNCTIONS_ENABLED=false
VITE_LC_USER_INFO_CLASS=UsrInfo
VITE_LC_FEEDBACK_CLASS=MailForms

VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
VITE_EMAILJS_ENABLED=false
```

说明：

- LeanCloud 配置对登录、注册、管理页和反馈等后端能力是必填的；如果未配置，应用主界面仍可启动，但相关能力会报错。
- 其中 `VITE_LC_SERVER_URL` 必须与 LeanCloud 控制台里该应用的服务器地址完全一致。
- 当前默认 `VITE_LC_CLOUD_FUNCTIONS_ENABLED=false`，这样前端不会主动探测云函数，也不会在本地开发时制造额外的 CORS 噪音；只有当 LeanCloud Cloud Functions 已部署可用时再改为 `true`。
- EmailJS 只有在 `VITE_EMAILJS_ENABLED=true` 且相关配置齐全时才会启用。
- `VITE_*` 变量不会进入仓库，但它们仍会出现在前端构建产物中，不能当作安全边界。

### 启动 Web 开发环境

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

### 质量检查

```bash
npm run typecheck
npm run test:unit
npm run test:e2e
```

首次运行 Playwright 需要安装浏览器：

```bash
npx playwright install chromium
```

### LeanCloud 云函数

前端当前依赖下列 LeanCloud Cloud Functions 作为权限边界：

- `auth:getCurrentProfile`
- `admin:listUsers`
- `admin:listFeedback`
- `profile:upsertCurrentUser`

仓库提供了一个可作为 `cloud.js` 基础版本的示例文件：

- `leancloud/cloud.js`

建议将该文件部署到 LeanCloud Cloud Engine 或直接拷贝到在线云函数编辑器中，再按应用实际需求补充 ACL 与类权限。

如果 `auth:getCurrentProfile` 没有部署完成，登录成功后拉取当前用户资料会失败，管理页和角色守卫也不会工作。

### 当前边界

- 当前仓库只保留 Web 主线代码。
- 旧的 Electron / Vue CLI / PWA / Jest / Cypress 残留已从主运行链移除。
- 桌面端需要单独重建主进程、预加载和打包链。

### 项目地址

https://github.com/HYCOM2/hycom3.0
