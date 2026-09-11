---
layout: project
type: project
title: "미확인 레이다 파형 탐지 및 Open-Set 인식"
english_title: "Unknown Radar Waveform Detection & Open-Set Recognition"
slug: "unknown-open-set-recognition"
aliases:
  - /projects/heterogeneous-signal-identification/
  - /projects/radar-communication-recognition/
  - /projects/unsupervised-unknown-radar-waveform-detection/
  - /projects/savor-open-set-radar-waveform-recognition/
project_number: "01"
project_stage: "미확인 파형 탐지·Open-Set Recognition 연구 · 2022–2026"
research_year: "2022–2026"
hero_claim: "DSAE-MAAE 기반 reconstruction 방식에서 출발해, semantic VLM 기반 Open-Set Recognition으로 확장한 연구입니다."
research_question: "학습에 없던 파형이 입력되었을 때, known waveform은 정확히 분류하면서 unknown waveform을 기존 class로 오분류하지 않고 거부할 수 있는가?"
result_highlight: "AUC-OSCR 평균 약 +0.05 개선 · challenging low-SNR 환경 최대 약 +0.10"
technology_tags:
  - DSAE-MAAE
  - VLM / CLIP
  - CWD / SPWVD
  - Open-Set Recognition
publication_refs:
  - /publications/unknown-radar-waveform-detection/
  - /publications/semantic-attribute-guided-open-set-radar/
summary: "저 SNR 환경의 미확인 레이다 파형 탐지에서 출발해, 시간–주파수 구조와 semantic attribute를 활용하는 Open-Set Recognition으로 확장한 연구 흐름입니다."
image:
  filename: figures/savor_architecture.png
  alt_text: SAVOR semantic attribute-guided vision-language framework
  caption: "DSAE-MAAE 기반 미확인 파형 탐지에서 semantic Open-Set Recognition으로 확장한 연구 흐름"
links: []
tags:
  - unknown waveform detection
  - open-set recognition
  - DSAE-MAAE
  - VLM
  - radar signal processing
---

## 연구 질문

학습에 없던 파형이 입력되었을 때, **known waveform은 정확히 분류하면서 unknown waveform을 기존 class로 오분류하지 않고 거부할 수 있는가?**

이 질문을 **binary unknown detection**에서 시작해 **known-class recognition + unknown rejection** 문제로 확장했습니다. 첫 번째 연구는 reconstruction discrepancy로 미확인 파형을 탐지하고, 두 번째 연구는 파형의 구조와 스펙트럼 의미를 표현 공간에 반영합니다.

## 연구 발전 과정

<div class="research-timeline" aria-label="연구 발전 과정">
  <div class="research-timeline-item"><strong>2022</strong><span>Autoencoder 기반 미확인 레이다 파형 탐지</span></div>
  <div class="research-timeline-item"><strong>2025</strong><span>DSAE-MAAE: 비지도 denoising과 memory 기반 미확인 파형 탐지</span></div>
  <div class="research-timeline-item"><strong>2025</strong><span>VLM과 TFD–Text Alignment를 활용한 파형 인식</span></div>
  <div class="research-timeline-item"><strong>2026</strong><span>SAVOR: semantic attribute, TDU, IVU 기반 Open-Set Recognition</span></div>
</div>

## Study 1 · Reconstruction-Based Unknown Detection

### 처리 흐름

<div class="research-pipeline" aria-label="DSAE MAAE 처리 흐름">
  <span>Radar I/Q</span><b>↓</b><span>CWD time-frequency representation</span><b>↓</b><span>DSAE</span><b>↓</b><span>Noise-suppressed representation</span><b>↓</b><span>MAAE</span><b>↓</b><span>Memory-based reconstruction</span><b>↓</b><span>Reconstruction discrepancy</span><b>↓</b><span>Known / Unknown</span>
</div>

### 핵심 방법

- **DSAE:** clean reference 없이 noisy input만으로 저 SNR 레이다 파형의 구조적 특징을 보존하면서 noise를 억제합니다.
- **MAAE:** known waveform pattern을 memory로 학습하고 known / unknown 간 reconstruction discrepancy를 이용해 미확인 파형을 탐지합니다.
- reconstruction discrepancy를 연속적인 score로 사용해 운영 환경의 false-alarm과 missed-detection trade-off를 조정합니다.

![DSAE–MAAE framework](figures/dsae_maae_framework.png)

[DSAE–MAAE framework PDF](figures/dsae_maae_framework.pdf) · [Denoising comparison](figures/denoising_method_comparison.pdf) · [AUC result](figures/one_vs_rest_auc_9_waveforms.pdf)

### 대표 결과

- **5-waveform:** SNR ≥ −12 dB에서 AUC > 0.77
- **9-waveform:** SNR ≥ −10 dB에서 AUC > 0.78

<div class="research-validation" aria-label="검증 환경">
  <span>AWGN</span><span>Rayleigh Fading</span><span>Measured Wireless</span>
</div>

## 다음 연구가 필요했던 이유

Reconstruction-based detection은 known waveform pattern에서 벗어난 입력을 탐지하는 데 효과적입니다.

그러나 unknown waveform이 known class와 유사한 **frequency sweep, hopping pattern, time-frequency structure**를 공유하는 경우 reconstruction discrepancy만으로는 충분히 분리하기 어렵습니다.

이를 해결하기 위해 semantic representation 기반 **Open-Set Recognition**으로 연구를 확장했습니다.

## Study 2 · Semantic Open-Set Radar Waveform Recognition

### SAVOR 처리 흐름

<div class="research-pipeline" aria-label="SAVOR 처리 흐름">
  <span>Radar I/Q</span><b>↓</b><span>SPWVD</span><b>↓</b><span>Time-frequency image</span><b>+</b><span>Structural pattern · Spectral characteristics</span><b>↓</b><span>Vision-Language alignment</span><b>↓</b><span>Known classification + unknown rejection</span>
</div>

단순 class label 대신 레이다 시간–주파수 영상의 **구조적 패턴과 스펙트럼 특성**을 semantic attribute로 표현합니다.

1. **Stage 1 · Known-class semantic alignment:** known waveform의 image-text alignment를 학습합니다.
2. **Stage 2 · Unknown-aware representation:** **TDU(Text-Driven Unknown Modeling)**와 **IVU(Image-Space Virtual Unknown Modeling)**를 이용해 unknown-aware representation을 구성합니다.

![SAVOR semantic attribute-guided framework](figures/savor_architecture.png)

[SAVOR framework PDF](figures/savor_architecture.pdf) · [Unknown-aware learning](figures/unknown_aware_learning.pdf) · [Channel AUC-OSCR](figures/channel_auc_oscr.png)

### 대표 결과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">+0.05</strong><span class="research-metric-label">AUC-OSCR 평균 개선</span></div>
  <div class="research-metric"><strong class="research-metric-value">+0.10</strong><span class="research-metric-label">challenging low-SNR 환경 최대 개선</span></div>
</div>

<div class="research-validation" aria-label="검증 환경">
  <span>AWGN</span><span>Rayleigh Fading</span><span>Measured Wireless</span><span>USRP OTA</span>
</div>

목표는 단순히 더 많이 거부하는 것이 아니라, known-class recognition과 unknown rejection 사이의 trade-off를 개선하는 것입니다.

## 별도의 시스템 구현 연구

이와 병행한 별도의 시스템 구현 연구에서는 대표적인 **STFT detector–CNN classifier** 체인을 RFNoC/FPGA에 구현하여, OTA 환경에서 레이다 처리 알고리즘의 하드웨어 적용 가능성을 검증했습니다.

## 관련 논문 및 학회 발표

- Jaehyeok Yoon and Haewoon Nam, “[Unsupervised Unknown Radar Waveform Detection](../../publications/unknown-radar-waveform-detection/),” *IEEE Transactions on Aerospace and Electronic Systems*, vol. 61, no. 6, pp. 19316–19328, 2025. [DOI](https://doi.org/10.1109/TAES.2025.3618820)
- Jaehyeok Yoon and Haewoon Nam, “[SAVOR: Semantic Attribute-Guided Vision-Language Framework for Open-Set Radar Waveform Recognition](../../publications/semantic-attribute-guided-open-set-radar/),” *IEEE Transactions on Aerospace and Electronic Systems*, under revision.
- Jaehyeok Yoon, Haewoon Nam, and Jaerock Kwon (2025.12). “Joint Recognition of LPI Radar Signals Using a VLM with TFD-Text Alignment.” ICNGC, Da Nang, Vietnam. Best Paper Award.
- 윤재혁, 남해운 (2026.02.04). “지도 학습 기반 CLIP을 활용한 레이다 신호 스펙트로그램 식별.” 2026년도 한국통신학회 동계종합학술발표회, 용평.
