---
layout: project
type: project
title: "DSAE–MAAE 기반 미확인 레이다 파형 탐지"
english_title: "DSAE–MAAE-Based Unknown Radar Waveform Detection"
slug: "dsae-maae-unknown-radar"
order: 1
project_number: "01-A"
project_stage: "Reconstruction-Based Unknown Detection · 2022–2025"
research_year: "2022–2025"
hero_claim: "비지도 denoising과 memory-based reconstruction을 결합해 저 SNR 레이다 파형의 구조를 복원하고 미확인 입력을 탐지했습니다."
research_question: "known waveform pattern을 학습한 뒤, 입력 파형이 known인지 unknown인지 reconstruction discrepancy로 구분할 수 있는가?"
result_highlight: "5-waveform AUC > 0.77 @ SNR ≥ −12 dB · 9-waveform AUC > 0.78 @ SNR ≥ −10 dB"
technology_tags:
  - DSAE
  - MAAE
  - CWD
  - Unknown Detection
publication_refs:
  - /publications/unknown-radar-waveform-detection/
summary: "DSAE와 MAAE를 이용해 저 SNR 레이다 파형을 복원하고 reconstruction discrepancy로 미확인 파형을 탐지한 연구입니다."
image:
  filename: figures/dsae_maae_framework.png
  alt_text: DSAE MAAE framework for unknown radar waveform detection
  caption: "DSAE–MAAE 기반 미확인 레이다 파형 탐지 프레임워크"
links: []
tags:
  - DSAE
  - MAAE
  - unknown waveform detection
  - radar signal processing
---

## 연구 질문

학습에 없던 파형이 입력되었을 때, **known waveform은 정확히 유지하면서 unknown waveform을 기존 class로 오분류하지 않고 거부할 수 있는가?**

저 SNR 수신 환경에서 파형의 구조를 먼저 복원하고, 복원 결과와 known waveform memory의 차이를 이용해 미확인 파형을 탐지하는 방향으로 접근했습니다.

## 처리 흐름

<div class="research-pipeline" aria-label="DSAE MAAE 처리 흐름">
  <span>Radar I/Q</span><b>↓</b><span>CWD time-frequency representation</span><b>↓</b><span>DSAE</span><b>↓</b><span>Noise-suppressed representation</span><b>↓</b><span>MAAE</span><b>↓</b><span>Memory-based reconstruction</span><b>↓</b><span>Known / Unknown</span>
</div>

## 핵심 방법

- **DSAE:** clean reference 없이 noisy input만으로 저 SNR 레이다 파형의 구조적 특징을 보존하면서 noise를 억제합니다.
- **MAAE:** known waveform pattern을 memory로 학습하고 known / unknown 간 reconstruction discrepancy를 이용해 미확인 파형을 탐지합니다.
- reconstruction discrepancy를 연속적인 score로 사용해 운영 환경의 false-alarm과 missed-detection trade-off를 조정합니다.

![DSAE–MAAE framework](figures/dsae_maae_framework.png)

## 실험 구성

- **5-waveform setting:** known waveform과 미확인 waveform을 구분하는 binary unknown detection
- **9-waveform setting:** 여러 known waveform에 대한 one-vs-rest 확장
- **검증 환경:** AWGN · Rayleigh Fading · Measured Wireless

## 대표 결과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">0.77+</strong><span class="research-metric-label">5-waveform AUC @ SNR ≥ −12 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">0.78+</strong><span class="research-metric-label">9-waveform AUC @ SNR ≥ −10 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">3</strong><span class="research-metric-label">AWGN · fading · measured validation settings</span></div>
</div>

## 연구 의의

이 연구는 분류기의 confidence만으로 unknown을 판단하는 대신, **파형을 얼마나 일관되게 복원할 수 있는가**를 기준으로 미확인 입력을 탐지합니다. 이후 semantic attribute와 Vision-Language 표현을 활용하는 Open-Set Recognition 연구로 확장하는 출발점이 되었습니다.

## 관련 논문

[Unsupervised Denoising for Unknown Radar Waveform Detection](../../publications/unknown-radar-waveform-detection/) · *IEEE Transactions on Aerospace and Electronic Systems*
