---
name: architecture-course-handoff
description: Consolidate an existing architecture course project into consistent drawings, editable models, an interactive prototype, a narrated presentation and a portable submission archive. Use for final coursework packaging or agent handoff, not for inventing a new building or silently publishing changes.
---

# 建筑课程成果交付与交接

先阅读项目要求、当前版本记录与交付目录；区分教师原文、用户选择、建议和旧对话中的未完成承诺。把学校的交付形式、姓名学号、截止日期与发布权限单独确认。

## 确认与执行

1. 找到用户认可的建筑版本和网站提交。为原始CAD/SU/交换模型/参数/原始ZIP建立校验值，使用独立工作副本；不要把文件名中的“最终”当成证据。
2. 对照研究问题、建筑策略、图纸/模型和交互事件，记录已验证、仅结构检查和未验证。发现问题只修改获准范围；涉及建筑几何、落位或新增功能时遵循当前授权。
3. 用真实成果组织“场地问题→核心议题→概念与空间推导→解决策略→成品体验→AI反思”。比较研究不得冒充历史迭代，规则化模拟不得冒充工程计算。没有现场痛点证据时说明研究问题，不虚构原建筑缺陷。
4. 先交讲稿、分镜与短配音。用户要求先审时，不能把批准实施计划当成对这些新材料的批准。审阅后再录制/剪辑完整视频；保留可编辑来源。
5. 更新同一个交付目录，保留可浏览成果及原始文件。网站采用相对资源路径，移动目录后实际启动并检查下载。源码ZIP排除自身与自身SHA侧车，避免循环包含；在说明中写清源码包与便携运行环境的区别。
6. 建立清单并用 `python scripts/verify_archive.py ROOT MANIFEST.json` 检查SHA-256和ZIP CRC；另外实际检查浏览器、模型和视频，清单通过不能代替视觉或原生软件验证。
7. 交接说明给出确切入口、有效版本、复现命令、关键取舍、剩余事项及下一步。安装技能、上传仓库、部署网站和交给班长分别记录，不因制作完成而自动执行。

## 输入不完整

先查项目文件和已有发布记录。版本冲突无法判定时列出具体候选；场地边界、朝向、测绘高差、材料和工程性能缺证据时保留未知，不能通过修改说明冒充已核实。继续可独立完成的工作。

## 校验接口

`MANIFEST.json`包含 `files` 数组，每项为 `path`（相对ROOT路径）、`sha256`，可选 `bytes`。清单不包含自身。辅助脚本只读，不修复文件、不部署、不安装依赖。

合格交付需要文件一致、叙事有依据、实际体验可用，且审阅/发布边界得到遵守；任何一项缺失均明确列入未完成，不宣称全面验收。
