---
title: "Pulse-presence detection performance"
layout: project
---

# Pulse-presence detection performance

Accuracy, precision, recall, F1, and AUC at the two representative low-SNR operating points reported in the dissertation.

| SNR | Method | Accuracy | Precision | Recall | F1 | AUC |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| −18 dB | I/Q amplitude | 75.7% | 0.270 | 0.024 | 0.045 | 0.502 |
| −18 dB | STFT | 95.2% | 0.968 | 0.790 | 0.870 | 0.892 |
| −18 dB | SPWVD | 94.9% | 0.954 | 0.790 | 0.864 | 0.890 |
| −18 dB | FPD (ours) | **95.7%** | **0.988** | 0.828 | 0.901 | **0.912** |
| −18 dB | GLGCM | 81.3% | 0.804 | 0.999 | 0.891 | 0.875 |
| −18 dB | LPI-Net | 89.5% | 0.984 | 0.744 | 0.904 | 0.895 |
| −15 dB | I/Q amplitude | 76.1% | 0.303 | 0.025 | 0.047 | 0.504 |
| −15 dB | STFT | 98.2% | 0.977 | 0.931 | 0.953 | 0.963 |
| −15 dB | SPWVD | 98.1% | 0.984 | 0.918 | 0.950 | 0.957 |
| −15 dB | FPD (ours) | **98.3%** | **0.994** | 0.930 | 0.961 | **0.964** |
| −15 dB | GLGCM | 92.7% | 0.913 | 0.999 | 0.955 | 0.962 |
| −15 dB | LPI-Net | 96.1% | 0.982 | 0.942 | 0.962 | 0.961 |

Source: `thesis/chapters/03_detection_and_parameter_estimation/tables/pulse_detection_performance.tex`.
