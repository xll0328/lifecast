#!/usr/bin/env python3
"""Extract real experiment results into data.js for the website."""
import json, os, glob

BASE = "/data/sony/Heyucheng/Yucheng_Project/results"

def load(path):
    try:
        with open(path) as f:
            return json.load(f)
    except Exception as e:
        print(f"WARN: {path}: {e}")
        return {}

# ── E1: all models × all channels ──────────────────────────────────────────
MODELS  = ["majority","naive_bayes","logistic","sgd","random_forest","xgboost","markov"]
CHANNELS = ["activity","enjoyment","location","with_whom"]

e1 = {}
for ch in CHANNELS:
    e1[ch] = {}
    for m in MODELS:
        path = f"{BASE}/a_class/E1/E1_A1_{ch}_to_{ch}_{m}.json"
        d = load(path)
        try:
            acc = d["metrics"][ch]["test"][f"{ch}_accuracy"]
            e1[ch][m] = round(acc * 100, 2)
        except:
            e1[ch][m] = None

# ── Bootstrap CI (income_bin, all channels) ────────────────────────────────
boot = load(f"{BASE}/bootstrap_ci/bootstrap_results.json")

# ── B-class: income_bin per channel ────────────────────────────────────────
INCOMES = ["low","mid","high"]
b_income = {}
for inc in INCOMES:
    d = load(f"{BASE}/b_class/income_bin/{inc}.json")
    b_income[inc] = {}
    for ch in CHANNELS:
        key = f"{ch}_accuracy"
        try:
            b_income[inc][ch] = round(d["channels"][ch][key] * 100, 2)
        except:
            b_income[inc][ch] = None

# ── B-class: econstat_broad per channel ────────────────────────────────────
ECONSTATS = ["employed","homemaker","retired","student","unemployed_sick"]
b_econstat = {}
for es in ECONSTATS:
    d = load(f"{BASE}/b_class/econstat_broad/{es}.json")
    b_econstat[es] = {}
    for ch in CHANNELS:
        key = f"{ch}_accuracy"
        try:
            b_econstat[es][ch] = round(d["channels"][ch][key] * 100, 2)
        except:
            b_econstat[es][ch] = None

# ── B-class: sex ────────────────────────────────────────────────────────────
SEXES = ["male","female"]
b_sex = {}
for s in SEXES:
    d = load(f"{BASE}/b_class/sex/{s}.json")
    b_sex[s] = {}
    for ch in CHANNELS:
        key = f"{ch}_accuracy"
        try:
            b_sex[s][ch] = round(d["channels"][ch][key] * 100, 2)
        except:
            b_sex[s][ch] = None

# ── Deep models b_class ─────────────────────────────────────────────────────
deep = load(f"{BASE}/deep_models_b_class/deep_models_b_class_results.json")
deep_income = {}
for inc in INCOMES:
    deep_income[inc] = {}
    try:
        mods = deep["income_bin"][inc]["models"]
        for m in ["sgd","lstm","gru","transformer"]:
            if m in mods and "accuracy" in mods[m]:
                deep_income[inc][m] = round(mods[m]["accuracy"] * 100, 2)
            else:
                deep_income[inc][m] = None
    except:
        pass

deep_econstat = {}
for es in ECONSTATS:
    deep_econstat[es] = {}
    try:
        mods = deep["econstat_broad"][es]["models"]
        for m in ["sgd","lstm","gru","transformer"]:
            if m in mods and "accuracy" in mods[m]:
                deep_econstat[es][m] = round(mods[m]["accuracy"] * 100, 2)
            else:
                deep_econstat[es][m] = None
    except:
        pass

# ── Error analysis: hourly error rates ─────────────────────────────────────
err = load(f"{BASE}/error_analysis/error_analysis_results.json")
hourly = err.get("hourly_error_rates", [])

# ── Bootstrap CI summary ────────────────────────────────────────────────────
boot_income_activity = {}
for inc in INCOMES:
    try:
        b = boot["income_bin"][inc]["activity"]
        boot_income_activity[inc] = {
            "mean": round(b["mean"]*100, 2),
            "ci_lower": round(b["ci_lower"]*100, 2),
            "ci_upper": round(b["ci_upper"]*100, 2),
        }
    except:
        pass

# ── Assemble output ─────────────────────────────────────────────────────────
DATA = {
    "e1": e1,
    "b_income": b_income,
    "b_econstat": b_econstat,
    "b_sex": b_sex,
    "deep_income": deep_income,
    "deep_econstat": deep_econstat,
    "hourly_errors": hourly,
    "boot_income_activity": boot_income_activity,
}

out = "const RESEARCH_DATA = " + json.dumps(DATA, indent=2) + ";\n"
with open("/data/sony/Heyucheng/lifecast-site/data.js", "w") as f:
    f.write(out)

print("data.js written successfully.")
print("E1 activity/sgd:", e1.get("activity",{}).get("sgd"))
print("b_income high activity:", b_income.get("high",{}).get("activity"))
print("deep high transformer:", deep_income.get("high",{}).get("transformer"))
