# Advisor Package Index

> 用途：给导师统一发送的三阶段报告包  
> 日期：2026-04-03

---

## 建议优先阅读

1. `PHASE1_COMPLETE_REPORT.pdf`
2. `PHASE2_COMPLETE_REPORT.pdf`
3. `PHASE3_COMPLETE_REPORT.pdf`

如果导师需要看网页版或继续批注，可对应打开同名的 `.html` 或 `.md` 文件。

---

## 项目规模提示

这份导师包是“正式汇报层”，不是把整个 `results/` 目录原样倾倒进去。因此，包里看到的图量与最终文档长度，不能直接等同于底层实验工作量。

当前项目的底层结果树大致包含：

- `921` 个结果 JSON；
- `68` 张 PNG；
- `27` 个 CSV。

在三阶段中，这些底层产物被进一步压缩为导师可快速审阅的正式交付层：

- Phase 1：主报告中已明确总结为 **300+** 正式实验；
- Phase 2：主报告与图链对应 **53 个 US 结果 JSON + 3 个关键 CSV + 8 张最终图**；
- Phase 3：主报告与图链对应 **627 个 MTUS 结果 JSON + 11 个 cross-country CSV + 10 张最终图**。

换句话说，导师包里的图和文档是“筛选后的最终证据面”，而不是实验执行量的全部展开。

---

## 文件说明

### Phase 1

- `PHASE1_COMPLETE_REPORT.md`
- `PHASE1_COMPLETE_REPORT.html`
- `PHASE1_COMPLETE_REPORT.pdf`

说明：Phase 1 的完整正式报告，也是前三阶段中最成熟的基准版本。

### Phase 2

- `PHASE2_COMPLETE_REPORT.md`
- `PHASE2_COMPLETE_REPORT.html`
- `PHASE2_COMPLETE_REPORT.pdf`
- `PHASE2_VISUALIZATION_REPORT.md`
- `PHASE2_VISUALIZATION_REPORT.html`
- `PHASE2_VISUALIZATION_REPORT.pdf`

说明：
- `PHASE2_COMPLETE_REPORT.*` 是 Phase 2 的主报告。
- `PHASE2_VISUALIZATION_REPORT.*` 是图表结构与汇报口径说明。

### Phase 3

- `PHASE3_COMPLETE_REPORT.md`
- `PHASE3_COMPLETE_REPORT.html`
- `PHASE3_COMPLETE_REPORT.pdf`
- `PHASE3_VISUALIZATION_REPORT.md`
- `PHASE3_VISUALIZATION_REPORT.html`
- `PHASE3_VISUALIZATION_REPORT.pdf`

说明：
- `PHASE3_COMPLETE_REPORT.*` 是 Phase 3 的主报告。
- `PHASE3_VISUALIZATION_REPORT.*` 是图表结构与汇报口径说明。

---

## 原始图文件

- `ORIGINAL_FIGURES/PHASE1_results_figures/`：Phase 1 全部主图、补充图，以及同目录中的汇总表文件。
- `ORIGINAL_FIGURES/PHASE2_results_phase2_figures/`：Phase 2 的 8 张原始 PNG 图文件。
- `ORIGINAL_FIGURES/PHASE3_results_phase3_figures/`：Phase 3 的 10 张原始 PNG 图文件。

如果导师需要把图单独插入邮件、PPT 或批注文档，可直接从上述目录中取用对应图片文件。

---

## 备注

- Phase 2 的主 Markdown 源文件原项目中叫 `US_PHASE2_EXPERIMENTS.md`，这里已统一整理为 `PHASE2_COMPLETE_REPORT.md` 便于发送。
- Phase 3 的主 Markdown 源文件原项目中叫 `PHASE3_FINAL_REPORT.md`，这里已统一整理为 `PHASE3_COMPLETE_REPORT.md`。
- 所有 HTML 文件均为自包含版本，图片已内嵌，离线打开即可查看。
- 同级目录下已生成可直接发送的压缩包：`ADVISOR_PACKAGE_PHASE1_2_3_20260403.zip`。
