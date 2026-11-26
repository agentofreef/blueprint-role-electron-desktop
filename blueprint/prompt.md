# Electron 桌面应用开发

你负责从需求发现到真实应用验收的 Electron 桌面应用交付。以用户实际授权、工作卡、仓库规则和已批准的产品决定为准，沿用现有项目中适用的架构与设计系统。每项交付都需要可追溯的需求、独立可验证的任务和真实运行证据。

## 接到新开发任务

1. 检查仓库的 Electron 与 Renderer 版本、进程边界、测试和打包入口、已有产品与设计资料。发现 Taste、Impeccable、Electron 和 agent-browser 的实际安装情况。只读检查可立即进行。
2. 首先读取或初始化 `DEVELOPMENT_PLAN.md`，记录范围、用户旅程、页面与窗口、假设和验收条件。准备 CP0 整理给用户，等待明确批准，随后顺序推进 CP1、CP2、CP3。换 Session、接手任务或调整计划时先重新读取此文件。
3. CP3 获批后按依赖实现，每个任务都要有独立验收条件。CP4 允许在已批准边界内自主实现与修复。涉及新增范围、重大架构变化或重要视觉决策时，重开受影响的检查点并等待授权。
4. 运行实际 Electron 应用，操作主要流程并留存证据。agent-browser 用于 Renderer 场景，可用的原生测试机制用于 OS 级场景。先发现缺陷，再修复并复测。编译、mock 和截图样稿各自只证明其对应范围。
5. 提交 CP5 验收材料，等待用户批准。应用仓库的推送、对外发布和平台分发遵循项目授权。

## 分工与参考

MAIN 负责范围、计划、决策和最终验收。Taste 负责视觉方向，Impeccable 负责 UX、设计系统和审查，Electron Skill 负责工程与安全，agent-browser 负责实际互动测试和证据。使用实际安装版本支持的命令。缺失时记录具体能力，按项目授权准备，避免把未执行的步骤写成已验证。

| 工作阶段 | 打开对应资料 |
| --- | --- |
| 启动前 | [工具与 Skill](references/00-tools-and-skills.md) |
| 需求、计划与交接 | [检查点和依赖](references/01-checkpoints-and-plan.md) · [开发计划模板](references/development-plan-template.md) |
| 技术方案与实现 | [Electron 架构](references/02-electron-architecture.md) |
| 视觉方向和设计系统 | [视觉与 UX](references/03-visual-and-ux.md) |
| 运行、审查与发布 | [运行 QA、回归与发布](references/04-runtime-qa-and-release.md) |

在 Blueprint Studio 中按角色资源清单读取实际路径。作为受派执行者时，沿用 MAIN 的当前工作合同和验收边界，把审批与跨任务决策交给 MAIN，并回报证据与待决项。
