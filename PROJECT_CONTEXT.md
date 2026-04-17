# PROJECT_CONTEXT

## 项目概况

- 项目名称：`HYCOM3`
- 当前目标：在不改动核心水力学公式行为的前提下，先完成运行环境和构建链现代化，让项目能在较新的前端工具链下稳定安装、启动和构建。
- 代码库类型：已有项目，无现成 `PROJECT_CONTEXT.md`，本文件为首次补建。

## 当前架构判断

- 前端框架：Vue 2 class-style 组件体系，大量页面使用 `vue-property-decorator`。
- UI 组件库：Element UI。
- 路由/状态：`vue-router@3` + `vuex@3` + `vuex-module-decorators`。
- 构建链现状：Vue CLI 3 + webpack 4，Electron 13 仍保留在仓库中，但当前主要业务价值在前端页面和本地公式计算。
- 业务核心：`src/hycom_lib` 为核心计算库，页面层以参数表单、图表、表格和结果展示为主。
- 外部服务：
  - LeanCloud：登录、注册、管理员数据表、反馈表。
  - EmailJS：意见反馈发送。

## 架构决策

- 认证方案：沿用 LeanCloud 用户体系，当前不自建后端。
- API 设计规范：本阶段不新增自建 API，只保留现有第三方服务接入。
- 数据存储：LeanCloud 外部表结构暂不变更，当前仓库无本地数据库。
- 数据迁移：本阶段无数据库迁移。
- API Contract：当前阶段不生成 OpenAPI；后续如拆出独立后端再补。
- 代码风格约定：
  - 保持 `src/hycom_lib` 作为领域计算层。
  - UI/路由层允许在迁移期继续使用 Vue 2 组件写法。
  - 构建层优先迁移到 Vite，避免继续扩大 Vue CLI / webpack 依赖面。

## 本轮改造边界

- 做：
  - 将 Web 运行入口切到 Vite。
  - 保留 Vue 2.7 桥接路线，避免一次性重写大量计算页面。
  - 清理旧的 Service Worker 注入方式，降低缓存污染风险。
  - 明确 Node/npm 运行基线与启动方式。
- 不做：
  - 不在本轮把全部页面重写为 Vue 3 Composition API。
  - 不在本轮重构 `src/hycom_lib` 公式实现。
  - 不在本轮完成 Electron 新架构迁移。

## 风险记录

- Vue 2 与 Element UI 都已进入维护尾声，后续仍需规划 Vue 3 + Element Plus 的第二阶段迁移。
- Electron 构建链仍是旧栈，若要恢复桌面打包，需要单独做主进程/预加载/安全模型改造。
- LeanCloud 与 EmailJS 密钥目前仍在前端代码中，后续应迁入环境变量或运行时配置。
