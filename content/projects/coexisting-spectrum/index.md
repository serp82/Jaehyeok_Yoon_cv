---
layout: project
type: project
title: "중첩 레이더 신호 인지"
english_title: "Overlapped Radar Signal Recognition"
slug: "coexisting-spectrum-signal-recognition"
order: 6
project_number: "06"
project_stage: "중첩 레이더 신호 인지 · 2021–현재"
research_year: "2021–현재"
hero_claim: "여러 LPI 레이더 신호가 중첩된 수신 환경에서 개별 파형의 존재를 동시에 인지하는 방법을 연구했습니다."
research_question: "여러 레이더 신호가 같은 시간·주파수 구간에서 중첩될 때, 각 신호의 존재를 어떻게 동시에 인지할 것인가?"
result_highlight: "중첩 신호 인지 · 다중 라벨 분류 · LPI 레이더 분석"
technology_tags:
  - LPI Radar
  - Multi-Label Classification
  - ResNeXt
  - Time-Frequency Representation
summary: "여러 LPI 레이더 신호가 중첩된 환경에서 개별 파형의 존재를 동시에 인지하기 위한 다중 라벨 분류 연구입니다."
links: []
tags:
  - overlapped radar signal
  - LPI radar
  - multi-label recognition
---

## 연구 배경과 필요성

LPI(Low Probability of Intercept) 레이더는 낮은 송신 전력과 다양한 파형 설계를 사용하기 때문에 수신 신호가 약하고, 신호의 형태도 쉽게 드러나지 않습니다. 여기에 여러 레이더가 같은 시간과 주파수 대역을 사용하면 수신 신호가 서로 중첩되어 단일 레이더 신호만 관측된다는 가정이 성립하지 않습니다.

이러한 환경에서는 수신 구간에 어떤 레이더 파형이 포함되어 있는지를 하나만 선택하는 것보다, 여러 파형의 존재 여부를 동시에 판단하는 것이 중요합니다. 중첩된 LPI 레이더 신호를 안정적으로 인지하면 이후의 신호 분석과 파형 식별을 위한 기본 정보를 확보할 수 있습니다.

## 문제 정의

기존의 단일 라벨 분류 방식은 하나의 입력에 하나의 파형만 존재한다고 가정합니다. 그러나 실제 공존 환경에서는 여러 레이더 신호가 시간·주파수 영역에서 겹치며, 각 신호의 세기와 중첩 정도도 달라집니다. 이때 단일 라벨로 결과를 출력하면 함께 존재하는 신호를 놓치거나, 강한 신호 하나만으로 입력을 잘못 설명할 수 있습니다.

따라서 핵심 문제는 중첩된 수신 신호에서 각 레이더 파형의 존재 여부를 독립적으로 판단하는 것입니다. 본 연구는 이를 다중 라벨 인식 문제로 정식화하고, LPI 레이더 신호가 공존하는 조건에서도 복수 파형을 동시에 인지하는 방법을 설계했습니다.

![중첩 레이더 신호의 시간·주파수 점유 구조](figures/spectrum-sharing-time-slots.png)

*여러 레이더 신호가 같은 시간·주파수 자원에서 공존하는 상황*

## 제안 방법

<div class="research-pipeline" aria-label="중첩 레이더 신호 인지 연구 흐름">
  <span>중첩 LPI 레이더 입력</span><b>→</b><span>시간·주파수 표현</span><b>→</b><span>ResNeXt 특징 추출</span><b>→</b><span>다중 라벨 예측</span><b>→</b><span>파형 존재 인지</span>
</div>

- 중첩 신호 구성: 여러 LPI 레이더 신호가 같은 관측 구간에 존재하는 공존 조건을 구성합니다.
- 시간·주파수 특징 추출: 중첩된 신호의 구조를 표현할 수 있도록 수신 신호를 시간·주파수 영역에서 분석합니다.
- 다중 라벨 분류: 하나의 수신 구간에 포함된 복수 레이더 파형을 독립적인 라벨로 동시에 예측합니다.
- ResNeXt 기반 인식: 중첩 신호의 특징을 학습하고 파형별 존재 여부를 출력하는 분류 구조를 적용합니다.

## 연구 수행 및 결과

- 2021–2022: 공존·중첩 신호 환경을 분석하고 레이더 파형 인식 조건을 정립했습니다.
- 2023: LPI 레이더 중첩 신호 인지를 위한 ResNeXt 기반 다중 라벨 분류 연구를 학회에서 발표했습니다.

<div class="research-validation" aria-label="중첩 레이더 신호 인지 연구 결과">
  <span>중첩 신호 입력</span><span>다중 라벨 인식</span><span>LPI 레이더 분석</span>
</div>

중첩 환경에서 하나의 대표 파형만 고르는 방식의 한계를 보완하고, 하나의 수신 구간에 함께 존재하는 여러 레이더 신호를 동시에 인지하는 연구 방향을 제시했습니다.

## 결론

중첩 레이더 신호 인지는 단일 파형 분류보다 실제 수신 환경에 가까운 문제입니다. 본 연구는 LPI 레이더 신호의 공존 상황을 다중 라벨 인식 문제로 다루고, ResNeXt 기반 분류 구조를 통해 복수 파형의 존재를 동시에 판단하는 기반을 마련했습니다.

## 관련 학회 발표

윤재혁, 남해운 (2023.06). “LPI 레이다 중첩 신호 인지를 위한 ResNeXt 기반 다중 라벨 분류.” 한국통신학회 하계종합학술발표회, 제주.

[수행 과제 전체 보기](../../research/#research-tasks)
