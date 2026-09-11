---
layout: project
type: project
title: "Semantic VLM 기반 레이다 Open-Set Recognition"
english_title: "Semantic Attribute-Guided Open-Set Radar Waveform Recognition"
slug: "semantic-open-set-radar"
order: 2
project_number: "01-B"
project_stage: "Semantic Open-Set Recognition · 2025–2026"
research_year: "2025–2026"
hero_claim: "시간–주파수 구조와 semantic attribute를 Vision-Language 모델에 정렬해 known-class recognition과 unknown rejection을 함께 개선했습니다."
research_question: "레이다 파형의 구조와 스펙트럼 의미를 표현 공간에 반영해 unknown waveform을 거부할 수 있는가?"
result_highlight: "AUC-OSCR 평균 약 +0.05 개선 · challenging low-SNR 환경 최대 약 +0.10"
technology_tags:
  - VLM / CLIP
  - SPWVD
  - Semantic Attribute
  - Open-Set Recognition
publication_refs:
  - /publications/semantic-attribute-guided-open-set-radar/
summary: "SAVOR 기반 semantic attribute와 VLM/CLIP 정렬로 레이다 파형을 인식하고 미확인 파형을 거부한 연구입니다."
image:
  filename: figures/savor_architecture.png
  alt_text: SAVOR semantic attribute-guided open-set radar recognition
  caption: "SAVOR semantic attribute-guided Open-Set Recognition architecture"
links: []
tags:
  - VLM
  - CLIP
  - SPWVD
  - Open-Set Recognition
  - radar signal processing
---

## 연구 질문

레이다 파형의 시간–주파수 구조와 스펙트럼 특성을 semantic representation으로 표현하면, known class recognition과 unknown rejection을 동시에 개선할 수 있는가?

Reconstruction-based detection만으로 분리하기 어려운 유사 파형을 대상으로, 파형의 의미 정보를 Vision-Language 표현 공간에 정렬하는 연구로 확장했습니다.

## SAVOR 처리 흐름

<div class="research-pipeline" aria-label="SAVOR 처리 흐름">
  <span>Radar I/Q</span><b>↓</b><span>SPWVD</span><b>↓</b><span>Time-frequency image</span><b>+</b><span>Structural pattern · Spectral characteristics</span><b>↓</b><span>Vision-Language alignment</span><b>↓</b><span>Known classification + unknown rejection</span>
</div>

## 핵심 방법

단순 class label 대신 레이다 시간–주파수 영상의 **구조적 패턴과 스펙트럼 특성**을 semantic attribute로 표현합니다.

1. **Known-class semantic alignment:** known waveform의 image-text alignment를 학습합니다.
2. **Unknown-aware representation:** **TDU(Text-Driven Unknown Modeling)**와 **IVU(Image-Space Virtual Unknown Modeling)**를 이용해 unknown-aware representation을 구성합니다.
3. **Open-set decision:** known-class recognition 성능을 유지하면서 unknown waveform을 별도 영역으로 거부합니다.

![SAVOR semantic attribute-guided framework](figures/savor_architecture.png)

## 대표 결과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">+0.05</strong><span class="research-metric-label">AUC-OSCR average improvement</span></div>
  <div class="research-metric"><strong class="research-metric-value">+0.10</strong><span class="research-metric-label">Maximum gain in challenging low-SNR settings</span></div>
  <div class="research-metric"><strong class="research-metric-value">3</strong><span class="research-metric-label">AWGN · fading · measured validation settings</span></div>
</div>

<div class="research-validation" aria-label="검증 환경">
  <span>AWGN</span><span>Rayleigh Fading</span><span>Measured Wireless</span><span>USRP OTA</span>
</div>

## 연구 의의

목표는 단순히 더 많이 거부하는 것이 아니라, **known-class recognition과 unknown rejection 사이의 trade-off**를 개선하는 것입니다. 이 연구는 레이다 신호처리를 semantic VLM 표현 학습과 연결하고, 이후 경량화와 실시간 구현으로 확장할 수 있는 기반을 마련했습니다.

## 관련 연구 기록

[SAVOR: Semantic Attribute-Guided Vision-Language Framework for Open-Set Radar Waveform Recognition](../../publications/semantic-attribute-guided-open-set-radar/) · *IEEE Transactions on Aerospace and Electronic Systems*

Joint Recognition of LPI Radar Signals Using a VLM with TFD-Text Alignment · ICNGC, 2025 · Best Paper Award
