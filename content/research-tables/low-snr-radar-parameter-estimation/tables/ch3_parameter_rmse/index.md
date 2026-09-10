---
title: "Time-domain parameter-estimation RMSE"
layout: project
---

# Time-domain parameter-estimation RMSE

RMSE values are in microseconds. Lower is better.

| Parameter | Method | −16 dB | −12 dB | −8 dB |
| --- | --- | ---: | ---: | ---: |
| ToA | WHT | 378 | 203 | 162 |
| ToA | CPD | 405 | 211 | 114 |
| ToA | DAT-Net | 405 | 272 | 133 |
| ToA | Proposed without denoising | 475 | 479 | 278 |
| ToA | Proposed | **348** | **126** | **8** |
| PW | WHT | 593 | 331 | 245 |
| PW | CPD | 832 | 319 | 137 |
| PW | DAT-Net | 753 | 549 | 330 |
| PW | Proposed without denoising | 928 | 915 | 519 |
| PW | Proposed | **589** | **180** | **16** |
| PRI | WHT | 407 | 243 | 207 |
| PRI | CPD | 551 | 299 | 123 |
| PRI | DAT-Net | 521 | 425 | 230 |
| PRI | Proposed without denoising | 401 | 415 | 319 |
| PRI | Proposed | **400** | **159** | **6** |

Source: `thesis/chapters/03_detection_and_parameter_estimation/tables/time_parameter_rmse.tex`.
