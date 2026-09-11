---
layout: project
type: project
title: "저 SNR 레이더 신호 검출 및 제원 추정"
english_title: "High-Accuracy Radar Parameter Estimation Under Low SNR Environments"
slug: "low-snr-radar-parameter-estimation"
aliases:
  - /projects/radar-waveform-estimation/
order: 1
project_number: "01"
project_stage: "저 SNR 신호 검출·제원 추정 · 2021–2025"
research_year: "2021–2025"
project_role: "연구 알고리즘 설계 · 신호처리 구현 · 실험 검증"
hero_claim: "잡음에 묻힌 저 SNR 레이다 펄스를 먼저 검출하고, 시간·주파수 구조를 복원해 주요 제원을 추정했습니다."
research_question: "잡음에 묻힌 레이다 펄스의 위치와 경계를 찾아 주요 신호 제원을 얼마나 안정적으로 추정할 수 있는가?"
result_highlight: "FPD AUC 0.912 @ −18 dB · 0.964 @ −15 dB"
technology_tags:
  - STFT
  - UNet
  - CCA
  - USRP / GNU Radio
publication_refs:
  - /publications/lpi-radar-parameter-estimation/
summary: "저 SNR 환경에서 펄스 검출과 시간·주파수 구조 복원을 결합해 레이다 신호의 주요 제원을 추정한 연구입니다."
image:
  filename: figures/preview.png
  alt_text: "저 SNR 레이다 신호 검출과 제원 추정 연구 개요"
  caption: "저 SNR 레이다 신호 검출·제원 추정 연구의 전체 개요도 · 실측 데이터 아님"
links: []
tags:
  - pulse detection
  - parameter estimation
  - STFT
  - UNet
  - CCA
  - USRP/GNU Radio
---

## 연구 배경 및 문제 정의

레이다 신호 분석에서는 신호가 언제 도착했는지(ToA), 얼마나 지속되는지(PW), 어떤 간격으로 반복되는지(PRI), 어느 주파수 대역을 사용하는지(BW, Fc)를 정확하게 추정해야 합니다.

하지만 저 SNR 환경에서는 신호보다 잡음의 영향이 커져 펄스의 시작과 끝이 불분명해집니다. 시간·주파수 영상에서도 레이다 신호와 잡음을 구분하기 어려워지고, 기존 Wigner-Hough Transform이나 Change Point Detection 기반 방법은 낮은 SNR에서 pulse edge를 안정적으로 추출하기 어렵습니다.

<div class="research-pipeline" aria-label="저 SNR 레이다 신호 검출 문제 흐름">
  <span>Low-SNR 수신 신호</span><b>→</b><span>Pulse 위치 불명확</span><b>→</b><span>신호 경계 추출 실패</span><b>→</b><span>Parameter Estimation Error 증가</span>
</div>

{{< case-figure src="figures/problem-low-snr-pulse-train.png" alt="잡음에 묻힌 저 SNR 레이다 펄스열" type="Conceptual illustration" caption="그림 1. 저 SNR 환경에서 수신 펄스가 잡음에 묻혀 시간 위치와 펄스 경계가 불명확해지는 상황." description="이 연구가 먼저 해결해야 했던 신호 검출과 경계 추출의 어려움을 보여준다." note="개념도 · 실측 데이터 아님" >}}

## 연구 목표

저 SNR 환경에서도 레이다 펄스의 존재와 경계를 안정적으로 검출하고, 시간·주파수 파라미터를 정확하게 추정하는 것을 목표로 했습니다.

추정 대상은 ToA, PW, PRI, Bandwidth, Carrier Frequency입니다. 신호 전체를 한 번에 예측하기보다 검출·복원·경계 추출·계산을 분리해 각 단계가 맡은 역할을 명확히 했습니다.

{{< case-figure src="figures/radar-parameters-concept.png" alt="레이다 펄스에서 추정하는 시간과 주파수 파라미터" type="Conceptual illustration" caption="그림 2. 저 SNR 레이다 신호에서 추정해야 하는 ToA, PW, PRI, BW, Fc를 정리한 개념도." description="연구의 평가 대상과 최종 계산값이 무엇인지 보여준다." note="개념도 · 실측 데이터 아님" >}}

## 핵심 방법

<div class="research-pipeline" aria-label="저 SNR 제원 추정 처리 흐름">
  <span>Received I/Q</span><b>→</b><span>Frequency-domain Pulse Detection</span><b>→</b><span>STFT</span><b>→</b><span>UNet Denoising</span><b>→</b><span>CCA-based Edge Detection</span><b>→</b><span>Parameter Estimation</span>
</div>

먼저 수신 I/Q 신호를 짧은 time slot으로 나누고 주파수 영역에서 pulse가 존재하는 구간을 선별합니다. 검출된 구간만 STFT 영상으로 변환한 뒤 UNet으로 잡음을 줄이고, CCA를 이용해 연속적인 레이다 신호 구조와 경계를 추출합니다.

{{< case-figure src="figures/processing_framework.png" alt="저 SNR 수신 I/Q 신호를 제원 추정으로 연결하는 처리 흐름" type="Method" caption="그림 3. 수신 I/Q 신호를 pulse detection, STFT, UNet denoising, CCA edge detection, parameter estimation으로 연결한 전체 처리 흐름." description="딥러닝 모델 하나로 모든 값을 직접 예측하지 않고 신호 복원과 물리적 파라미터 계산을 분리한 구조가 핵심이다." >}}

복원된 시간·주파수 구조에서 펄스의 시작과 끝을 찾고, 경계와 주파수 정보를 바탕으로 ToA, PW, PRI, BW, Fc를 계산합니다.

{{< case-figure src="figures/edge_based_parameter_estimation.png" alt="복원된 레이다 구조에서 펄스 경계와 파라미터를 계산하는 과정" type="Method" caption="그림 4. 복원된 시간·주파수 구조에서 펄스 경계를 추출하고 레이다 파라미터를 계산하는 과정." description="신호처리 기반 edge extraction이 최종 제원 계산으로 이어지는 단계를 보여준다." >}}

## 핵심 아이디어

1. **분석 전에 pulse 존재 구간을 먼저 좁혔습니다.** 저 SNR에서도 주파수 영역의 에너지가 특정 대역에 집중될 수 있다는 점을 이용해 후단 분석 범위를 줄였습니다.
2. **단순 분류가 아니라 시간·주파수 구조를 복원했습니다.** UNet은 잡음을 줄이면서 파라미터 추정에 필요한 pulse 구조와 경계를 보존하도록 사용했습니다.
3. **딥러닝과 신호처리의 역할을 분리했습니다.** UNet은 denoising, CCA와 edge algorithm은 구조 추출과 물리 파라미터 계산을 담당하게 했습니다.

## 실제 검증

- **Simulation:** 17종 intrapulse-modulation waveform, pulse width 1–10 ms, SNR −20–10 dB
- **Dataset:** waveform·SNR별 100개 pulse train, 총 52,700개, train/validation/test = 8:1:1
- **OTA test-bed:** GNU Radio로 제어한 USRP-2920 2대, center frequency 910 MHz, sampling rate 500 kHz

시뮬레이션에서 매우 낮은 SNR까지 성능을 평가한 뒤, USRP와 GNU Radio를 이용해 실제 송수신 환경에서도 검출·복원·제원 추정 체인이 동작하는지 확인했습니다.

{{< case-figure src="figures/usrp-testbed-photo.png" alt="USRP와 GNU Radio로 구성한 저 SNR 송수신 실험 장비" type="Experiment" caption="그림 5. USRP와 GNU Radio를 이용해 실제 저 SNR 송수신 환경을 구성한 실험 장비." description="시뮬레이션 결과를 실제 무선 수신 환경으로 확장해 검증한 실험 구성이다." >}}

## 주요 성과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">약 3 dB</strong><span class="research-metric-label">기존 파라미터 추정 방법 대비 저 SNR 성능 개선</span></div>
  <div class="research-metric"><strong class="research-metric-value">0.912</strong><span class="research-metric-label">Pulse detection AUC @ −18 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">0.964</strong><span class="research-metric-label">Pulse detection AUC @ −15 dB</span></div>
</div>

- −8 dB 조건에서 ToA, PW, PRI RMSE는 각각 8 μs, 16 μs, 6 μs였습니다.
- 시뮬레이션뿐 아니라 USRP 기반 실제 저 SNR 송수신 환경에서도 처리 체인을 검증했습니다.

{{< case-figure src="figures/representative-estimation-result.jpg" alt="저 SNR 조건에서 레이다 파라미터를 추정한 대표 결과 그래프" type="Result" caption="그림 6. 저 SNR 조건에서 펄스 검출 및 주요 파라미터 추정 결과를 보여주는 대표 성능 그래프." description="검출된 신호 구조를 바탕으로 시간·주파수 제원을 계산할 수 있음을 보여준다." >}}

## 나의 기여 및 연구의 의미

수신 신호를 분석 가능한 구간으로 줄이는 주파수 영역 pulse detector, STFT·UNet 기반 신호 복원, CCA 기반 edge extraction과 파라미터 계산 흐름을 설계했습니다. 시뮬레이션 데이터셋을 구성하고 USRP/GNU Radio test-bed에서 실제 수신 신호로 검증해 알고리즘이 실환경으로 이어질 수 있는지 확인했습니다.

이 연구는 저 SNR 신호를 안정적으로 검출하고 제원을 추정하는 기반이 되었으며, 이후 학습되지 않은 파형을 거부하는 unknown detection 연구로 이어졌습니다.

<div class="case-study-transition"><strong>다음 단계</strong>미확인 파형 탐지: 신호가 검출된 뒤, 학습되지 않은 파형을 어떻게 구분할 것인가?</div>

<div class="case-study-publication">

## Publication

[High-Accuracy Radar Parameter Estimation Under Low SNR Environments](../../publications/lpi-radar-parameter-estimation/) · *IEEE Access*, 2025

</div>
