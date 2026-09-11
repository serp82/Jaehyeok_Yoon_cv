---
layout: project
type: project
title: "저 SNR 레이다 신호 검출 및 제원 추정"
english_title: "High-Accuracy Radar Parameter Estimation Under Low SNR Environments"
slug: "low-snr-radar-parameter-estimation"
aliases:
  - /projects/radar-waveform-estimation/
order: 2
project_number: "02"
project_stage: "신호 검출·제원 추정 연구 · 2021–2025"
research_year: "2021–2025"
hero_claim: "주파수 영역 pulse detection, STFT denoising, CCA 기반 edge detection을 결합해 저 SNR 레이다 제원을 추정했습니다."
research_question: "잡음에 묻힌 레이다 펄스의 위치와 경계를 찾아 주요 신호 제원을 얼마나 안정적으로 추정할 수 있는가?"
result_highlight: "FPD AUC 0.912 @ −18 dB · 0.964 @ −15 dB"
technology_tags:
  - STFT
  - UNet
  - CCA
  - USRP / GNU Radio
publication_refs:
  - /publications/lpi-radar-parameter-estimation/
summary: "저 SNR 환경에서 펄스 검출과 잡음 제거를 결합해 레이다 신호의 시간·주파수 제원을 추정하는 연구입니다."
image:
  filename: figures/processing_framework.png
  alt_text: Low-SNR pulse detection and parameter-estimation framework
  caption: "Frequency-domain pulse detection, STFT denoising, and edge-based parameter estimation"
links: []
tags:
  - pulse detection
  - parameter estimation
  - STFT
  - UNet
  - CCA
  - USRP/GNU Radio
---

## 연구 질문

잡음에 묻힌 레이다 펄스의 위치와 경계를 찾아 주요 신호 제원을 얼마나 안정적으로 추정할 수 있는가?

저 SNR 환경에서는 pulse edge가 noise에 묻혀 ToA, PW, PRI뿐 아니라 BW와 Fc의 추정 오차도 증가합니다. 이를 위해 주파수 영역 pulse detection, STFT, UNet denoising, CCA-based edge detection을 결합한 통합 제원 추정 구조를 설계했습니다.

## 제안 방법

<div class="research-pipeline" aria-label="저 SNR 제원 추정 처리 흐름">
  <span>Received I/Q</span><b>↓</b><span>Frequency-domain pulse detection</span><b>↓</b><span>Pulse interval localization</span><b>↓</b><span>STFT</span><b>↓</b><span>UNet denoising</span><b>↓</b><span>CCA edge detection</span><b>↓</b><span>ToA · PW · PRI · BW · Fc</span>
</div>

1. 수신 I/Q stream을 고정된 non-overlapping time slot으로 나눕니다.
2. **FPD(Frequency-domain Pulse Detection)**로 각 구간에 pulse energy가 포함되는지 판단합니다.
3. pulse 구간만 localized STFT로 변환하고, 시간·주파수 해상도에 맞게 학습한 UNet denoiser를 적용합니다.
4. **CCA(Connected-Component Analysis)**로 고립된 성분을 제거하고 시간·주파수 edge를 추출합니다.
5. 복원된 경계에서 ToA, PW, PRI, BW, Fc를 계산합니다.

![Edge-based parameter computation](figures/edge_based_parameter_estimation.png)

[고해상도 처리 구조 PDF](figures/edge_based_parameter_estimation.pdf)

## 실험 구성

- **Simulation:** 17종 intrapulse-modulation waveform, 500 kHz sampling rate
- **Pulse / SNR:** pulse width 1–10 ms, duty cycle 20%, SNR −20–10 dB
- **Data:** waveform·SNR별 100개 pulse train, 총 52,700개, train/validation/test = 8:1:1
- **OTA test-bed:** GNU Radio로 제어한 USRP-2920 2대, center frequency 910 MHz, sampling rate 500 kHz
- **검증 환경:** Simulation · USRP · GNU Radio test-bed

## 대표 결과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">0.912</strong><span class="research-metric-label">FPD AUC @ −18 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">0.964</strong><span class="research-metric-label">FPD AUC @ −15 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">8 · 16 · 6 μs</strong><span class="research-metric-label">ToA · PW · PRI RMSE @ −8 dB</span></div>
</div>

FPD는 −18 dB에서 AUC **0.912**, −15 dB에서 AUC **0.964**를 기록했습니다. −8 dB 조건에서 시간영역 제원 추정 RMSE는 ToA 8 μs, PW 16 μs, PRI 6 μs였습니다.

![Pulse-presence AUC](figures/pulse_detection_auc.png)

[AUC 결과 PDF](figures/pulse_detection_auc.pdf) · [전체 pulse-detection 표](../../research-tables/low-snr-radar-parameter-estimation/tables/ch3_pulse_detection/) · [전체 parameter-RMSE 표](../../research-tables/low-snr-radar-parameter-estimation/tables/ch3_parameter_rmse/)

## 연구 의의

slot-level observability를 먼저 확보한 뒤, pulse가 존재하는 구간에만 고해상도 STFT와 denoising 연산을 집중합니다. 이 구조로 저 SNR 수신 환경에서 후속 제원 추정에 필요한 펄스 경계를 안정적으로 복원합니다.

## 관련 논문

[High-Accuracy Radar Parameter Estimation Under Low SNR Environments](../../publications/lpi-radar-parameter-estimation/) · *IEEE Access*, 2025
