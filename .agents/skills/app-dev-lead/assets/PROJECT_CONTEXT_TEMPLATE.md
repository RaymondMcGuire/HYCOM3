# PROJECT_CONTEXT.md — 索引文件

> 这是主索引，只做路由，不堆内容。
> 详细内容分散在 `docs/` 子文档中，每个文件保持 100–200 行。
> `$app-dev-lead` 在需要恢复项目状态时读取此文件。

---

## 仓库信息

- **仓库地址**：https://github.com/[owner]/[repo]
- **主分支**：main
- **创建时间**：YYYY-MM-DD

---

## 子文档目录

| 文件 | 内容 | 更新时机 |
|------|------|----------|
| `docs/tech-stack.md` | 语言、框架、数据库、测试框架、依赖版本 | 技术选型变化时 |
| `docs/architecture.md` | 架构决策记录（ADR），认证方案、API 规范、迁移方案 | 架构决策时立即更新 |
| `docs/api-contracts.md` | 接口清单、请求/响应格式、错误码（前后端分离项目） | 新增/修改接口时 |
| `docs/style-guide.md` | 命名规范、目录结构、错误处理约定、注释规范 | 约定变化时 |
| `docs/feature-log.md` | 已完成功能列表（PR 号、合并日期） | 每轮 retro 更新 |

---

## 当前状态

- **最后更新**：YYYY-MM-DD
- **当前迭代目标**：[本轮要完成的功能描述]
- **开放 PR**：#N [描述]，#M [描述]
- **已知技术债**：见 `docs/feature-log.md` 底部

---

## 子文档模板

**`docs/tech-stack.md`**

```markdown
# Tech Stack

## 语言 & 运行时
- Python 3.11 / Node.js 20 / ...

## 框架
- FastAPI / Express / ...

## 数据库
- PostgreSQL / SQLite / ...

## 测试框架
- pytest / Jest / 无

## 关键依赖版本
- [package]: [version]
```

**`docs/architecture.md`**

```markdown
# Architecture Decisions

## 认证方案
- 方案：JWT，存储于 HttpOnly Cookie
- 决策时间：YYYY-MM-DD，PR #N

## API 设计规范
- 错误格式：`{"error_code": "...", "message": "..."}`
- 分页：`?page=&size=`

## 数据库迁移
- 框架：Alembic（有存量数据）/ 无（全新项目）
```

**`docs/style-guide.md`**

```markdown
# Style Guide

## 命名规范
- Python: snake_case 变量/函数，PascalCase 类名

## 目录结构
src/
  routers/
  services/
  models/
  utils/
tests/

## 错误处理约定
- 统一抛出结构化错误，不在路由层写业务逻辑
```

**`docs/feature-log.md`**

```markdown
# Feature Log

## 已完成
- [功能名]（PR #N，YYYY-MM-DD 合并）

## 已知技术债
- [描述]（来源：PR #N，登记时间：YYYY-MM-DD）
```
