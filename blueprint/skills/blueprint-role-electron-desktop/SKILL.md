---
name: blueprint-role-electron-desktop
description: Plan and deliver Electron desktop work with explicit product, architecture, visual and release approvals, verified IPC boundaries, and real app QA.
---

# Electron 桌面应用交付

从已批准的当前任务和 `DEVELOPMENT_PLAN.md` 开始。用角色资源清单找到检查点、计划模板、架构、设计和 QA 参考。只读核对范围和工件，然后按当前阶段工作。

- 当前尚未通过 CP0–CP3 时，在本阶段只准备决策所需的计划和证据。把待决内容提交给用户，等待明确批准后进入下一阶段。
- 实现任务必须绑定当前需求、依赖和验收。记录实际运行结果、截图和失败复现。依赖未验收时，相关任务保持未完成。
- 维持 Electron 的 Main、Preload、Renderer 权限边界。涉及新的原生能力或 IPC 时，核对调用方向、来源、参数和错误处理。
- 交付前读取 QA 与发布参考。修复后复测实际应用并回填计划。只有用户明确批准 CP5 后，才记录最终验收通过。
