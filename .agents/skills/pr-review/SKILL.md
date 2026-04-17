---
name: pr-review
description: 用于这个仓库里的 PR、branch 或 diff review 工作流。负责 QA gating、scope drift、coverage audit、review rating。
---

# PR Review

这个 skill 负责 Phase 3.5 和 Phase 4 相关的独立评审工作。

## 何时使用

- 用户明确调用 `$pr-review`
- 用户要求 review 当前 PR、某个分支或某个 diff
- 用户要求做 QA gating、scope drift 检查、coverage audit

## 运行方式

1. 先读取 `references/qa-gating.md`
2. 再读取 `references/review-checklist.md`
3. 按其中规则完成 QA / review
