---
name: iteration-retro
description: 用于这个仓库里的迭代收尾工作流。负责输出 retro，总结已完成与未完成项，并对本轮改动范围做技术债清扫。
---

# Iteration Retro

这个 skill 对应 Phase 5。

## 何时使用

- 用户明确调用 `$iteration-retro`
- 一轮 PR 已合并，准备做迭代总结
- 需要对本轮改动目录执行技术债清扫

## 运行方式

1. 读取 `references/retro-and-debt-cleanup.md`
2. 先产出 retro
3. 再扫描本轮 PR 涉及目录及其直接上下游，做有限范围技术债清扫

## 核心规则

- 只扫本轮改动范围，不做全库清扫
- 不保留未经验证的猜测
- 失效功能先登记，再决定是否创建专项重构工作项
