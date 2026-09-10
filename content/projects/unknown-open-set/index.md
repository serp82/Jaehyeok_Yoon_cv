---
layout: project
type: project
title: "Unknown Radar Waveform Detection & Open-Set Recognition"
slug: "unknown-open-set-recognition"
project_number: "01"
project_stage: "Featured research line · 2022–2026"
korean_title: "저 SNR 환경의 미확인 레이더 파형 탐지 및 Open-Set 인식"
research_year: "2022–2026"
hero_claim: "From reconstruction-based unknown detection to semantic open-set recognition with DSAE–MAAE and VLM/SAVOR."
research_question: "학습 과정에서 보지 못한 레이더 파형을 기존 파형으로 오분류하지 않고 탐지·인식할 수 있는가?"
result_highlight: "DSAE–MAAE AUC > 0.77 / 0.78 · SAVOR AUC-OSCR +0.05 average, up to +0.10"
technology_tags:
  - DSAE–MAAE
  - VLM / CLIP
  - CWD / SPWVD
  - Open-Set Recognition
project_statuses:
  - label: "IEEE TAES · 게재 (2025)"
    class: published
  - label: "SAVOR · Under Revision"
    class: revision
summary: "DSAE–MAAE 기반의 미확인 파형 탐지에서 출발해, 레이더 time-frequency 구조를 semantic attribute로 표현하고 VLM과 정렬하는 SAVOR open-set recognition으로 확장한 연구 흐름입니다."
image:
  filename: figures/savor_architecture.png
  alt_text: SAVOR semantic attribute-guided vision-language framework
  caption: "Reconstruction-based unknown detection evolving into semantic open-set recognition."
links: []
tags:
  - unknown waveform detection
  - open-set recognition
  - DSAE
  - MAAE
  - VLM
  - radar signal processing
---

## Research question

학습 과정에서 보지 못한 레이더 파형을 기존 파형으로 오분류하지 않고 탐지·인식할 수 있는가?

이 질문을 **binary unknown detection**에서 시작해 **known-class recognition + unknown rejection** 문제로 확장했습니다. 첫 번째 연구는 재구성 오차로 미확인 파형을 걸러내고, 두 번째 연구는 파형의 구조와 스펙트럼 의미를 표현 공간에 반영합니다.

## Research evolution

<div class="research-timeline" aria-label="Research evolution">
  <div class="research-timeline-item"><strong>2022</strong><span>Autoencoder-based unknown radar detection</span></div>
  <div class="research-timeline-item"><strong>2025</strong><span>DSAE–MAAE: unsupervised denoising and memory-based unknown detection</span></div>
  <div class="research-timeline-item"><strong>2025</strong><span>VLM with TFD–Text Alignment</span></div>
  <div class="research-timeline-item"><strong>2026</strong><span>SAVOR: semantic attributes, TDU, and IVU for open-set recognition</span></div>
</div>

## Study 01 · Reconstruction-Based Unknown Detection

### Pipeline

<div class="research-pipeline" aria-label="DSAE MAAE pipeline">
  <span>Radar I/Q</span><b>↓</b><span>CWD time-frequency representation</span><b>↓</b><span>DSAE</span><b>↓</b><span>Noise-suppressed representation</span><b>↓</b><span>MAAE memory reconstruction</span><b>↓</b><span>Reconstruction discrepancy</span><b>↓</b><span>Known / Unknown</span>
</div>

### Core idea

- **DSAE:** clean reference 없이 noisy input만 사용해 저 SNR radar waveform feature를 보존하면서 noise를 억제합니다.
- **MAAE:** known waveform pattern을 memory로 학습하고 known / unknown reconstruction difference를 이용해 unknown을 탐지합니다.
- 두 단계의 reconstruction discrepancy를 continuous score로 사용해 운영 환경의 false-alarm과 missed-detection trade-off를 조정합니다.

![DSAE–MAAE framework](figures/dsae_maae_framework.png)

[Open the DSAE–MAAE framework PDF](figures/dsae_maae_framework.pdf) · [Denoising comparison](figures/denoising_method_comparison.pdf) · [AUC result](figures/one_vs_rest_auc_9_waveforms.pdf)

### Reported results

- **5-waveform:** AUC > 0.77 for SNR ≥ −12 dB
- **9-waveform:** AUC > 0.78 for SNR ≥ −10 dB
- AWGN, Rayleigh fading, and measured wireless conditions에서 평가했습니다.

## Why was another approach needed?

Reconstruction-based detection은 파형이 known library에 속하는지 여부를 판별하는 데 유용하지만, 미확인 파형의 semantic class까지 설명하지는 않습니다. 또한 unknown waveform이 known waveform과 부분적인 구조를 공유하면 단순 reconstruction discrepancy만으로는 열린 공간(open space)을 충분히 표현하기 어렵습니다.

이 한계에서 다음 연구 질문이 나옵니다.

> 알려진 파형의 구조적·스펙트럼적 의미를 표현 공간에 넣으면, known classification과 unknown rejection을 함께 개선할 수 있는가?

## Study 02 · Semantic Open-Set Radar Waveform Recognition

### SAVOR pipeline

<div class="research-pipeline" aria-label="SAVOR pipeline">
  <span>Radar I/Q</span><b>↓</b><span>SPWVD time-frequency image</span><b>+</b><span>Structural pattern + spectral characteristics</span><b>↓</b><span>CLIP-based vision-language alignment</span><b>↓</b><span>Known classification + unknown rejection</span>
</div>

단순 class label 대신 레이더 waveform의 **structural pattern + spectral characteristics**를 text semantic information으로 구성합니다.

1. **Stage 1:** known-class semantic alignment
2. **Stage 2:** unknown-aware representation learning
   - **TDU:** Text-Driven Unknown Modeling
   - **IVU:** Image-Space Virtual Unknown Modeling

![SAVOR semantic attribute-guided framework](figures/savor_architecture.png)

[Open the SAVOR framework PDF](figures/savor_architecture.pdf) · [Unknown-aware learning](figures/unknown_aware_learning.pdf) · [Channel AUC-OSCR](figures/channel_auc_oscr.png)

### Reported results

- AUC-OSCR improvement은 평균 약 **+0.05**, challenging low-SNR 조건에서 최대 약 **+0.10**으로 보고되었습니다.
- AWGN, Rayleigh fading, measured wireless / USRP 환경에서 검증되었습니다.
- 목표는 단순히 더 많이 거부하는 것이 아니라, known-class recognition과 unknown rejection 사이의 trade-off를 개선하는 것입니다.

## Publications and related conference work

- [Unsupervised Unknown Radar Waveform Detection](../../publications/unknown-radar-waveform-detection/) · *IEEE Transactions on Aerospace and Electronic Systems* · 게재
- [SAVOR: Semantic Attribute-Guided Vision-Language Framework for Open-Set Radar Waveform Recognition](../../publications/semantic-attribute-guided-open-set-radar/) · *IEEE Transactions on Aerospace and Electronic Systems* · Under Revision
- Joint Recognition of LPI Radar Signals Using a VLM with TFD-Text Alignment · ICNGC, 2025 · 우수논문상
- 지도 학습 기반 CLIP을 활용한 레이더 신호 스펙트로그램 식별 · 한국통신학회 동계종합학술발표회, 2026

## Research continuation

이 연구 흐름은 미확인 파형을 단순히 거부하는 단계에서, 파형의 의미 속성을 이용해 known / unknown 경계를 학습하는 단계로 확장되었습니다. 이후에는 이 표현 학습 결과를 SDR/FPGA 기반 실시간 처리 체인과 연결하는 방향으로 이어집니다.
