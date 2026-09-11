---
layout: project
type: project
title: "Vision-Language 기반 미지 레이더 신호 인식"
english_title: "SAVOR: Semantic Attribute-Guided Vision-Language Framework for Open-Set Radar Waveform Recognition"
slug: "semantic-open-set-radar"
order: 3
project_number: "03"
project_stage: "Vision-Language Open-Set Recognition · 2025–2026"
research_year: "2025–2026"
project_role: "VLM/CLIP 표현 설계 · open-set 평가"
hero_claim: "레이다 시간·주파수 패턴을 semantic attribute와 VLM/CLIP 표현에 정렬해 known classification과 unknown rejection을 함께 수행했습니다."
research_question: "known waveform과 구조적으로 유사한 unknown waveform을 semantic representation 기반으로 구분할 수 있는가?"
result_highlight: "AUC-OSCR 평균 약 +0.05 개선 · challenging low-SNR 환경 최대 약 +0.10"
technology_tags:
  - VLM / CLIP
  - SPWVD
  - Semantic Attribute
  - Open-Set Recognition
publication_refs:
  - /publications/semantic-attribute-guided-open-set-radar/
summary: "레이더 시간·주파수 표현과 semantic attribute를 VLM/CLIP embedding space에 정렬해 미지 파형을 거부한 연구입니다."
image:
  filename: figures/open-set-vlm-overview.png
  alt_text: "Vision-Language 기반 open-set 레이다 파형 인식 연구 개요"
  caption: "시간·주파수 특성과 의미 정보를 연결한 VLM 기반 open-set 인식 전체 구조"
links: []
tags:
  - VLM
  - CLIP
  - SPWVD
  - Open-Set Recognition
  - radar signal processing
---

## 연구 배경 및 문제 정의

Case 02에서는 reconstruction error를 이용해 unknown waveform을 탐지했습니다. 하지만 실제 레이다 파형은 frequency sweep, hopping, phase coding과 같은 구조적 특성을 부분적으로 공유하기 때문에, unknown waveform이라도 known waveform과 비슷하면 autoencoder가 비교적 잘 복원할 수 있습니다.

실제 시스템에서는 다음 두 가지를 동시에 수행해야 합니다.

- Known waveform은 올바른 class로 분류
- Unknown waveform은 미지 클래스로 거부

즉, 이 연구는 단순 분류가 아니라 Classification과 Unknown Rejection을 함께 수행하는 Open-set Recognition 문제를 다룹니다.

<div class="research-pipeline" aria-label="Open-set 레이다 파형 인식 문제 흐름">
  <span>Known / Unknown waveform</span><b>→</b><span>구조적 특성 공유</span><b>→</b><span>Known 분류와 Unknown 거부 충돌</span><b>→</b><span>Open-set 인식 필요</span>
</div>

## 연구 목표

저 SNR 환경에서 Known-class Recognition 성능을 유지하면서 Previously Unseen Radar Waveform을 안정적으로 Reject하는 것을 목표로 했습니다. 이를 위해 단순 class label 대신 파형이 가진 구조적·스펙트럼 의미 정보를 학습에 활용했습니다.

## 핵심 방법

<div class="research-pipeline" aria-label="SAVOR Vision-Language open-set 처리 흐름">
  <span>Radar I/Q</span><b>→</b><span>SPWVD Time-Frequency Image</span><b>+</b><span>Semantic Attribute Text</span><b>→</b><span>Vision-Language Embedding</span><b>→</b><span>Known Classification + Unknown Rejection</span>
</div>

{{< case-figure src="figures/open-set-vlm-overview.png" alt="레이다 시간·주파수 이미지와 semantic attribute text를 정렬하는 VLM 구조" type="Method" caption="그림 1. 레이다 시간·주파수 이미지와 semantic attribute text를 같은 embedding space에 정렬해 known waveform classification과 unknown rejection을 동시에 수행하는 전체 구조." description="파형의 이름이 아니라 시간·주파수 영상에 나타난 구조와 스펙트럼 의미를 언어 표현과 연결한 것이 핵심이다." >}}

Stage 1에서는 sweep direction, curvature, ridge continuity, hopping structure, spectral texture와 같은 구조적 패턴을 text description으로 구성하고 TFI와 정렬합니다. Stage 2에서는 Text-Driven Unknown(TDU)과 Image-space Virtual Unknown(IVU)을 이용해 known class 주변의 open space까지 학습합니다.

## 핵심 아이디어

1. **Class name 대신 radar semantic attribute를 사용했습니다.** “LFM”이라는 이름 자체보다 ascending linear trace, continuous energy ridge처럼 TFI에 실제 나타나는 구조적 특성을 언어로 표현했습니다.
2. **Text 공간에서 unknown 방향을 만들었습니다.** Generic time-frequency attribute를 기반으로 unknown semantic direction을 생성해 known class 밖의 의미 공간을 확장했습니다.
3. **Image 공간에서도 모호한 영역을 unknown으로 모델링했습니다.** Known class center 사이의 inter-class region에 virtual unknown을 생성해 클래스 경계 주변을 regularize했습니다.

{{< case-figure src="figures/stage2-unknown-learning.png" alt="Text-Driven Unknown과 Image-space Virtual Unknown 학습 구조" type="Method" caption="그림 2. Text-Driven Unknown과 Image-space Virtual Unknown을 이용해 known class 주변에 unknown representation을 학습하는 구조." description="Text side에서는 unknown space를 넓히고 image side에서는 known과 unknown의 경계를 분리하도록 설계했다." >}}

## 실제 검증

- **Open-set protocol:** Single-Unknown과 Two-Unknown 환경에서 known-class recognition과 unknown rejection을 함께 평가했습니다.
- **Channel conditions:** AWGN, Rayleigh fading, 실제 USRP measured wireless 환경까지 확장했습니다.
- **Evaluation:** AUC-OSCR, AUROC, AUPRC, FPR95, Known Accuracy를 함께 사용했습니다.

단순 accuracy만 비교하지 않고 unknown을 얼마나 안정적으로 거부하는지와 known class를 얼마나 유지하는지를 같은 조건에서 확인했습니다.

## 주요 성과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">+0.05</strong><span class="research-metric-label">AUC-OSCR average improvement</span></div>
  <div class="research-metric"><strong class="research-metric-value">+0.10</strong><span class="research-metric-label">challenging low-SNR 환경 최대 개선</span></div>
  <div class="research-metric"><strong class="research-metric-value">2</strong><span class="research-metric-label">Single-Unknown · Two-Unknown protocol</span></div>
</div>

{{< case-figure src="figures/known-unknown-performance.png" alt="Known waveform classification과 Unknown waveform rejection 성능 비교" type="Result" caption="그림 3. Known waveform classification과 Unknown waveform rejection을 함께 평가한 open-set 성능 결과." description="Known 성능을 유지하면서 unknown을 거부하는 open-set 인식의 효과를 비교한다." >}}

Known과 Unknown을 별도 문제로 나누지 않고 semantic representation 안에서 함께 다루면서, challenging low-SNR 조건에서도 baseline 대비 open-set 성능을 개선했습니다.

## 나의 기여 및 연구의 의미

레이더 시간·주파수 표현과 semantic attribute text를 구성하고, VLM/CLIP embedding space에 정렬하는 학습 흐름을 설계했습니다. TDU와 IVU를 이용한 Stage 2 unknown-aware learning을 구성하고 Single-Unknown, Two-Unknown 및 채널 변화 조건에서 평가했습니다.

Case 02가 known waveform memory와 reconstruction discrepancy로 unknown을 탐지했다면, 이 연구는 파형의 구조적 의미를 직접 표현 공간에 넣어 Known 분류와 Unknown 거부를 동시에 수행합니다. 이 표현은 이후 실제 수신 시스템에 올릴 알고리즘을 경량화하고 구현하는 단계로 이어집니다.

<div class="case-study-transition"><strong>다음 단계</strong>실제 FPGA 스트리밍 구현: Open-set 인식으로 확장된 레이다 신호처리 알고리즘을 수신 시스템 제약 안에서 검증합니다.</div>

<div class="case-study-publication">

## Publication

[SAVOR: Semantic Attribute-Guided Vision-Language Framework for Open-Set Radar Waveform Recognition](../../publications/semantic-attribute-guided-open-set-radar/) · *IEEE Transactions on Aerospace and Electronic Systems*

관련 발표: Joint Recognition of LPI Radar Signals Using a VLM with TFD-Text Alignment · ICNGC, 2025 · **Best Paper Award**

</div>
