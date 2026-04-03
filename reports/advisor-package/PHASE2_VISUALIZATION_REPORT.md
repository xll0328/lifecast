# Phase 2 可视化审计与图链说明

> 项目：`Yucheng_Project`  
> 阶段：Phase 2（US / ATUS）  
> 对齐基准：`PHASE1_COMPLETE_REPORT.md` 的“图表嵌入 + 章节叙事 + 方法解释”风格  
> 更新时间：2026-04-03

---

## 1) 总体结论

Phase 2 的可视化已经不再是“有几张零散图”，而是形成了一套**可以直接嵌入正式主报告**的 8 图链：

- baseline：有
- Macro-F1 / delta 误差分解：有
- quick vs pooled stratification：有
- pooled grouped delta：有
- pooled heatmap：有
- methodology sensitivity：有
- sample-size correction：有
- UK vs US 主线对照：有

换句话说，Phase 2 已具备与 Phase 1 同口径的“图驱动叙事”能力。虽然总图量仍少于 Phase 1，但证据结构已经足以支撑导师审阅与阶段性讨论。

---

## 2) 当前 Phase 2 专属图组（8 张）

目录：`results/phase2_figures/`

| 图号 | 文件 | 在主报告中的位置 | 作用 |
|---|---|---|---|
| P2-F1 | `phase2_fig1_us_baseline_activity_location.png` | A1 baseline | US `activity/location` 基准总览 |
| P2-F2 | `phase2_fig2_us_stratified_activity.png` | B1 grouped | quick vs pooled 的分组对照 |
| P2-F3 | `phase2_fig3_us_pooled_group_delta.png` | pooled 复核 | 各分组 delta（按通道拆开） |
| P2-F4 | `phase2_fig4_uk_vs_us_activity_baseline.png` | 跨阶段对表 | UK vs US `activity` 主线对照 |
| P2-F5 | `phase2_fig5_us_baseline_macrof1_delta.png` | A1 baseline | baseline 的 Macro-F1 与 delta 分解 |
| P2-F6 | `phase2_fig6_us_pooled_delta_heatmap.png` | pooled 复核 | pooled heatmap，突出位置与活动通道差异 |
| P2-F7 | `phase2_fig7_us_methodology_sensitivity.png` | 稳健性 | `fine/coarse`、`10/30min`、`weekday/full` |
| P2-F8 | `phase2_fig8_us_sample_size_delta_shift.png` | pooled 复核 | sample-size correction 证据图 |

生成脚本：`generate_phase2_phase3_figures.py`

---

## 3) 图组相对于早期版本的增强

旧版 Phase 2 的问题不是“完全没图”，而是图不够成体系：

1. 大部分图仍借用 Phase 1 语境，缺少专门服务 Phase 2 章节的问题意识。
2. 没有把 quick 与 pooled 的关系做成可视化，因此“negative delta 是否只是小样本伪象”只能靠文字硬说。
3. 缺少 Macro-F1、heatmap、sample-size correction 这些会直接提升说服力的证据图。

这次补齐后的优势在于：

1. **A1 讲清楚了**：不仅有 baseline accuracy，还有 Macro-F1 与 delta 解释。
2. **B1 讲清楚了**：quick 与 pooled 可以直接对照，避免过度解释 quick。
3. **方法论讲清楚了**：不是只展示结果，还展示为什么 sample-size 会改变结论。
4. **对表讲清楚了**：UK vs US 主线可以一图看懂，不用来回翻文件。

---

## 4) 当前版本的适用性判断

### 导师审阅与阶段汇报：**证据已经完整**

目前这 8 张图已经能回答导师最可能追问的几个问题：

1. US baseline 到底是什么水平？
2. 分组差异是 quick 偶然现象，还是 pooled 后仍成立？
3. Transformer 相对 persistence 的 gain 到底稳不稳？
4. US 与 UK 的关系是“同机制但不同幅度”还是完全不同故事？

### 若进入论文定稿阶段：**可做的增强项**

在不改变当前主结论的前提下，还可以继续补充：

- pooled CI / bootstrap 风格图；
- confusion / top-error 类型图；
- figure caption 更长、可直接贴进论文 Results。

这些内容属于面向投稿版式的增强，而不影响当前版本作为正式阶段性汇报材料的完整性。

---

## 5) 可直接引用的摘要表述

下述表述可直接用于邮件摘要、封面说明或口头汇报：

> Phase 2 已形成完整的 8 图主链：baseline、误差分解、quick-vs-pooled 分组对照、pooled delta、heatmap、方法稳健性、样本量修正，以及 UK-US 主线对表。  
> 这些图共同支持一个稳定结论：US 中 persistence 依旧强，Transformer 的额外增益在 quick 阶段未必立即显形，但在 pooled 与更充分样本下会呈现出更稳定的正向证据。
