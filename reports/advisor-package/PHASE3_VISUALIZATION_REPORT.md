# Phase 3 可视化审计与图链说明

> 项目：`Yucheng_Project`  
> 阶段：Phase 3（MTUS cross-national）  
> 对齐基准：`PHASE1_COMPLETE_REPORT.md` 的“主图 + 稳健性图 + 对表图”结构  
> 更新时间：2026-04-03

---

## 1) 本次更新后的结论

Phase 3 的可视化现在已经从“只有表，没有足够图”升级为一套 **10 张** 的成体系图组，而且这套图组是基于**补齐 KR 两个 A1 fine 补跑后重新生成的完整 summary**，不是旧版 38 条 A1 记录的残缺版本。

当前这套图链已经覆盖：

- A1 各国主结果
- seed 稳定性
- quick -> full 修正
- B1 grouped scatter
- country x dimension heatmap
- specific subgroup heatmaps
- B1 quick -> full 修正
- sample-size sensitivity
- fine/coarse sensitivity
- Phase1/2/3 统一对照

也就是说，Phase 3 现在不只是“表够了”，而是“图也足以支撑完整叙事”。

---

## 2) 当前 Phase 3 专属图组（10 张）

目录：`results/phase3_figures/`

| 图号 | 文件 | 在主报告中的位置 | 作用 |
|---|---|---|---|
| P3-F1 | `phase3_fig1_a1_delta_by_country.png` | A1 主线 | 各国 A1 delta（SGD vs Transformer） |
| P3-F2 | `phase3_fig2_fine_vs_coarse_transformer.png` | 敏感性 | fine vs coarse 的国家级对照 |
| P3-F3 | `phase3_fig3_b1_group_delta_scatter.png` | B1 grouped | age/sex 分组点云分布 |
| P3-F4 | `phase3_fig4_cross_phase_transformer_vs_persistence.png` | 统一对表 | Phase1/2/3 主线对照 |
| P3-F5 | `phase3_fig5_a1_seed_stability.png` | A1 主线 | Transformer seed 稳定性 |
| P3-F6 | `phase3_fig6_a1_quick_vs_full_transformer.png` | quick/full | A1 quick -> full uplift |
| P3-F7 | `phase3_fig7_b1_country_groupby_heatmap.png` | B1 grouped | country x group_by 热力图 |
| P3-F8 | `phase3_fig8_b1_specific_group_heatmaps.png` | B1 grouped | specific subgroup 热力图 |
| P3-F9 | `phase3_fig9_b1_quick_vs_full_delta.png` | quick/full | B1 quick -> full uplift |
| P3-F10 | `phase3_fig10_sample_size_vs_delta.png` | 稳健性 | sample size 与 delta 的关系 |

生成脚本：`generate_phase2_phase3_figures.py`

---

## 3) 为什么这一版比旧版强很多

旧版 Phase 3 的最大问题，并不是“没有结果”，而是：

1. 图不够，导致跨国外部效度叙事看起来更像一堆表格摘要。
2. 没有 seed stability / quick-full / sample-size 这类能够直接回应质疑的证据图。
3. 没有把 B1 grouped 的 country-level 结构可视化出来，因此“跨组稳定性”更多停留在文字层面。

这次补齐后的提升很明确：

1. **A1 不只是一张柱状图**：现在有 country delta、seed stability、quick-full 修正三层图。
2. **B1 不只是一句‘都为正’**：现在有 scatter、country x dimension heatmap、specific subgroup heatmap、quick-full 修正图。
3. **方法论解释不再只靠文字**：sample-size 与 fine/coarse 现在都有明确图像支撑。
4. **跨阶段闭环可视化完成**：Phase1 / Phase2 / Phase3 可以一图连起来讲。

---

## 4) 现在够不够发导师

### 用于导师阶段沟通：**已经足够**

现在这 10 张图已经足以回答导师最可能追问的核心问题：

1. Transformer 在 7 国是不是都保持正增益？
2. 这些增益是不是 seed 偶然？
3. quick 到 full 到底修正了什么？
4. grouped analysis 是不是也成立？
5. fine 为什么应该保留为主线？
6. 整个项目从 Phase 1 到 Phase 3 到底是不是一条连续主线？

### 用于论文终稿：**已经接近，但仍可继续加厚**

如果后续面向投稿排版，还可以再补：

- forest plot（country-level CI）
- 更长的 caption 版本
- 更贴近论文风格的 multi-panel summary figure

但就当前“发导师审阅”的目标而言，Phase 3 的图层已经不再是短板。

---

## 5) 与 Phase 1 的差距还有多大

如果拿 Phase 1 的 17+ 张图作标准，Phase 3 现在仍然更精简；但两者的任务也不同：

- **Phase 1**：要承担框架建立、理论解释、应用段与错误分析，因此图更多；
- **Phase 3**：主要承担外部效度验证，图的功能更集中于 cross-country robustness。

因此更准确的判断是：

- Phase 3 现在已经达到“导师阶段完全可用”的成熟度；
- 论文终稿阶段只需要进一步精修 caption 与排版，而不是再从零补图。

---

## 6) 建议对导师的话术（Phase 3）

可以这样概括：

> Phase 3 现在已经从“表格完整、图像偏弱”升级为一套完整的 10 图主链，而且这套图是基于最新的完整 summary 重生成的，KR 的两个 A1 fine 补跑也已经正式进入汇总。  
> 这套图共同支持一个非常清楚的结论：在 7 国 full runs 下，Transformer 相对 persistence 的正增益不仅在总体样本里成立，在 `age_bin` 和 `sex` 分组中也保持稳定，而且 fine 比 coarse 更能承载项目主叙事。
