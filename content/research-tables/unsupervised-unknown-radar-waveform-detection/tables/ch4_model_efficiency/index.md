---
title: "Unknown-detection model efficiency"
layout: project
---

# Unknown-detection model efficiency

Measured on an NVIDIA RTX 3090 GPU. These values are software/GPU measurements and are not FPGA resource counts.

| Model | Structure | Number of models | Model size (MB) | Parameters | MACs | Inference time (ms) | Memory usage (MB) |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| TDL | CNN + RF | 4 | 2.60 | 655.8k | 37.4M | 10.42 | 22.79 |
| TCN | AWS + TCN | 2 | 2.62 | 683.9k | 221.6M | 2.45 | 21.54 |
| Proposed | DSAE + MAAE | 2 | 3.06 | 1.0M | 790.5M | 3.04 | 36.00 |

Source: `thesis/chapters/04_unknown_waveform_detection/tables/model_efficiency.tex`.
