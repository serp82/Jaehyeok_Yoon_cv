---
layout: project
type: project
title: "OFDM 수신 및 레이더 간섭 제거"
english_title: "OFDM Reception and Radar Interference Removal"
slug: "ofdm-interference-removal"
order: 5
project_number: "05"
project_stage: "Radar–Communication Coexistence · 2024–현재"
research_year: "2024–현재"
hero_claim: "레이더와 통신 신호가 동일 대역에서 공존하는 환경에서 OFDM 수신 체인과 신호 분리 방법을 구현해 통신 신호를 복원했습니다."
research_question: "레이더와 통신 신호가 동일 대역에서 중첩될 때 OFDM 신호를 안정적으로 수신·복조할 수 있는가?"
result_highlight: "DJI OcuSync 기반 OFDM 신호 복조 구현 · 레이더 간섭 제거 연구"
technology_tags:
  - OFDM
  - DJI OcuSync
  - Interference Removal
  - Signal Demodulation
summary: "실제 연구과제에서 OFDM 드론 신호 복조와 레이더 간섭 제거를 연결한 수신 신호처리 연구입니다."
image:
  filename: figures/ofdm-processing-chain.png
  alt_text: OFDM reception and radar interference removal processing chain
  caption: "OFDM 수신·동기화·신호 분리·복원으로 이어지는 전체 처리 흐름"
links: []
tags:
  - OFDM
  - DJI OcuSync
  - interference removal
  - signal demodulation
---

## 문제 정의

전자전·주파수 공존 환경에서는 레이다 신호와 통신 신호가 같은 대역에서 중첩될 수 있습니다. 이때 통신 신호의 구조를 보존하면서 레이다 간섭을 분리하고, OFDM 수신·복조 단계까지 연결하는 수신 체인이 필요합니다.

![OFDM 드론 신호와 레이더 간섭이 존재하는 실험 환경](figures/experimental-signal-acquisition.png)

*드론 OFDM 신호와 레이더 간섭이 함께 관측되는 실험 환경*

## 제안 방법

<div class="research-pipeline" aria-label="OFDM 수신 및 레이다 간섭 제거 흐름">
  <span>OFDM 수신</span><b>→</b><span>동기화·구조 분석</span><b>→</b><span>중첩 신호 식별</span><b>→</b><span>레이다 간섭 제거</span><b>→</b><span>OFDM 복조</span>
</div>

- DJI OcuSync 프로토콜 기반 OFDM 신호의 구조를 분석하고 수신 처리 흐름을 구성합니다.
- 레이더와 통신 신호가 중첩되는 조건에서 관측 신호를 분석하고 간섭 성분을 제거하는 방향으로 처리합니다.
- 신호 수신부터 복조까지 이어지는 실제 신호처리 구현을 통해 알고리즘과 시스템 적용 사이의 연결을 확인합니다.

![U-Net 기반 신호 분리 구조](figures/unet-interference-separation.png)

*U-Net 기반 레이더·통신 중첩 신호 분리 구조*

## 실제 검증

- **연구과제:** DJI OcuSync 프로토콜 기반의 OFDM 드론 신호 복조 구현
- **수행기관:** 엘아이지넥스원 (LIG)
- **기간:** 2024.03–현재
- **검증 범위:** OFDM 신호 수신·복조 구현과 레이다 간섭 제거를 위한 신호처리 체인

실제 프로토콜 기반 OFDM 신호를 대상으로 수신 및 복조 연구를 수행했습니다.

## 주요 결과

<div class="research-validation" aria-label="OFDM 수신 연구 결과">
  <span>OFDM 수신</span><span>레이다 간섭 제거</span><span>DJI OcuSync 복조</span>
</div>

![간섭 제거 전후 OFDM 복원 결과](figures/interference-removal-output.png)

*간섭 제거 전후의 OFDM 신호 복원 결과*

DJI OcuSync 프로토콜 기반 OFDM 드론 신호 복조 구현을 통해 공존 신호 환경의 수신 처리 연구를 실제 신호처리 체인으로 확장했습니다.

[관련 수행 과제 보기](../../rd-projects/)
