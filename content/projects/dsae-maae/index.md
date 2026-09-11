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
summary: "DSAE로 잡음을 억제하고 MAAE의 known waveform memory 기반 복원 오차로 학습되지 않은 레이다 파형을 탐지한 연구입니다."
image:
  filename: figures/overview.png
  alt_text: "비지도 학습 기반 미지 레이더 파형 탐지 연구 개요"
  caption: "※ 본 이미지는 연구의 전체 흐름을 이해하기 쉽게 설명하기 위해 AI로 제작한 개념도이며, 실제 실험 결과 이미지는 아닙니다."
links: []
tags:
  - unknown waveform detection
  - anomaly detection
  - DSAE
  - MAAE
  - CWD
---

## 연구 배경과 필요성

실제 레이다 수신 환경에서는 수신될 수 있는 모든 파형을 사전에 정의하고 학습 데이터로 확보하기 어렵습니다. 군용 레이다 파형은 공개 데이터가 제한적이고, 새로운 변조 방식이나 기존 파형을 변형한 신호가 계속 등장할 수 있기 때문입니다.

일반적인 supervised radar classifier는 학습 단계에서 모든 class가 정의되어 있다는 closed-world assumption을 사용합니다. 따라서 학습하지 않은 새로운 파형이 입력되어도 이를 unknown으로 판단하지 못하고, 기존 known class 중 하나로 분류할 가능성이 있습니다.

이 문제는 저 SNR 환경에서 더 어려워집니다. 잡음이 시간·주파수 구조를 훼손하면 known waveform과 unknown waveform의 차이가 작아지고, 단순한 feature distance나 reconstruction error만으로 두 그룹을 안정적으로 분리하기 어렵습니다. 따라서 unknown waveform의 학습 데이터를 직접 확보하지 않고도 저 SNR에서 known과 unknown을 구분하는 방법이 필요합니다.

## 문제 정의

본 연구는 학습된 class 중 하나를 선택하는 일반적인 파형 분류와 다른 문제를 다룹니다. 학습 단계에서는 known waveform만 사용하고, test 단계에서는 학습에서 보지 못한 waveform이 함께 입력될 수 있습니다. 목표는 모든 waveform의 class를 맞히는 것이 아니라, 현재 입력이 학습된 known distribution에 속하는지 판단하는 것입니다.

기존 autoencoder 기반 anomaly detection은 known data는 잘 reconstruct하고 unknown data에서는 큰 reconstruction error가 발생한다는 가정을 사용합니다. 하지만 radar CWD-TFA에는 linear sweep, curved trace, frequency hopping, phase-coded pattern처럼 서로 다른 waveform이 공유하는 구조적 primitive가 많습니다. 일반 autoencoder의 representation capacity가 너무 크면 unknown waveform까지 잘 reconstruct할 수 있고, 저 SNR에서는 noise reconstruction까지 더해져 known과 unknown의 error가 겹치게 됩니다.

<div class="research-pipeline" aria-label="미지 파형 탐지 문제 흐름">
  <span>Known waveform만으로 학습</span><b>→</b><span>새 waveform 입력</span><b>→</b><span>저 SNR로 구조 훼손</span><b>→</b><span>Known / Unknown error 중첩</span><b>→</b><span>Unknown detection 성능 저하</span>
</div>

## 연구 목표

본 연구는 저 SNR 환경에서 학습하지 않은 레이다 파형을 안정적으로 탐지하는 것을 목표로 했습니다. 이를 위해 한 모델이 denoising과 anomaly detection을 동시에 수행하도록 하지 않고, 잡음 억제와 known-pattern reconstruction을 분리한 두 단계 구조를 설계했습니다.

처리 목표는 DSAE 기반 비지도 잡음 억제, MAAE 기반 known waveform reconstruction, reconstruction error 기반 Known / Unknown 판별의 순서로 정리됩니다. unknown waveform의 clean reference나 unknown class label을 학습에 요구하지 않고, known waveform에서 학습한 구조와의 reconstruction discrepancy를 이용해 새로운 파형을 탐지하는 방식입니다.

## 핵심 방법

<div class="research-pipeline" aria-label="DSAE MAAE 미지 파형 탐지 처리 흐름">
  <span>Received Radar Signal</span><b>→</b><span>CWD Time-Frequency Representation</span><b>→</b><span>DSAE Denoising</span><b>→</b><span>MAAE Known-Pattern Reconstruction</span><b>→</b><span>Reconstruction Error</span><b>→</b><span>Known / Unknown Decision</span>
</div>

수신 waveform은 CWD(Choi–Williams Distribution) 기반 time-frequency image로 변환합니다. CWD-TFA는 waveform의 시간·주파수 구조를 한 표현 안에서 비교하고, 이후 reconstruction 기반 판별을 수행하기 위한 입력으로 사용됩니다.

### DSAE: clean reference 없이 noise suppression

기존 denoising autoencoder는 noisy input과 clean target이 쌍으로 구성된 training data를 요구합니다. 그러나 처음 수신한 unknown waveform에 대해 noise-free 원본을 확보할 수 있다는 가정은 실제 환경에서 성립하기 어렵습니다.

DSAE는 clean target 없이 noisy CWD-TFA 자체를 입력으로 학습합니다. latent representation의 dimensionality를 제한해 모델이 모든 세부 정보를 그대로 복사하지 못하도록 하고, 반복적으로 나타나는 주요 waveform structure에 제한된 representation capacity를 우선 사용하도록 설계했습니다. 그 결과 random noise보다 레이다 waveform의 주요 시간·주파수 구조가 상대적으로 보존됩니다.

{{< case-figure src="figures/proposed-denoising-autoencoder.png" alt="Clean reference 없이 noisy CWD-TFA의 waveform structure를 보존하는 DSAE 구조" type="Method" caption="그림 1. Clean reference 없이 noisy CWD-TFA에서 주요 waveform structure를 보존하도록 설계한 DSAE 구조." description="DSAE는 noisy input만으로 잡음을 억제하고 이후 known-pattern reconstruction에 사용할 표현을 만든다." >}}

### MAAE: known pattern만 이용한 reconstruction

DSAE만 사용하면 waveform structure는 더 선명해지지만, 입력이 unknown인지 여부를 직접 판단할 수는 없습니다. 두 번째 단계에서는 DSAE가 복원한 known waveform representation만을 이용해 MAAE의 memory를 학습합니다.

Known waveform은 memory에 저장된 유사한 pattern을 이용해 입력과 가깝게 reconstruction할 수 있으므로 error가 작습니다. 반대로 training에서 보지 못한 unknown waveform은 정확히 대응되는 memory pattern이 부족하기 때문에 reconstruction 결과와 입력의 차이가 커지도록 설계했습니다. 따라서 최종 판별은 Known은 low reconstruction error, Unknown은 high reconstruction error라는 차이를 이용합니다.

DSAE와 MAAE는 하나의 black-box classifier가 아니라 서로 다른 목적을 가진 두 단계입니다. DSAE는 신호를 분석하기 쉽게 만들고, MAAE는 그 신호가 기존에 학습한 known 구조인지 판단합니다.

{{< case-figure src="figures/dsae-maae-framework.svg" alt="DSAE와 MAAE memory reconstruction 기반 미지 파형 탐지 전체 구조" type="Method" caption="그림 2. DSAE가 잡음을 억제하고 MAAE가 known waveform memory를 이용해 reconstruction한 뒤 reconstruction discrepancy로 unknown을 탐지하는 전체 구조." description="denoising과 unknown detection을 분리한 two-stage processing이 핵심이다." >}}

## 핵심 아이디어

1. Clean reference 없이 잡음을 줄였습니다. Unknown waveform은 송신 원신호나 high-SNR reference를 확보할 수 없는 상황을 전제로 했습니다. DSAE는 noisy CWD-TFA만으로 학습하고, 제한된 latent representation을 통해 noise보다 waveform의 주요 구조를 우선적으로 보존합니다.

2. Autoencoder가 unknown까지 잘 복원하는 문제를 제한했습니다. 일반 AE는 representation capacity가 충분하면 training에서 보지 못한 waveform도 known pattern을 조합해 reconstruct할 수 있습니다. MAAE는 known waveform에서 학습한 memory entry를 이용해 reconstruction을 제한함으로써 unknown waveform의 reconstruction error가 더 크게 나타나도록 했습니다.

3. Denoising과 unknown detection의 학습 목적을 분리했습니다. DSAE는 noise suppression, MAAE는 known-pattern reconstruction과 anomaly separation에 집중합니다. 두 모델을 무조건 하나의 end-to-end network로 학습하기보다 two-stage training을 사용해 각 단계의 목적을 분리했습니다.

{{< case-figure src="figures/denoising_method_comparison.png" alt="입력과 기존 denoising 방법 및 DSAE의 시간·주파수 표현 비교" type="Experiment" caption="그림 3. Input, AWS, PCA와 DSAE의 denoising 결과를 비교해 DSAE가 주요 waveform structure를 유지하면서 잡음을 억제하는 과정을 보여주는 결과." description="clean reference가 없는 조건에서 방법별 신호 구조 보존 정도를 비교한다." >}}

## DSAE와 MAAE가 왜 둘 다 필요한가

| 구분 | DSAE | MAAE |
|---|---|---|
| 입력 | noisy CWD-TFA | DSAE에서 복원된 waveform representation |
| 역할 | noise suppression | known / unknown separation |
| 핵심 구조 | compact latent representation | known waveform memory |
| 학습에 필요한 정보 | clean target 불필요 | unknown label 불필요 |
| 출력 | 잡음이 억제된 waveform structure | reconstruction error 기반 anomaly score |

DSAE가 “신호를 보기 쉽게 만드는 단계”라면, MAAE는 “그 신호가 기존에 알고 있던 구조인지 판단하는 단계”입니다. 두 단계를 하나로 합치면 unknown까지 잘 복원하는 표현이 형성되어 known과 unknown의 error gap이 줄어들 수 있으므로, 각 단계의 학습 목적을 분리했습니다.

## Latent size와 memory size가 중요한 이유

DSAE의 latent vector가 너무 크면 signal뿐 아니라 noise까지 함께 reconstruct할 수 있습니다. 반대로 너무 작으면 waveform의 중요한 구조까지 사라져 known waveform도 제대로 복원하기 어렵습니다. 따라서 latent size는 신호 구조 보존과 noise reconstruction 억제 사이의 균형을 결정합니다.

MAAE의 memory도 같은 trade-off를 가집니다. memory가 너무 작으면 known waveform의 다양한 구조를 저장하지 못하지만, 너무 크면 unknown waveform까지 유사한 memory pattern으로 reconstruct해 known과 unknown의 separation이 감소할 수 있습니다. 논문에서는 전체 SNR 범위를 고려한 balanced configuration으로 latent size e = 4, memory size N = 30을 사용했습니다.

이 값들은 단순한 network tuning 값이 아니라, signal structure preservation과 noise·unknown reconstruction suppression 사이의 균형을 결정하는 핵심 설계 변수입니다.

## 실제 검증

### Known / Unknown protocol

평가는 한 종류의 unknown waveform만 고정해 보는 방식이 아니라, known과 unknown 조합 및 waveform 수를 바꾸며 수행했습니다. 기본 5-waveform case는 LFM, NLFM, Costas, Barker, Frank를 사용했고, 9-waveform case는 여기에 P1–P4 계열을 포함해 waveform 수를 확장했습니다.

One-vs-rest protocol에서는 waveform 한 종류를 training에서 제외하고 test 단계에서 이를 unknown으로 두어 탐지 성능을 평가했습니다. 또한 two-unknown setting을 이용해 여러 종류의 unseen waveform이 동시에 등장하는 조건에서도 known과 unknown의 separation이 유지되는지 확인했습니다. 이 페이지의 최종 metric은 class를 맞히는 classification accuracy가 아니라 known / unknown separability를 평가하는 AUC입니다.

### Channel robustness

평가 환경은 AWGN simulation, Rayleigh fading, GNU Radio와 USRP 기반 measured wireless condition을 포함합니다. Rayleigh 조건에서는 multipath와 Doppler를 추가해 AWGN보다 복잡한 propagation 환경에서도 reconstruction-error separation이 유지되는지 확인했습니다.

USRP 실험에서는 waveform을 실제 OTA로 송수신하고 DC removal과 signal segmentation을 거친 뒤 CWD → DSAE → MAAE 전체 chain으로 unknown detection을 수행했습니다. 주요 설정은 sampling rate 500 kHz, waveform bandwidth 50 kHz, 약 1,000-sample waveform length입니다.

{{< case-figure src="figures/denoising-result-comparison.png" alt="파형별 representation과 시간·주파수 복원 결과 비교" type="Experiment" caption="그림 4. 여러 waveform의 representation과 시간·주파수 복원 결과를 비교해 known structure가 유지되는지 확인한 결과." description="파형 종류가 달라도 복원 단계에서 비교 가능한 구조 표현을 유지하는지를 보여준다." >}}

## 주요 성과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">AUC &gt; 0.77</strong><span class="research-metric-label">5-waveform case, SNR ≥ −12 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">AUC &gt; 0.78</strong><span class="research-metric-label">9-waveform case, SNR ≥ −10 dB</span></div>
  <div class="research-metric"><strong class="research-metric-value">3.04 ms</strong><span class="research-metric-label">DSAE + MAAE inference latency, RTX 3090</span></div>
</div>

5-waveform case에서는 SNR −12 dB 이상에서 AUC 0.77 이상을 유지했고, 9-waveform case에서는 SNR −10 dB 이상에서 AUC 0.78 이상을 유지했습니다. 저 SNR 영역에서 TDL 및 TCN 기반 comparison method보다 높은 unknown waveform detection 성능을 보였습니다.

multiple-unknown 조건에서도 기존 방법 대비 separation을 유지했으며, Rayleigh fading과 실제 USRP 무선 환경에서도 known과 unknown을 구분하는 흐름이 동작했습니다. 다만 실제 측정 환경에서는 극저 SNR에서 AWGN simulation과 성능 차이가 나타났고, 약 −8 dB 이상에서 simulated AWGN과 유사한 수준으로 회복되는 경향을 확인했습니다.

{{< case-figure src="figures/unknown-detection-performance.png" alt="5개 레이다 파형 조건에서 known과 unknown을 구분하는 AUC 성능" type="Result" caption="그림 5. 5-waveform case에서 제안 방법과 비교 방법의 unknown waveform detection AUC를 SNR별로 비교한 결과." description="제안 방법은 저 SNR 구간에서 비교 방법보다 높은 known / unknown separability를 보인다." >}}

{{< case-figure src="figures/one_vs_rest_auc_9_waveforms.png" alt="9개 레이다 파형 조건에서 known과 unknown을 구분하는 AUC 성능" type="Result" caption="그림 6. 9-waveform case의 one-vs-rest unknown detection AUC 결과." description="waveform 수가 늘어난 조건에서도 SNR이 높아질수록 known과 unknown의 분리가 안정적으로 유지된다." >}}

## Reconstruction error 결과

Known waveform은 MAAE memory가 해당 구조를 학습했기 때문에 input과 reconstruction 사이의 error가 작습니다. 반대로 Unknown waveform은 정확히 대응되는 memory pattern이 없어 reconstruction discrepancy가 상대적으로 크게 발생합니다.

따라서 reconstruction error threshold를 변화시키면서 known과 unknown을 구분하고, ROC curve와 AUC를 이용해 threshold 전반의 separability를 평가했습니다. AUC는 단순한 분류 정확도가 아니라, decision threshold 전반에서 Known과 Unknown을 얼마나 안정적으로 분리할 수 있는지를 나타내는 지표입니다.

{{< case-figure src="figures/reconstruction_error_minus_8_db.png" alt="SNR −8 dB에서 known과 unknown waveform의 reconstruction error 분포" type="Result" caption="그림 7. SNR −8 dB 조건에서 known과 unknown waveform의 reconstruction error 분포를 비교한 결과." description="Known은 낮은 error 구간에, Unknown은 상대적으로 높은 error 구간에 분포해 threshold 기반 탐지가 가능해진다." >}}

## 연구의 한계와 다음 연구

Reconstruction-based unknown detection은 서로 시간·주파수 구조가 매우 비슷한 waveform에서 한계를 가질 수 있습니다. 특히 P1–P4처럼 구조적으로 유사한 waveform family에서는 unknown waveform도 known memory pattern을 부분적으로 이용해 reconstruct될 수 있어 error distribution이 겹치고 탐지 난도가 증가합니다.

다만 reconstruction error만으로 구조적으로 유사한 파형을 구분하는 데에는 한계가 있었습니다. 이 문제는 이후 연구에서 파형의 구조와 스펙트럼 의미 정보를 함께 활용하는 semantic attribute 기반 radar waveform recognition으로 확장했습니다.

## 결론

저는 이 연구에서 저 SNR unknown waveform detection 문제를 noise suppression과 unknown discrimination의 두 단계로 분리하고, DSAE–MAAE 기반 처리 구조를 설계했습니다. Clean reference 없이 noisy CWD-TFA에서 waveform structure를 복원하기 위한 DSAE를 구성하고, known waveform memory-based reconstruction을 이용해 unknown waveform의 reconstruction discrepancy를 확대하는 MAAE 구조를 적용했습니다.

또한 waveform 종류와 known / unknown 조합을 변화시키며 simulation을 구성하고, AWGN뿐 아니라 Rayleigh fading과 GNU Radio·USRP 기반 무선 송수신 환경에서도 전체 detection chain을 검증했습니다.

이 연구의 의미는 학습 데이터에 존재하는 파형을 정확히 분류하는 것에서 벗어나, 사전에 정의되지 않은 파형이 등장할 수 있는 실제 수신 환경을 고려해 학습하지 않은 신호를 unknown으로 탐지하는 문제로 레이다 파형 인식의 범위를 확장했다는 점입니다.

<div class="case-study-publication">

## Publication

Jaehyeok Yoon and Haewoon Nam, “[Unsupervised Unknown Radar Waveform Detection](../../publications/unknown-radar-waveform-detection/),” *IEEE Transactions on Aerospace and Electronic Systems*, vol. 61, no. 6, pp. 19316–19328, 2025. [DOI](https://doi.org/10.1109/TAES.2025.3618820)

</div>
