---
layout: project
type: project
title: "비지도 학습 기반 미지 레이다 파형 탐지"
english_title: "Unsupervised Unknown Radar Waveform Detection"
slug: "dsae-maae-unknown-radar"
order: 2
project_number: "02"
project_stage: "Unsupervised Unknown Detection · 2022–2025"
research_year: "2022–2025"
hero_claim: "학습하지 않은 레이다 파형이 입력되어도 known class로 강제 분류하지 않고 미지 신호로 탐지했습니다."
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
  filename: figures/dsae_maae_framework.png
  alt_text: DSAE and MAAE framework for unknown radar waveform detection
  caption: "DSAE–MAAE 기반 노이즈 억제·known 패턴 복원·미지 파형 탐지 구조"
links: []
tags:
  - unknown waveform detection
  - anomaly detection
  - DSAE
  - MAAE
  - CWD
---

## 문제 정의

실제 전자전 환경에서는 학습 데이터에 포함되지 않은 새로운 레이다 파형이 지속적으로 등장할 수 있습니다. 일반적인 closed-set classifier는 unknown 입력을 기존 known class 중 하나로 잘못 분류할 수 있습니다.

이 연구의 문제는 **unknown-class label과 clean reference signal이 없는 조건에서, known waveform은 유지하면서 unseen waveform을 별도로 탐지하는 것**입니다.

<div class="research-pipeline" aria-label="미지 파형 탐지 문제">
  <span>Known A</span><b>+</b><span>Known B</span><b>+</b><span>Known C</span><b>→</b><span>Unknown 입력을 기존 class로 강제 분류</span>
</div>

## 제안 방법

<div class="research-pipeline" aria-label="DSAE MAAE 제안 방법">
  <span>저 SNR Radar I/Q</span><b>→</b><span>CWD-TFA</span><b>→</b><span>DSAE noise suppression</span><b>→</b><span>MAAE known-pattern reconstruction</span><b>→</b><span>Reconstruction discrepancy</span><b>→</b><span>Known / Unknown</span>
</div>

- **DSAE:** paired clean target 없이 noisy CWD 기반 시간–주파수 입력에서 noise-suppressed representation을 학습합니다.
- **MAAE:** known waveform pattern을 memory entry로 학습하고, 입력을 known-biased memory를 통해 복원합니다.
- **Unknown score:** known 입력은 낮은 reconstruction discrepancy, unseen 입력은 높은 discrepancy를 갖도록 연속적인 탐지 score를 구성합니다.

![DSAE–MAAE framework](figures/dsae_maae_framework.png)

![Denoising comparison](figures/denoising_method_comparison.png)

[Denoising comparison Figure PDF](figures/denoising_method_comparison.pdf)

## 실제 검증

- **Waveform protocol:** one-vs-rest와 multiple-vs-rest를 5-waveform 및 9-waveform 설정으로 평가했습니다.
- **Channel conditions:** AWGN, Rayleigh fading, USRP 기반 measured wireless 조건을 사용했습니다.
- **Configuration:** latent vector size와 memory size를 비교해 noise suppression과 unknown separability의 trade-off를 확인했습니다.

![Reconstruction error at low SNR](figures/reconstruction_error_minus_8_db.png)

[Reconstruction error Figure PDF](figures/reconstruction_error_minus_8_db.pdf)

## 주요 결과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">0.77+</strong><span class="research-metric-label">5-waveform AUC @ SNR ≥ −12 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">0.78+</strong><span class="research-metric-label">9-waveform AUC @ SNR ≥ −10 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">4 dB</strong><span class="research-metric-label">challenging SNR에서의 AWGN 대비 measured wireless gap</span></div>
</div>

![One-vs-rest AUC in the 9-waveform protocol](figures/one_vs_rest_auc_9_waveforms.png)

[AUC 결과 Figure PDF](figures/one_vs_rest_auc_9_waveforms.pdf)

분류기의 confidence만으로 unknown을 판단하는 대신, 파형이 known pattern으로 얼마나 일관되게 복원되는지를 이용해 미지 파형을 탐지했습니다. 이 단계는 이후 semantic attribute와 Vision-Language 표현을 활용하는 Open-Set Recognition 연구로 연결됩니다.

관련 논문: [Unsupervised Denoising for Unknown Radar Waveform Detection](../../publications/unknown-radar-waveform-detection/) · *IEEE Transactions on Aerospace and Electronic Systems*
