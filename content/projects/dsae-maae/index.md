---
layout: project
type: project
title: "비지도 학습 기반 미지 레이더 파형 탐지"
english_title: "Unsupervised Unknown Radar Waveform Detection"
slug: "dsae-maae-unknown-radar"
order: 2
project_number: "02"
project_stage: "Unsupervised Unknown Detection · 2022–2025"
research_year: "2022–2025"
project_role: "비지도 학습 구조 설계 · unknown 탐지 실험"
hero_claim: "미확인 파형의 정답 데이터나 clean reference 없이도 저 SNR 신호의 잡음을 억제하고 학습되지 않은 파형을 탐지했습니다."
research_question: "unknown-class label과 clean reference signal이 없는 환경에서 unseen radar waveform을 검출할 수 있는가?"
result_highlight: "5-waveform AUC > 0.77 @ SNR ≥ −12 dB · 9-waveform AUC > 0.78 @ SNR ≥ −10 dB"
technology_tags:
  - DSAE
  - MAAE
  - CWD
  - Unknown Detection
publication_refs:
  - /publications/unknown-radar-waveform-detection/
summary: "노이즈 억제와 known waveform memory 기반 복원을 결합해 reconstruction discrepancy로 미지 파형을 탐지한 연구입니다."
image:
  filename: figures/overview.png
  alt_text: "비지도 학습 기반 미지 레이더 파형 탐지 연구 개요"
  caption: "저 SNR 미지 파형 탐지 연구의 전체 개요도"
links: []
tags:
  - unknown waveform detection
  - anomaly detection
  - DSAE
  - MAAE
  - CWD
---

## 연구 배경 및 문제 정의

기존 레이다 파형 분류 연구는 학습 단계에서 모든 클래스를 알고 있다는 closed-set assumption을 주로 사용합니다. 그러나 실제 전자기 환경에서는 새로운 파형이나 변형된 파형이 언제든 등장할 수 있고, 군용 레이다 데이터는 보안과 데이터 부족 때문에 모든 파형의 label을 미리 확보하기 어렵습니다.

따라서 단순히 LFM, Barker, Costas 중 하나를 고르는 것을 넘어, 입력 신호가 알고 있는 파형인지 처음 보는 파형인지 판단해야 합니다. 저 SNR에서는 unknown waveform의 특징도 잡음에 훼손되기 때문에 이 구분이 더 어려워집니다.

<div class="research-pipeline" aria-label="미지 파형 탐지 문제 흐름">
  <span>Known waveform 학습</span><b>→</b><span>Unknown 입력 유입</span><b>→</b><span>기존 class로 강제 분류</span><b>→</b><span>미지 파형 탐지 실패</span>
</div>

## 연구 목표

Unknown class의 학습 데이터 없이 저 SNR 환경에서 Known과 Unknown 레이다 파형을 구분하는 것을 목표로 했습니다. 또한 일반적인 denoising처럼 unknown waveform의 clean signal을 정답으로 요구하지 않는 구조를 만들고자 했습니다.

## 핵심 방법

<div class="research-pipeline" aria-label="DSAE MAAE 미지 파형 탐지 처리 흐름">
  <span>Noisy CWD Time-Frequency Image</span><b>→</b><span>DSAE</span><b>→</b><span>MAAE Known Waveform Memory Reconstruction</span><b>→</b><span>Reconstruction Error</span><b>→</b><span>Known / Unknown Decision</span>
</div>

DSAE는 제한된 latent representation을 이용해 잡음보다 waveform structure를 우선적으로 보존합니다. MAAE는 known waveform에서 학습한 memory를 이용해 입력을 복원합니다. Known waveform은 memory에 유사한 구조가 있어 잘 복원되지만, unknown waveform은 대응되는 memory가 없어 더 큰 reconstruction discrepancy를 만들도록 구성했습니다.

{{< case-figure src="figures/dsae-maae-framework.svg" alt="DSAE와 MAAE memory reconstruction 기반 미지 파형 탐지 구조" type="Method" caption="그림 1. 잡음이 포함된 시간·주파수 이미지에서 DSAE로 신호 구조를 복원하고 MAAE의 known waveform memory reconstruction error로 known과 unknown을 구분하는 전체 구조." description="denoising과 unknown detection을 한 모델에 섞지 않고 두 단계로 나눈 설계가 핵심이다." >}}

## 핵심 아이디어

1. **Clean reference 없이 noise suppression을 수행했습니다.** 실제 미확인 레이다 신호에서는 송신 원신호를 알 수 없어 noisy-clean pair를 확보하기 어렵기 때문에, DSAE의 representation capacity를 제한해 noisy input만으로 주요 구조를 보존하도록 했습니다.
2. **Known waveform의 특징만 memory에 저장했습니다.** MAAE가 모든 입력을 지나치게 잘 복원하면 unknown까지 known으로 통과할 수 있으므로, known waveform의 핵심 representation만 memory entry로 학습했습니다.
3. **Denoising과 unknown detection의 역할을 분리했습니다.** DSAE는 noise suppression, MAAE는 known/unknown separation에 집중하도록 두 단계로 학습했습니다.

{{< case-figure src="figures/proposed-denoising-autoencoder.png" alt="Noisy time-frequency input의 waveform structure를 보존하는 DSAE 구조" type="Method" caption="그림 2. Clean reference 없이 noisy input의 주요 waveform structure를 보존하도록 설계한 denoising autoencoder 구조." description="잡음 제거와 파형 구조 보존 사이의 균형을 representation 단계에서 설계했다." >}}

## 실제 검증

- **Waveform protocol:** one-vs-rest와 multiple-vs-rest를 5-waveform 및 9-waveform 설정으로 평가했습니다.
- **Channel conditions:** AWGN, Rayleigh fading, USRP 기반 measured wireless 조건을 사용했습니다.
- **Configuration:** latent vector size와 memory size를 비교해 noise suppression과 unknown separability의 trade-off를 확인했습니다.

{{< case-figure src="figures/denoising-result-comparison.png" alt="DSAE 적용 전후 시간·주파수 표현 비교" type="Experiment" caption="그림 3. DSAE 적용 전후의 시간·주파수 표현을 비교해 잡음은 감소하고 waveform structure는 유지되는 결과." description="제안 구조가 clean reference 없이 noisy input의 신호 구조를 보존하는지 확인한 결과다." >}}

## 주요 성과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">0.77+</strong><span class="research-metric-label">5-waveform AUC @ SNR ≥ −12 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">0.78+</strong><span class="research-metric-label">9-waveform AUC @ SNR ≥ −10 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">No clean</strong><span class="research-metric-label">clean reference signal 불필요</span></div>
</div>

{{< case-figure src="figures/unknown-detection-performance.png" alt="Known과 unknown 레이다 파형의 reconstruction discrepancy 기반 탐지 성능" type="Result" caption="그림 4. Known waveform과 Unknown waveform의 reconstruction discrepancy를 이용한 미지 파형 탐지 성능." description="Known은 memory에 일관되게 복원되고 Unknown은 더 큰 discrepancy를 보이도록 분리한 결과다." >}}

Unknown을 단순 confidence threshold로 판단하지 않고, known pattern으로 얼마나 일관되게 복원되는지를 이용해 탐지했습니다. 이 결과는 이후 semantic attribute와 Vision-Language 표현을 이용하는 Open-Set Recognition 연구로 연결되었습니다.

## 나의 기여 및 연구의 의미

Noisy CWD time-frequency input을 위한 DSAE representation과 known waveform memory를 사용하는 MAAE 구조를 설계했습니다. one-vs-rest와 multiple-vs-rest 프로토콜을 구성하고 AWGN, fading, measured wireless 환경에서 reconstruction discrepancy가 unknown detection score로 작동하는지 검증했습니다.

Case 01이 신호를 안정적으로 검출하고 제원을 계산하는 연구였다면, 이 연구는 검출된 신호가 학습된 파형인지 처음 보는 파형인지 판단하는 단계입니다. 다음 연구에서는 reconstruction error만으로 구분하기 어려운 유사 파형을 semantic representation으로 다룹니다.

<div class="case-study-transition"><strong>다음 단계</strong>Open-set 인식: reconstruction error를 넘어, 시간·주파수 패턴의 의미를 이용해 Known 분류와 Unknown 거부를 동시에 수행합니다.</div>

<div class="case-study-publication">

## Publication

[Unsupervised Denoising for Unknown Radar Waveform Detection](../../publications/unknown-radar-waveform-detection/) · *IEEE Transactions on Aerospace and Electronic Systems*, 2025

</div>
