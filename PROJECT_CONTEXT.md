# PROJECT_CONTEXT

## 项目概况

- 项目名称：`HYCOM3`
- 当前目标：在不改动核心水力学公式行为的前提下，完成 Web 发布硬化，并把 LeanCloud 收敛为当前阶段的后端边界。
- 业务核心：`src/hycom_lib` 与 `src/shared/calculations` 负责本地水力学公式计算，页面层负责参数录入、图表与结果展示。

## 当前架构判断

- 前端框架：`Vue 3`
- 构建链：`Vite 6`
- 路由/状态：`vue-router 4` + `Pinia`
- UI 组件库：`Element Plus`
- 测试链：`Vitest + Playwright`
- 外部服务：
  - LeanCloud：登录、注册、当前用户资料、管理员数据读取、反馈数据存储
  - EmailJS：意见反馈邮件发送

## 当前架构决策

- 继续保持 Web 主线优先，桌面端暂不进入本轮实现。
- 继续使用 LeanCloud，不新增自建后端。
- 前端环境变量只负责配置注入，不作为安全边界。
- 角色和管理员权限统一收口到 LeanCloud Cloud Functions。
- 当前沿用 `_User.auth` 字段区分角色：
  - `S` -> admin
  - `D` -> developer

## 本轮实现边界

- 做：
  - 去掉前端代码中的真实默认密钥。
  - 启动时校验 LeanCloud 必填配置。
  - 将当前用户资料、管理员列表与反馈列表切到 Cloud Functions。
  - 管理页路由增加角色守卫。
  - 注册流程不再把明文密码写入 `UsrInfo`。
  - 清理旧的 API/request 残留链路。
  - 补充与当前真实栈一致的 README 和 LeanCloud 云函数示例。
- 不做：
  - 不重写 `src/hycom_lib` 公式实现。
  - 不做桌面端主进程、预加载和打包。
  - 不将反馈写入流程整体迁移到云函数。

## 风险记录

- 只要配置注入到浏览器，客户端凭据就不是秘密，因此权限必须依赖 LeanCloud 后端规则而不是前端隐藏变量。
- Cloud Functions 需要在 LeanCloud 控制台或 Cloud Engine 中单独部署；前端改造完成后，若云函数未部署，管理员相关能力不会工作。
- 当前大量计算页仍使用 Options API 与较宽松的类型定义，后续仍需逐步收敛 `any` 与超大组件。
