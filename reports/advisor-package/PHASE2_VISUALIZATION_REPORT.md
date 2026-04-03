# Phase 2 可视化审计与图链说明

> 项目：`Yucheng_Project`  
> 阶段：Phase 2（US / ATUS）  
> 对齐基准：`PHASE1_COMPLETE_REPORT.md` 的“图表嵌入 + 章节叙事 + 方法解释”风格  
> 更新时间：2026-04-03

---

## 1) 本次更新后的结论

Phase 2 的可视化已经不再是“有几张零散图”，而是形成了一套**可以直接嵌入正式主报告**的 8 图链：

- baseline：有
- Macro-F1 / delta 误差分解：有
- quick vs pooled stratification：有
- pooled grouped delta：有
- pooled heatmap：有
- methodology sensitivity：有
- sample-size correction：有
- UK vs US 主线对照：有

换句话说，Phase 2 现在已经具备和 Phase 1 同口径的“图驱动叙事”能力，虽然总图量仍少于 Phase 1，但已经足够支撑导师阶段沟通。

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

## 3) 为什么现在这套图比旧版强很多

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

## 4) 现在够不够发导师

### 用于导师阶段沟通：**已经够**

目前这 8 张图已经能回答导师最可能追问的几个问题：

1. US baseline 到底是什么水平？
2. 分组差异是 quick 偶然现象，还是 pooled 后仍成立？
3. Transformer 相对 persistence 的 gain 到底稳不稳？
4. US 与 UK 的关系是“同机制但不同幅度”还是完全不同故事？

### 用于论文终稿：**仍有进一步加厚空间**

如果后续转向投稿级排版，还可以再补：

- pooled CI / bootstrap 风格图；
- confusion / top-error 类型图；
- figure caption 更长、可直接贴进论文 Results。

但这些已经属于“下一层精修”，不是当前发导师前的必要门槛。

---

## 5) 建议对导师的话术（Phase 2）

可以这样概括：

> Phase 2 现在已经不是一份只有几张零散图的中间汇报，而是形成了完整的 8 图主链：baseline、误差分解、quick-vs-pooled 分组对照、pooled delta、heatmap、方法稳健性、样本量修正，以及 UK-US 主线对表。  
> 它们共同支持一个更成熟的结论：US 中 persistence 依旧强，Transformer 的额外增益在 quick 阶段不一定立刻显形，但在 pooled 和更充分样本下会变得更稳定。
