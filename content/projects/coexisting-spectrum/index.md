---
layout: project
type: project
title: "이종 신호 공존 환경의 실시간 신호 인지·평가 시스템"
english_title: "Real-Time Signal Recognition in Coexisting Spectrum Environments"
slug: "coexisting-spectrum-signal-recognition"
order: 6
project_number: "06"
project_stage: "공존 신호 인지·실시간 평가 · 2021–현재"
research_year: "2021–현재"
hero_claim: "신호 공존 환경에서 이종 신호를 분리·인지하고, 실시간 처리와 자동 평가로 연결했습니다."
research_question: "여러 RF 신호가 동일 대역에서 공존하거나 중첩되는 환경에서 원하는 신호를 어떻게 탐지·식별·복조할 것인가?"
result_highlight: "신호 분리·인지 · 실시간 처리 · 자동 평가"
technology_tags:
  - Spectrum Sharing
  - Multi-Label Classification
  - RF Signal Identification
summary: "이종 RF 신호가 공존·중첩되는 환경에서 신호 분리·인지와 실시간 평가를 연결한 시스템 연구입니다."
links: []
tags:
  - signal identification
  - spectrum sharing
  - multi-label recognition
---

## 문제 정의

전자전과 주파수 공유 환경에서는 여러 RF 신호가 같은 대역에서 공존하거나 중첩됩니다. 관측된 신호에서 원하는 신호를 식별하고, 간섭과 공존 조건을 고려해 다음 신호처리 단계로 연결하는 것이 핵심 문제입니다.

![주파수 공유 시간 슬롯과 점유 구조](figures/spectrum-sharing-time-slots.png)

*시간 슬롯과 주파수 점유를 고려해야 하는 공존 환경*

![중첩된 LPI 레이더 신호 예시](figures/overlapped-lpi-radar-example.png)

*중첩 LPI 레이더 신호를 인지해야 하는 문제*

## 제안 방법

<div class="research-pipeline" aria-label="공존 주파수 환경 연구 흐름">
  <span>Signal input</span><b>→</b><span>Coexistence analysis</span><b>→</b><span>Signal identification</span><b>→</b><span>Multi-label recognition</span><b>→</b><span>Real-time evaluation</span>
</div>

- **Fading-based identification:** 페이딩 조건이 전파 식별과 주파수 공유 판단에 미치는 영향을 평가합니다.
- **Overlapped-signal recognition:** 이종 신호가 중첩되는 환경에서 원하는 신호와 간섭 신호를 구분합니다.
- **LPI multi-label recognition:** 중첩된 LPI 레이더 신호 인지를 위해 ResNeXt 기반 다중 라벨 분류를 적용합니다.

## 실제 검증

- **2021:** 페이딩 기반의 전파식별 방법과 주파수 공유 방법에 대한 평가 연구
- **2022–2023:** 이종 신호 중첩 환경 전파식별 방법과 주파수 공유방법에 대한 평가 연구
- **2023:** LPI 레이다 중첩 신호 인지를 위한 ResNeXt 기반 다중 라벨 분류 학회 발표

학회 발표와 ETRI 연구과제를 통해 공존 신호 분석에서 다중 라벨 인식과 실시간 평가 시스템으로 연구 범위를 확장했습니다.

![실시간 송수신 및 자동 평가 시스템](figures/realtime-evaluation-system.png)

*실시간 송수신과 자동 평가를 연결한 검증 시스템*

## 주요 결과

<div class="research-validation" aria-label="공존 신호 연구 결과">
  <span>신호 분리·인지</span><span>실시간 처리</span><span>자동 평가</span>
</div>

![실시간 평가 대시보드](figures/evaluation-dashboard.png)

*신호 인지 결과를 확인하는 웹 기반 실시간 평가 화면*

이 연구 축은 단일 파형 분류를 넘어, 중첩·공존 환경에서 신호를 식별하고 자동 평가까지 연결하는 실시간 신호 인지 시스템으로 확장되었습니다.

**관련 학회 발표** · LPI 레이다 중첩 신호 인지를 위한 ResNeXt 기반 다중 라벨 분류 · 한국통신학회 하계종합학술발표회 · 제주 · 2023.06

[수행 과제 전체 보기](../../research/#research-tasks)
