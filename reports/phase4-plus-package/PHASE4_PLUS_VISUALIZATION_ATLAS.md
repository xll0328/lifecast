# Phase 4 Plus Visualization Atlas

        > 用途：对当前 package 中所有 figure 的用途、路径和引用方式做一份统一说明。  
        > 原则：本 atlas 既回答“哪些图被用了”，也回答“每张图在当前论证中负责什么”。

        ---

        ## 1. 为什么当前 package 需要单独的图件 atlas

        当前 `Phase 4 + next-stage + next-layer` 的叙事既依赖旧的 anchor figures，也依赖这次新生成的状态/bridge/gate 图。因此，如果只给 PDF，而不给单独 atlas，后来的人很容易知道“图存在”，但不知道：

        - 哪张图服务 mechanism-first；
        - 哪张图服务 Group B；
        - 哪张图只是 boundary/support；
        - 哪张图是这次 package 新增，而不是旧项目遗留。

        ---

        ## 2. 当前 figure inventory

        | code | file | package role |
|---|---|---|
| `F1` | `results/phase4plus_figures/phase4plus_fig1_delivery_status_matrix.png` | Top-level state ladder from frozen Phase 4 to evidence-gated delivery. |
| `F2` | `results/phase4plus_figures/phase4plus_fig2_cross_country_bridge.png` | Accuracy and delta profile for UK, USA, and MTUS wave-1 bridge rows. |
| `F3` | `results/phase4plus_figures/phase4plus_fig3_mtus_wave1_country_delta.png` | Five-country wave-1 delta profile for current MTUS bridge evidence. |
| `F4` | `results/phase4plus_figures/phase4plus_fig4_groupb_axes.png` | Employment, gender, income, and age status with structural-boundary annotation. |
| `F5` | `results/phase4plus_figures/phase4plus_fig5_extension_support.png` | Trigger difficulty, contextual/hazard lift, and expanding-window negativity. |
| `F6` | `results/phase4plus_figures/phase4plus_fig6_evidence_gate.png` | Default-delivery pass/hold structure and stronger-claim trigger rule. |
| `FIGURE6` | `results/anchor_figures/figure6_transition_analysis.png` | Primary mechanism-first anchor for stay vs transition asymmetry. |
| `FIGURE8` | `results/anchor_figures/figure8_input_info_effect.png` | Anchor figure for the claim that more history/channels do not materially improve prediction. |
| `FIGURE10` | `results/anchor_figures/figure10_dimension_importance.png` | Primary social-stratification figure, but only under explicit caption boundaries. |

        ---

        ## 3. 图件逐张说明

        ### 1. Phase 4+ delivery status matrix

- canonical_path: `results/phase4plus_figures/phase4plus_fig1_delivery_status_matrix.png`
- source: `live summary jsons`
- package role: Top-level state ladder from frozen Phase 4 to evidence-gated delivery.

![Phase 4+ delivery status matrix](results/phase4plus_figures/phase4plus_fig1_delivery_status_matrix.png)

### 2. Cross-country bridge rows

- canonical_path: `results/phase4plus_figures/phase4plus_fig2_cross_country_bridge.png`
- source: `results/next_stage_cross_country_activity_master/summary.json`
- package role: Accuracy and delta profile for UK, USA, and MTUS wave-1 bridge rows.

![Cross-country bridge rows](results/phase4plus_figures/phase4plus_fig2_cross_country_bridge.png)

### 3. MTUS wave-1 country deltas

- canonical_path: `results/phase4plus_figures/phase4plus_fig3_mtus_wave1_country_delta.png`
- source: `results/next_stage_cross_country_activity_master/summary.json`
- package role: Five-country wave-1 delta profile for current MTUS bridge evidence.

![MTUS wave-1 country deltas](results/phase4plus_figures/phase4plus_fig3_mtus_wave1_country_delta.png)

### 4. Group B axis ladder

- canonical_path: `results/phase4plus_figures/phase4plus_fig4_groupb_axes.png`
- source: `results/next_stage_groupb_master/summary.json`
- package role: Employment, gender, income, and age status with structural-boundary annotation.

![Group B axis ladder](results/phase4plus_figures/phase4plus_fig4_groupb_axes.png)

### 5. Next-layer support and boundary evidence

- canonical_path: `results/phase4plus_figures/phase4plus_fig5_extension_support.png`
- source: `results/next_layer_extension_summary/summary.json`
- package role: Trigger difficulty, contextual/hazard lift, and expanding-window negativity.

![Next-layer support and boundary evidence](results/phase4plus_figures/phase4plus_fig5_extension_support.png)

### 6. Evidence gate decision

- canonical_path: `results/phase4plus_figures/phase4plus_fig6_evidence_gate.png`
- source: `results/evidence_gate_decision/summary.json`
- package role: Default-delivery pass/hold structure and stronger-claim trigger rule.

![Evidence gate decision](results/phase4plus_figures/phase4plus_fig6_evidence_gate.png)

### 7. Figure 6 transition analysis

- canonical_path: `results/anchor_figures/figure6_transition_analysis.png`
- source: `results/figures/figure6_transition_analysis.png`
- package role: Primary mechanism-first anchor for stay vs transition asymmetry.

![Figure 6 transition analysis](results/anchor_figures/figure6_transition_analysis.png)

### 8. Figure 8 input-information effect

- canonical_path: `results/anchor_figures/figure8_input_info_effect.png`
- source: `results/figures/figure8_input_info_effect.png`
- package role: Anchor figure for the claim that more history/channels do not materially improve prediction.

![Figure 8 input-information effect](results/anchor_figures/figure8_input_info_effect.png)

### 9. Figure 10 dimension importance

- canonical_path: `results/anchor_figures/figure10_dimension_importance.png`
- source: `results/figures/figure10_dimension_importance.png`
- package role: Primary social-stratification figure, but only under explicit caption boundaries.

![Figure 10 dimension importance](results/anchor_figures/figure10_dimension_importance.png)

        ---

        ## 4. 当前 package 的图件结构

        - 新生成的当前态图位于：`results/phase4plus_figures/`
        - 当前 package 复用的 anchor figures 位于：`results/anchor_figures/`
        - 所有原图镜像位于：`ORIGINAL_FIGURES/`

        如果需要稳定引用，请优先使用 `results/...` 里的 canonical paths；`ORIGINAL_FIGURES/...` 更适合邮件、PPT 或单独抽图。
