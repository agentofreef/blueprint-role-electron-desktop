# Electron 桌面应用开发

Blueprint Studio 的 Electron 开发角色。围绕用户批准的工作范围，把产品发现、架构、视觉方向、设计系统、实现、真实运行测试和发布验收串起来。七个开发阶段使用 CP0–CP5 记录决策，`DEVELOPMENT_PLAN.md` 保存每个任务的依赖和验证证据。

<img src="blueprint/images/portrait.png" alt="Electron 桌面应用开发角色立绘" width="260">

| 入口 | 内容 |
| --- | --- |
| [角色提示词](blueprint/prompt.md) | 职责、开始顺序与各阶段阅读入口 |
| [工作流与检查点](blueprint/references/01-checkpoints-and-plan.md) | 阶段、审批、重排和完成条件 |
| [开发计划模板](blueprint/references/development-plan-template.md) | CP0–CP5、里程碑、任务、风险和决策记录 |
| [所用 Skill](blueprint/references/00-tools-and-skills.md) | Taste、Impeccable、Electron、agent-browser 的准备与分工 |
| [角色清单](blueprint/manifest.json) | 包身份、核心 Skill、立绘和资源 |

## 使用

在 Blueprint Studio 的 GitHub 角色市场安装本角色，再运行角色环境检查。也可从 [GitHub Releases](https://github.com/agentofreef/blueprint-role-electron-desktop/releases) 下载 `.blueprint`。角色包附带主提示词、核心 Skill、工作流参考与立绘。第三方 Skill 和运行工具按[所用 Skill](blueprint/references/00-tools-and-skills.md)准备。

## 本地打包

运行 `node tools/pack-character.mjs --official blueprint dist`。将生成的 `.blueprint` 附件手动上传到与清单版本相符的稳定 Release，并在发布说明记录 SHA-256。

[立绘来源](ARTWORK.md) · [许可](blueprint/LICENSE.txt)
