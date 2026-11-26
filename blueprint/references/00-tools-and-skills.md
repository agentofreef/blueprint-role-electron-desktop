# Skill 与运行环境

先读仓库规则、产品资料、设计基线、Electron 版本及目标平台。查看实际执行 Session 的 Skill 清单、`SKILL.md` 和相关参考资料。检查本机工具可执行与当前 Session 能加载分别成立，再记录版本、可用能力和缺失项。

| 能力 | 发现或准备方式 | 用途 |
| --- | --- | --- |
| Taste | 在现有环境查找 `design-taste-frontend`。缺失时按上游说明安装，例如 `npx skills add Leonxlnx/taste-skill --skill design-taste-frontend`。 | 设计定位、参考分析、代表屏、视觉复审。 |
| Impeccable | 查找 `impeccable` 入口及配套指令。按上游说明准备项目级安装，例如 `npx impeccable install --scope=project`。 | 产品 UX、组件与 token、可访问性、渲染审查。 |
| Electron | 查找 `electron-best-practices`。在支持的 Studio 版本可用角色依赖安装，也可在获准的范围执行 `npx skills add jwynia/agent-skills --skill electron-best-practices`。 | 进程边界、权限、IPC、原生集成、打包。 |
| agent-browser | 查找 `agent-browser` Skill 和 CLI。Skill 可使用角色依赖安装或 `npx skills add vercel-labs/agent-browser --skill agent-browser`。CLI 和测试浏览器按上游说明另行准备。 | 实际 Electron Renderer 操作、复现、截图与回归。 |

[Taste](https://github.com/Leonxlnx/taste-skill) · [Impeccable](https://github.com/pbakaus/impeccable) · [Electron Skill](https://github.com/jwynia/agent-skills/tree/main/skills/tech/development/tooling/electron-best-practices) · [agent-browser](https://github.com/vercel-labs/agent-browser)

优先使用项目已有工具版本和安装方式。Studio 的角色依赖入口可安装固定来源的 Electron 和 agent-browser Skill。Taste 的完整目录超出 Studio 的 Skill 文件数量和体积上限，Impeccable 的 GitHub 源码 ZIP 超出 Studio 下载上限，这两项使用表中的上游安装方式。单独核验 Impeccable 的配套工具、agent-browser CLI 与测试 Chromium，以及目标平台的打包和签名工具。

使用 agent-browser 前，从 CLI 读取当前的 core 与 Electron 指南。核对命令存在、能连接本项目支持的调试目标、能完成一次无副作用的实际页面检查。原生交互选择现有 Electron 测试框架、OS 自动化或人工验收。使用 Electron 官方文档核对和项目版本有关的 API，签名和更新机制使用官方平台文档。

发现缺失时向 MAIN 报告对应阶段和可行准备方式。按项目授权准备、重载 Session 并复核。只读范围核对可以继续，依赖该 Skill 的阶段以实际准备情况和审批为准。
