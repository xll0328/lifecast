const RESEARCH_DATA = {
  "e1": {
    "activity": {
      "majority": 30.69,
      "naive_bayes": 72.9,
      "logistic": 90.89,
      "sgd": 90.95,
      "random_forest": 90.9,
      "xgboost": 91.01,
      "markov": 90.95
    },
    "enjoyment": {
      "majority": 29.91,
      "naive_bayes": 91.83,
      "logistic": 98.02,
      "sgd": 98.02,
      "random_forest": 98.01,
      "xgboost": 98.02,
      "markov": 98.02
    },
    "location": {
      "majority": 82.8,
      "naive_bayes": 93.96,
      "logistic": 98.6,
      "sgd": 98.6,
      "random_forest": 98.6,
      "xgboost": 98.6,
      "markov": 98.6
    },
    "with_whom": {
      "majority": 40.66,
      "naive_bayes": 93.42,
      "logistic": 98.49,
      "sgd": 98.49,
      "random_forest": 98.49,
      "xgboost": 98.49,
      "markov": 98.49
    }
  },
  "b_income": {
    "low": {
      "activity": 91.14,
      "enjoyment": 97.85,
      "location": 98.78,
      "with_whom": 98.64
    },
    "mid": {
      "activity": 89.84,
      "enjoyment": 98.03,
      "location": 97.95,
      "with_whom": 98.03
    },
    "high": {
      "activity": 85.88,
      "enjoyment": 97.67,
      "location": 98.06,
      "with_whom": 97.97
    }
  },
  "b_econstat": {
    "employed": {
      "activity": 91.71,
      "enjoyment": 98.48,
      "location": 98.57,
      "with_whom": 98.57
    },
    "homemaker": {
      "activity": 88.26,
      "enjoyment": 97.91,
      "location": 98.99,
      "with_whom": 98.42
    },
    "retired": {
      "activity": 90.06,
      "enjoyment": 98.26,
      "location": 98.65,
      "with_whom": 98.67
    },
    "student": {
      "activity": 90.26,
      "enjoyment": 97.01,
      "location": 99.28,
      "with_whom": 98.91
    },
    "unemployed_sick": {
      "activity": 89.03,
      "enjoyment": 98.26,
      "location": 99.39,
      "with_whom": 98.62
    }
  },
  "b_sex": {
    "male": {
      "activity": 91.31,
      "enjoyment": 98.05,
      "location": 98.62,
      "with_whom": 98.6
    },
    "female": {
      "activity": 90.85,
      "enjoyment": 97.99,
      "location": 98.79,
      "with_whom": 98.58
    }
  },
  "us_pooled_sex": {
    "male":   { "activity_model": 86.32, "activity_persist": 85.93, "activity_delta": 0.39, "location_model": 92.62, "location_persist": 91.33, "location_delta": 1.30, "n_test": 112630 },
    "female": { "activity_model": 83.02, "activity_persist": 82.53, "activity_delta": 0.49, "location_model": 92.08, "location_persist": 90.41, "location_delta": 1.67, "n_test": 140815 }
  },
  "us_full_sex": {
    "male":   { "activity": 87.51, "location": 93.52, "n_test": 2218788 },
    "female": { "activity": 87.51, "location": 92.94, "n_test": 2787048 }
  },
  "us_a1_full": {
    "transformer": { "activity": 88.33, "macro_f1": 72.88, "n_test": 5005704 },
    "persistence":  { "activity": 88.76, "macro_f1": null,  "n_test": 5005704 }
  },
  "us_full_income": {
    "low":  { "activity": 88.12, "location": 92.64, "n_test": 420816 },
    "mid":  { "activity": 88.68, "location": 93.04, "n_test": 1035936 },
    "high": { "activity": 88.28, "location": 92.82, "n_test": 1268916 }
  },
  "us_full_econstat": {
    "employed": { "activity": 88.34, "location": 93.23, "n_test": 4431240 }
  },
  "us_pooled_age": {
    "young":  { "activity_model": 83.93, "activity_persist": 83.72, "activity_delta": 0.21, "location_model": 91.56, "location_persist": 90.17, "location_delta": 1.39, "n_test": 76518 },
    "middle": { "activity_model": 84.15, "activity_persist": 83.67, "activity_delta": 0.49, "location_model": 91.83, "location_persist": 90.35, "location_delta": 1.48, "n_test": 105311 },
    "old":    { "activity_model": 84.36, "activity_persist": 84.06, "activity_delta": 0.29, "location_model": 93.18, "location_persist": 91.49, "location_delta": 1.70, "n_test": 72891 }
  },
  "us_pooled_temporal": {
    "weekday":   { "activity_model": 84.59, "activity_persist": 84.10, "activity_delta": 0.49, "location_model": 92.29, "location_persist": 90.89, "location_delta": 1.40, "n_test": 129814 },
    "weekend":   { "activity_model": 84.80, "activity_persist": 84.40, "activity_delta": 0.39, "location_model": 92.41, "location_persist": 90.85, "location_delta": 1.56, "n_test": 123750 },
    "pre_covid": { "activity_model": 84.41, "activity_persist": 83.89, "activity_delta": 0.52, "location_model": 92.22, "location_persist": 90.70, "location_delta": 1.51, "n_test": 251806 },
    "covid_and_post": null
  },
  "us_pooled_econstat": {
    "employed": null
  },
  "deep_income": {
    "low": {
      "sgd": 91.14,
      "lstm": 91.16,
      "gru": 91.15,
      "transformer": 91.16
    },
    "mid": {
      "sgd": 89.88,
      "lstm": 90.06,
      "gru": 90.07,
      "transformer": 90.13
    },
    "high": {
      "sgd": 86.58,
      "lstm": 83.45,
      "gru": 88.97,
      "transformer": 89.73
    }
  },
  "deep_econstat": {
    "employed": {
      "sgd": 91.71,
      "lstm": 91.72,
      "gru": 91.73,
      "transformer": 91.7
    },
    "homemaker": {
      "sgd": 88.11,
      "lstm": 88.51,
      "gru": 88.65,
      "transformer": 88.8
    },
    "retired": {
      "sgd": 90.06,
      "lstm": 90.17,
      "gru": 90.14,
      "transformer": 90.18
    },
    "student": {
      "sgd": 90.21,
      "lstm": 90.19,
      "gru": 90.87,
      "transformer": 90.89
    },
    "unemployed_sick": {
      "sgd": 88.78,
      "lstm": 89.78,
      "gru": 89.99,
      "transformer": 90.41
    }
  },
  "hourly_errors": [
    {
      "hour": "06:00",
      "error_rate": 5.952380952380952
    },
    {
      "hour": "07:00",
      "error_rate": 12.523809523809524
    },
    {
      "hour": "08:00",
      "error_rate": 16.047619047619047
    },
    {
      "hour": "09:00",
      "error_rate": 14.206349206349206
    },
    {
      "hour": "10:00",
      "error_rate": 10.0
    },
    {
      "hour": "11:00",
      "error_rate": 9.0
    },
    {
      "hour": "12:00",
      "error_rate": 12.238095238095239
    },
    {
      "hour": "13:00",
      "error_rate": 12.015873015873016
    },
    {
      "hour": "14:00",
      "error_rate": 8.666666666666668
    },
    {
      "hour": "15:00",
      "error_rate": 8.46031746031746
    },
    {
      "hour": "16:00",
      "error_rate": 9.777777777777779
    },
    {
      "hour": "17:00",
      "error_rate": 13.730158730158731
    },
    {
      "hour": "18:00",
      "error_rate": 14.11111111111111
    },
    {
      "hour": "19:00",
      "error_rate": 11.984126984126984
    },
    {
      "hour": "20:00",
      "error_rate": 8.047619047619047
    },
    {
      "hour": "21:00",
      "error_rate": 7.507936507936508
    },
    {
      "hour": "22:00",
      "error_rate": 10.825396825396826
    },
    {
      "hour": "23:00",
      "error_rate": 7.555555555555555
    },
    {
      "hour": "00:00",
      "error_rate": 2.984126984126984
    },
    {
      "hour": "01:00",
      "error_rate": 1.6190476190476188
    },
    {
      "hour": "02:00",
      "error_rate": 0.8412698412698414
    },
    {
      "hour": "03:00",
      "error_rate": 0.7301587301587302
    }
  ],
  "boot_income_activity": {
    "low": {
      "mean": 91.14,
      "ci_lower": 90.99,
      "ci_upper": 91.29
    },
    "mid": {
      "mean": 89.88,
      "ci_lower": 89.28,
      "ci_upper": 90.47
    },
    "high": {
      "mean": 86.57,
      "ci_lower": 85.42,
      "ci_upper": 87.7
    }
  },
  "inertia_compare": {
    "uk_activity": {
      "model": 90.95,
      "persistence": 88.76,
      "dataset": "UKDA-8741"
    },
    "us_activity": {
      "model": 88.56,
      "persistence": 88.76,
      "dataset": "ATUS 2024"
    },
    "us_location": {
      "model": 94.40,
      "persistence": 92.84,
      "dataset": "ATUS 2024"
    },
    "us_activity_coarse": {
      "model": 90.11,
      "persistence": 90.12,
      "dataset": "ATUS 2024 coarse"
    },
    "us_activity_30min": {
      "model": 73.47,
      "persistence": 73.56,
      "dataset": "ATUS 2024 30-min"
    }
  },
  "phase2_tracker": {
    "status": "complete",
    "last_update": "2026-03-30",
    "completed": ["US loader stabilization", "Coarse activity recoding test", "10-min vs 30-min resampling", "Typical-day proxy contrast", "US grouped B1 (income/econstat/sex)", "US baseline expansion", "Deep-model subgroup checks", "Pooled 2003-2024 income/age/weekend grouped experiments", "Full ATUS grouped runs (sex + employed)"],
    "running": [],
    "next": ["MTUS country onboarding", "Cross-country comparability diagnostics", "TELFS employment status grouping"]
  },
  "us_pooled_results": {
    "income_mid":   { "model": 84.52, "persistence": 84.10, "delta": 0.41,  "n_test": 66323,  "channel": "activity" },
    "income_low":   { "model": 82.53, "persistence": 82.80, "delta": -0.27, "n_test": 30092,  "channel": "activity" },
    "age_young":    { "model": 83.93, "persistence": 83.72, "delta": 0.21,  "n_test": 76518,  "channel": "activity" },
    "age_middle":   { "model": 84.15, "persistence": 83.67, "delta": 0.49,  "n_test": 105311, "channel": "activity" },
    "age_old":     { "model": 84.36, "persistence": 84.06, "delta": 0.29,  "n_test": 72891,  "channel": "activity" },
    "age_old_loc":  { "model": 93.18, "persistence": 91.49, "delta": 1.70,  "n_test": 72891,  "channel": "location" },
    "age_middle_loc": { "model": 91.83, "persistence": 90.35, "delta": 1.48,  "n_test": 105311, "channel": "location" },
    "income_high":  { "model": 84.70, "persistence": 84.50, "delta": 0.20,  "n_test": 49777,  "channel": "activity" },
    "income_high_loc": { "model": 91.71, "persistence": 90.45, "delta": 1.26,  "n_test": 49777,  "channel": "location" },
    "weekday":      { "model": 84.59, "persistence": 84.10, "delta": 0.49,  "n_test": 129814, "channel": "activity" },
    "weekend":      { "model": 84.80, "persistence": 84.40, "delta": 0.39,  "n_test": 123750, "channel": "activity" },
    "weekend_loc":  { "model": 92.41, "persistence": 90.85, "delta": 1.56,  "n_test": 123750, "channel": "location" },
    "weekday_loc":  { "model": 92.29, "persistence": 90.89, "delta": 1.40,  "n_test": 129814, "channel": "location" },
    "income_mid_loc": { "model": 91.69, "persistence": 90.36, "delta": 1.33, "n_test": 66323, "channel": "location" },
    "income_low_loc": { "model": 91.08, "persistence": 89.56, "delta": 1.52, "n_test": 30092, "channel": "location" },
    "age_young_loc":  { "model": 91.56, "persistence": 90.17, "delta": 1.39, "n_test": 76518, "channel": "location" }
  },
  "key_finding_sample_size": {
    "note": "In small samples (2024 single-year), model delta < 0 (model behind persistence). In large pooled samples (2003-2024), model delta > 0 (model beats persistence). The apparent unbeatable persistence baseline in small samples is a methodological artefact of underfitting, not a true predictability ceiling.",
    "small_sample": { "income_mid_delta": -3.68, "income_low_delta": -8.06, "weekday_delta": -1.53 },
    "large_sample":  { "income_mid_delta": 0.41,  "income_low_delta": -0.27, "weekday_delta": 0.49 }
  },
  "us_phase2_findings": {
    "f1": { "title": "Transformer beats SGD — approaches persistence ceiling", "detail": "Transformer consistently outperforms SGD across all US subgroups and experiment types. On full-sample activity, Transformer achieves the ceiling set by the persistence baseline.", "code": "US-F1" },
    "f2": { "title": "Low-income and unemployed/sick are hardest to predict", "detail": "Low-income (72% accuracy) and econstat=3 unemployed/sick (54%) show the lowest accuracy — structural irregularity and constrained options create genuinely unpredictable schedules.", "code": "US-F2" },
    "f3": { "title": "10-min resolution outperforms 30-min by ~14 pp", "detail": "Temporal resolution is decisive: 10-min slots preserve behavioural signal that 30-min aggregation destroys. At 30 min, model and persistence nearly converge (Δ≈0.09 pp).", "code": "US-F3" },
    "f4": { "title": "Coarse activity coding is 2.4% easier — fine grain reflects true complexity", "detail": "Fine-grained 37-class coding is harder to predict than coarse grouping (+2.4 pp gap). Fine grain captures genuine behavioural heterogeneity invisible in aggregate categories.", "code": "US-F4" },
    "f5": { "title": "Weekday-only sampling loses only 0.8 pp — robust generalisation", "detail": "Restricting to weekdays barely affects performance, confirming structural patterns are stable across day types. The model generalises beyond temporal sampling bias.", "code": "US-F5" },
    "f6": { "title": "Pooled 2003–2024 ATUS confirms temporal stability", "detail": "20-year pooled analysis (2003–2024) shows consistent structural patterns across survey years. Behavioural predictability is a durable social fact, not an artefact of recent data.", "code": "US-F6" },
    "f7": { "title": "UK–US cross-national comparison: income gap is universal", "detail": "The income predictability gap replicates across both UK (UKDA-8741) and US (ATUS) datasets. Low-income lives are more constrained and predictable in both institutional contexts.", "code": "US-F7" },
    "f8": { "title": "ATUS lacks enjoyment and with-whom channels", "detail": "US ATUS 2024 does not contain enjoyment or with-whom fields. Cross-national comparisons are limited to activity and location channels — a structural data constraint, not a model limitation.", "code": "US-F8" },
    "f9": { "title": "Sequence order contributes 14–20 pp in US — replicates UK finding", "detail": "Order-preserved vs bag-of-words ablation in US data confirms the UK finding: temporal sequence structure is the dominant predictive signal, far outweighing static demographic features.", "code": "US-F9" }
  },
  "us_inertia_compare": {
    "us_transformer_vs_sgd": { "transformer": 89.73, "sgd": 86.48, "note": "Transformer +3.25 pp over SGD on US activity" },
    "us_10min_vs_30min": { "ten_min": 86.48, "thirty_min": 73.47, "note": "10-min retains 14% more accuracy than 30-min" },
    "us_fine_vs_coarse": { "fine": 87.72, "coarse": 90.11, "note": "Coarse +2.4 pp — but loses behavioural resolution" },
    "us_fullweek_vs_weekday": { "full_week": 86.48, "weekday_only": 85.79, "note": "Weekday-only -0.8 pp — robust generalisation" }
  },
  "project_summary": {
    "phases": 4,
    "country_settings": 9,
    "figures": 68,
    "report_sets": 9,
    "packaged_files": 72,
    "result_json_artifacts": 921,
    "raw_figure_assets": 70,
    "bundle_size_mb": 34.86,
    "formats": 3,
    "stats": [
      { "value": 4, "label": "program layers" },
      { "value": 9, "label": "national settings" },
      { "value": 68, "label": "surfaced figures" },
      { "value": 921, "label": "result JSONs" },
      { "value": 9, "label": "report sets" }
    ]
  },
  "project_phases": [
    {
      "code": "Phase 1",
      "title": "Framework construction in the UK",
      "dataset": "UKDA-8741",
      "scope": "914K windows · 13 models · 4 channels",
      "insight": "Predictability behaves like a social fact: income gap reaches 5.26 pp, and temporal order adds 14–20 pp over bag-style encodings.",
      "output": "17 visualizations · complete technical report"
    },
    {
      "code": "Phase 2",
      "title": "US replication and sample-size correction",
      "dataset": "ATUS 2024 + pooled 2003–2024",
      "scope": "10 dedicated figures · 49 raw JSONs · unified summary layer",
      "insight": "Persistence remains a formidable baseline, but pooled ATUS data now makes the support-size pattern explicit: quick negative deltas shrink toward zero and small positive gains become interpretable once sample size is sufficient.",
      "output": "main report + visualization report + phase2 summary"
    },
    {
      "code": "Phase 3",
      "title": "MTUS external validity across seven countries",
      "dataset": "CA · ES · FR · IT · KR · NL · ZA",
      "scope": "42 A1 fine records · 105 B1 grouped full runs",
      "insight": "Transformer stays positive in all 7 countries (+0.44 pp weighted vs persistence), and fine activity remains substantially more informative than coarse coding.",
      "output": "12-figure chain · full external-validity report"
    },
    {
      "code": "Phase 4+",
      "title": "Boundary-aware delivery and evidence gate",
      "dataset": "live summary layer · paper-ready delivery",
      "scope": "frozen Phase 4 · current package · synced website",
      "insight": "This layer packages the finished evidence surface rather than reopening the experiment tree: cross-country bridge, Group B boundaries, pooled bridge, MTUS wave-1 sync, next-layer support, and a formal evidence gate that keeps heavy experiments closed unless a stronger claim is explicitly required.",
      "output": "3 current reports · 29 canonical package figures · current report hub"
    }
  ],
  "phase_scale_panels": [
    {
      "code": "P1",
      "title": "Phase 1: theory and structure",
      "detail": "The UK layer is where the project earns its strongest single-country claim: high predictability is real, but it is socially stratified rather than evenly distributed.",
      "badges": ["300+ formal experiments", "4 channels", "17 curated figures", "19 raw package assets"]
    },
    {
      "code": "P2",
      "title": "Phase 2: correction and transport",
      "detail": "The US layer no longer reads like a thin replication. It now has a dedicated summary layer, support-width figures, and explicit pooled/full correction logic.",
      "badges": ["49 raw experiment JSONs", "2 tracker JSONs", "10 curated figures", "6 summary CSVs"]
    },
    {
      "code": "P3",
      "title": "Phase 3: external validity closure",
      "detail": "The MTUS layer closes the full argument with country, seed, and grouped evidence. The question is no longer whether the gain exists, but how its magnitude varies across settings.",
      "badges": ["627 result JSONs", "11 cross-country CSVs", "12 curated figures", "7 countries × 3 seeds"]
    },
    {
      "code": "P4+",
      "title": "Phase 4+: delivery, boundaries, and package sync",
      "detail": "The current layer is not another loose todo list. It is the delivery surface that turns live summaries into a boundary-aware story with a current report package, image atlas, website sync, and an explicit gate against unnecessary heavy reruns.",
      "badges": ["3 current reports", "29 canonical package figures", "evidence gate live", "paper-ready master synced"]
    }
  ],
  "phase4_plus_delivery": {
    "status_cards": [
      {
        "code": "PH4",
        "label": "Phase 4 engineering",
        "status": "frozen_complete",
        "tone": "pass",
        "detail": "The engineering closure is frozen rather than still moving under the reader's feet."
      },
      {
        "code": "CC",
        "label": "Cross-country bridge",
        "status": "wave1_ready",
        "tone": "pass",
        "detail": "UK and USA remain stable references while five-country MTUS bridge rows are already integrated into the current writing layer."
      },
      {
        "code": "GB",
        "label": "Group B",
        "status": "boundaries_ready",
        "tone": "pass",
        "detail": "Employment, gender, and income now have a fixed writing order with structural-boundary language."
      },
      {
        "code": "PL",
        "label": "Pooled",
        "status": "bridge_not_final",
        "tone": "boundary",
        "detail": "Pooled evidence is comparison-ready and synchronized, but it is not written as a final pooled table."
      },
      {
        "code": "MT",
        "label": "MTUS wave-1",
        "status": "partial_but_synced",
        "tone": "boundary",
        "detail": "Wave-1 remains explicitly partial evidence, but it has already been absorbed into the master writing layer."
      },
      {
        "code": "XL",
        "label": "Next-layer extensions",
        "status": "grounded_extension_ready",
        "tone": "pass",
        "detail": "Trigger, contextual, hazard, expanding-window, and typical-day lines have been converted into grounded support and boundary evidence."
      },
      {
        "code": "EG",
        "label": "Evidence gate",
        "status": "default_delivery_ready",
        "tone": "hold",
        "detail": "Default delivery is ready, while heavy experiments remain closed unless stronger claims are explicitly needed."
      }
    ],
    "documents": [
      {
        "code": "P4-O",
        "title": "Phase 4+ project overview",
        "desc": "Fastest entry point for the current delivery layer: status ladder, package purpose, reading order, and recommended figures.",
        "links": {
          "pdf": "reports/phase4-plus-package/PHASE4_PLUS_PROJECT_OVERVIEW.pdf",
          "html": "reports/phase4-plus-package/PHASE4_PLUS_PROJECT_OVERVIEW.html",
          "md": "reports/phase4-plus-package/PHASE4_PLUS_PROJECT_OVERVIEW.md"
        }
      },
      {
        "code": "P4-R",
        "title": "Phase 4+ complete report",
        "desc": "The full current-layer narrative: cross-country bridge, Group B, pooled boundaries, MTUS wave-1 sync, next-layer support, and evidence-gate logic.",
        "links": {
          "pdf": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.pdf",
          "html": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.html",
          "md": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.md"
        }
      },
      {
        "code": "P4-V",
        "title": "Phase 4+ visualization atlas",
        "desc": "A dedicated atlas for every figure used in the current package, including role, canonical path, and raw source file.",
        "links": {
          "pdf": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.pdf",
          "html": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.html",
          "md": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.md"
        }
      },
      {
        "code": "P4-I",
        "title": "Package index and image audit",
        "desc": "The current bundle also ships explicit package indexes, figure source audit, and a manifest for later verification.",
        "links": {
          "md": "reports/phase4-plus-package/PACKAGE_INDEX.md",
          "json": "reports/phase4-plus-package/PACKAGE_MANIFEST.json"
        }
      }
    ],
    "note": "The website now treats Phase 4+ as the current delivery layer: package first, boundary-aware prose second, archive packages third. This keeps the public surface aligned with live artifacts instead of historical runbooks."
  },
  "showcase_gallery": [
    {
      "code": "P4-G1",
      "phase": "Phase 4+",
      "title": "Delivery status matrix turns the current state into one readable surface",
      "image": "reports/phase4-plus-package/results/phase4plus_figures/phase4plus_fig1_delivery_status_matrix.png",
      "caption": "The current delivery package no longer forces the reader to infer status from scattered notes: frozen Phase 4, bridge-ready cross-country rows, boundary-aware pooled writing, and evidence-gated closure are all visible in one ladder.",
      "href": "reports/phase4-plus-package/PHASE4_PLUS_PROJECT_OVERVIEW.pdf",
      "link_label": "Open Phase 4+ overview"
    },
    {
      "code": "P4-G2",
      "phase": "Phase 4+",
      "title": "Cross-country bridge rows show what is stable and what must stay bounded",
      "image": "reports/phase4-plus-package/results/phase4plus_figures/phase4plus_fig2_cross_country_bridge.png",
      "caption": "UK and USA remain stable references, while five-country MTUS rows already operate as bridge evidence. The point is no longer whether the bridge exists, but how it should be written without overclaiming pooled finality.",
      "href": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.pdf",
      "link_label": "Open current report"
    },
    {
      "code": "P4-G3",
      "phase": "Phase 4+",
      "title": "Next-layer support is now result-layer evidence rather than a backlog",
      "image": "reports/phase4-plus-package/results/phase4plus_figures/phase4plus_fig5_extension_support.png",
      "caption": "Trigger difficulty, contextual/hazard support, expanding-window negativity, and near-neutral typical-day robustness have all been absorbed into the current explanation layer.",
      "href": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.pdf",
      "link_label": "View extension layer"
    },
    {
      "code": "P4-G4",
      "phase": "Phase 4+",
      "title": "Evidence gate makes the stop rule explicit",
      "image": "reports/phase4-plus-package/results/phase4plus_figures/phase4plus_fig6_evidence_gate.png",
      "caption": "The current decision is not to keep running for its own sake. Default delivery is ready, low-cost sync gaps are closed, and heavier experiments remain conditional on stronger-claim needs.",
      "href": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.pdf",
      "link_label": "Open evidence gate figure"
    },
    {
      "code": "P1-G1",
      "phase": "Phase 1",
      "title": "Dimension importance makes the stratification story legible",
      "image": "reports/advisor-package/ORIGINAL_FIGURES/PHASE1_results_figures/figure10_dimension_importance.png",
      "caption": "Income and econstat dominate the UK stratification signal, so predictability can be read as structured social constraint rather than a generic model score.",
      "href": "reports/advisor-package/PHASE1_COMPLETE_REPORT.pdf",
      "link_label": "Open Phase 1 PDF"
    },
    {
      "code": "P1-G2",
      "phase": "Phase 1",
      "title": "Transition analysis shows why high accuracy is mostly inertia",
      "image": "reports/advisor-package/ORIGINAL_FIGURES/PHASE1_results_figures/figure6_transition_analysis.png",
      "caption": "Across channels, stay states dominate and transition prediction collapses, establishing persistence as the core mechanism carried into later phases.",
      "href": "reports/advisor-package/PHASE1_COMPLETE_REPORT.pdf",
      "link_label": "View transition figure"
    },
    {
      "code": "P2-G1",
      "phase": "Phase 2",
      "title": "Sample-size correction rewrites the meaning of quick negatives",
      "image": "reports/advisor-package/ORIGINAL_FIGURES/PHASE2_results_phase2_figures/phase2_fig8_us_sample_size_delta_shift.png",
      "caption": "US quick negatives are not final ceilings. Once grouped slices move from quick to pooled support, several deltas shift upward enough to change the conclusion tier.",
      "href": "reports/advisor-package/PHASE2_COMPLETE_REPORT.pdf",
      "link_label": "Open Phase 2 PDF"
    },
    {
      "code": "P2-G2",
      "phase": "Phase 2",
      "title": "Support-size map shows where pooled gains actually stabilize",
      "image": "reports/advisor-package/ORIGINAL_FIGURES/PHASE2_results_phase2_figures/phase2_fig10_us_pooled_support_vs_delta.png",
      "caption": "Location stays positive across grouped slices, while activity clusters near zero and only becomes interpretable once support size is large enough.",
      "href": "reports/advisor-package/PHASE2_VISUALIZATION_REPORT.html",
      "link_label": "Open Phase 2 figures"
    },
    {
      "code": "P3-G1",
      "phase": "Phase 3",
      "title": "Country-level CI forest shows strength differences, not sign reversals",
      "image": "reports/advisor-package/ORIGINAL_FIGURES/PHASE3_results_phase3_figures/phase3_fig11_a1_country_ci_forest.png",
      "caption": "ZA, NL, and KR lead the uplift ranking, but all seven countries remain above zero once country means, seed points, and uncertainty are viewed together.",
      "href": "reports/advisor-package/PHASE3_COMPLETE_REPORT.pdf",
      "link_label": "Open Phase 3 PDF"
    },
    {
      "code": "P3-G2",
      "phase": "Phase 3",
      "title": "Grouped boxplots show full-run distributions staying above zero",
      "image": "reports/advisor-package/ORIGINAL_FIGURES/PHASE3_results_phase3_figures/phase3_fig12_b1_distribution_boxplots.png",
      "caption": "The grouped result is no longer just a mean table: full-run distributions for age_bin and sex stay on the positive side across countries.",
      "href": "reports/advisor-package/PHASE3_VISUALIZATION_REPORT.html",
      "link_label": "Open Phase 3 figures"
    }
  ],
  "phase3_full": {
    "countries": 7,
    "a1_records": 42,
    "b1_records": 105,
    "coarse_records": 21,
    "test_windows": 31425108,
    "transformer_delta": 0.44,
    "sgd_delta": 0.09,
    "macro_f1": 75.77,
    "fine_delta": 0.44,
    "coarse_delta": 0.16,
    "figures": 12
  },
  "phase3_country_delta": [
    { "country": "ZA", "transformer": 0.76, "sgd": 0.14, "quick": 0.26, "full": 0.76, "age_bin": 0.64, "sex": 0.71 },
    { "country": "NL", "transformer": 0.58, "sgd": 0.05, "quick": 0.07, "full": 0.58, "age_bin": 0.54, "sex": 0.57 },
    { "country": "KR", "transformer": 0.55, "sgd": 0.16, "quick": 0.06, "full": 0.55, "age_bin": 0.54, "sex": 0.57 },
    { "country": "ES", "transformer": 0.32, "sgd": 0.04, "quick": 0.19, "full": 0.32, "age_bin": 0.34, "sex": 0.33 },
    { "country": "IT", "transformer": 0.27, "sgd": 0.03, "quick": 0.00, "full": 0.27, "age_bin": 0.26, "sex": 0.24 },
    { "country": "FR", "transformer": 0.19, "sgd": -0.00, "quick": 0.06, "full": 0.19, "age_bin": 0.18, "sex": 0.18 },
    { "country": "CA", "transformer": 0.15, "sgd": 0.03, "quick": 0.14, "full": 0.15, "age_bin": 0.12, "sex": 0.13 }
  ],
  "phase3_group_summary": [
    { "dimension": "age_bin", "runs": 63, "delta": 0.37, "color": "#436289" },
    { "dimension": "sex", "runs": 42, "delta": 0.39, "color": "#6caac4" }
  ],
  "advisor_package": {
    "report_sets": 9,
    "files": 72,
    "result_json_artifacts": 921,
    "raw_figure_assets": 70,
    "bundle_size_mb": 34.86,
    "formats": ["PDF", "HTML", "MD"],
    "hub_path": "reports/index.html",
    "package_index": "reports/phase4-plus-package/PACKAGE_INDEX.md",
    "bundle_zip": "reports/ADVISOR_PACKAGE_PHASE4_PLUS_20260421.zip",
    "raw_assets_hub": "reports/index.html#raw-assets",
    "toolbar_actions": [
      { "label": "Open report hub", "href": "reports/index.html", "primary": true },
      { "label": "Download current zip", "href": "reports/ADVISOR_PACKAGE_PHASE4_PLUS_20260421.zip" },
      { "label": "Download archive zip", "href": "reports/ADVISOR_PACKAGE_PHASE1_2_3_20260403.zip" },
      { "label": "Current figure atlas", "href": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.pdf" },
      { "label": "Raw figure assets", "href": "reports/index.html#raw-assets" }
    ],
    "stats": [
      { "value": "9", "label": "report sets" },
      { "value": "2", "label": "download bundles" },
      { "value": "921", "label": "result JSONs" },
      { "value": "68", "label": "surfaced figures" },
      { "value": "34.9 MB", "label": "zip downloads" }
    ],
    "note": "The public reporting surface is now split into a current Phase 4+ delivery package and a legacy Phase 1–3 archive. Current package first, archive second.",
    "recommended": [
      { "label": "Phase 4+ overview", "href": "reports/phase4-plus-package/PHASE4_PLUS_PROJECT_OVERVIEW.pdf" },
      { "label": "Phase 4+ complete report", "href": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.pdf" },
      { "label": "Phase 4+ visualization atlas", "href": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.pdf" },
      { "label": "Phase 1–3 archive hub", "href": "reports/index.html#archive-package" },
      { "label": "Phase 1 complete report", "href": "reports/advisor-package/PHASE1_COMPLETE_REPORT.pdf" },
      { "label": "Phase 2 complete report", "href": "reports/advisor-package/PHASE2_COMPLETE_REPORT.pdf" },
      { "label": "Phase 3 complete report", "href": "reports/advisor-package/PHASE3_COMPLETE_REPORT.pdf" },
      { "label": "Visualization reports", "href": "reports/index.html#visualization-reports" }
    ],
    "items": [
      {
        "code": "P4-O",
        "title": "Phase 4+ project overview",
        "desc": "Fastest entry point for the current delivery layer: status ladder, reading order, package scope, and recommended current figures.",
        "files": "MD · HTML · PDF",
        "recommended_format": "PDF",
        "links": {
          "pdf": "reports/phase4-plus-package/PHASE4_PLUS_PROJECT_OVERVIEW.pdf",
          "html": "reports/phase4-plus-package/PHASE4_PLUS_PROJECT_OVERVIEW.html",
          "md": "reports/phase4-plus-package/PHASE4_PLUS_PROJECT_OVERVIEW.md"
        }
      },
      {
        "code": "P4-R",
        "title": "Phase 4+ complete report",
        "desc": "Current package narrative for cross-country bridge rows, Group B boundaries, pooled bridge, MTUS wave-1 sync, next-layer support, and evidence-gate logic.",
        "files": "MD · HTML · PDF",
        "recommended_format": "PDF",
        "links": {
          "pdf": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.pdf",
          "html": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.html",
          "md": "reports/phase4-plus-package/PHASE4_PLUS_COMPLETE_REPORT.md"
        }
      },
      {
        "code": "P4-V",
        "title": "Phase 4+ visualization atlas",
        "desc": "A dedicated figure atlas for the current report package, including figure role, canonical path, and raw source file references.",
        "files": "MD · HTML · PDF",
        "recommended_format": "PDF",
        "links": {
          "pdf": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.pdf",
          "html": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.html",
          "md": "reports/phase4-plus-package/PHASE4_PLUS_VISUALIZATION_ATLAS.md"
        }
      },
      {
        "code": "P4-I",
        "title": "Phase 4+ indexes and manifest",
        "desc": "Package index, image index, and manifest for the current bundle, including the figure-source audit used for handoff verification.",
        "files": "MD · JSON",
        "recommended_format": "MD",
        "links": {
          "md": "reports/phase4-plus-package/PACKAGE_INDEX.md",
          "json": "reports/phase4-plus-package/PACKAGE_MANIFEST.json"
        }
      },
      {
        "code": "ARC-O",
        "title": "Phase 1–3 archive overview",
        "desc": "The original three-phase overview remains available as the archive entry point for the earlier package.",
        "files": "MD · HTML · PDF",
        "recommended_format": "PDF",
        "links": {
          "pdf": "reports/advisor-package/LIFECAST_PROJECT_OVERVIEW.pdf",
          "html": "reports/advisor-package/LIFECAST_PROJECT_OVERVIEW.html",
          "md": "reports/advisor-package/LIFECAST_PROJECT_OVERVIEW.md"
        }
      },
      {
        "code": "P1",
        "title": "Phase 1 complete report",
        "desc": "Framework origin, theory anchor, and the densest single-phase report in the archive package.",
        "files": "MD · HTML · PDF",
        "recommended_format": "PDF",
        "links": {
          "pdf": "reports/advisor-package/PHASE1_COMPLETE_REPORT.pdf",
          "html": "reports/advisor-package/PHASE1_COMPLETE_REPORT.html",
          "md": "reports/advisor-package/PHASE1_COMPLETE_REPORT.md"
        }
      },
      {
        "code": "P2-M",
        "title": "Phase 2 complete report",
        "desc": "US replication, pooled 2003–2024 correction, and the methodological case against over-reading quick runs.",
        "files": "MD · HTML · PDF",
        "recommended_format": "PDF",
        "links": {
          "pdf": "reports/advisor-package/PHASE2_COMPLETE_REPORT.pdf",
          "html": "reports/advisor-package/PHASE2_COMPLETE_REPORT.html",
          "md": "reports/advisor-package/PHASE2_COMPLETE_REPORT.md"
        }
      },
      {
        "code": "P2-V",
        "title": "Phase 2 visualization report",
        "desc": "Ten-figure chain explaining baseline, pooled deltas, support-width, support-size, methodology sensitivity, and UK–US alignment.",
        "files": "MD · HTML · PDF",
        "recommended_format": "HTML",
        "links": {
          "pdf": "reports/advisor-package/PHASE2_VISUALIZATION_REPORT.pdf",
          "html": "reports/advisor-package/PHASE2_VISUALIZATION_REPORT.html",
          "md": "reports/advisor-package/PHASE2_VISUALIZATION_REPORT.md"
        }
      },
      {
        "code": "P3-M",
        "title": "Phase 3 complete report",
        "desc": "MTUS external validity with 42 A1 fine records, 105 B1 grouped full runs, and weighted cross-country aggregation.",
        "files": "MD · HTML · PDF",
        "recommended_format": "PDF",
        "links": {
          "pdf": "reports/advisor-package/PHASE3_COMPLETE_REPORT.pdf",
          "html": "reports/advisor-package/PHASE3_COMPLETE_REPORT.html",
          "md": "reports/advisor-package/PHASE3_COMPLETE_REPORT.md"
        }
      },
      {
        "code": "P3-V",
        "title": "Phase 3 visualization report",
        "desc": "Twelve-figure chain for country deltas, CI, grouped distributions, quick-to-full correction, and cross-phase closure.",
        "files": "MD · HTML · PDF",
        "recommended_format": "HTML",
        "links": {
          "pdf": "reports/advisor-package/PHASE3_VISUALIZATION_REPORT.pdf",
          "html": "reports/advisor-package/PHASE3_VISUALIZATION_REPORT.html",
          "md": "reports/advisor-package/PHASE3_VISUALIZATION_REPORT.md"
        }
      }
    ]
  }
};
