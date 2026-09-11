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
  filename: figures/preview_v3.png
  alt_text: "Vision-Language 기반 open-set 레이다 파형 인식 연구 개요"
  caption: "※ 본 이미지는 연구의 전체 흐름을 이해하기 쉽게 설명하기 위해 AI로 제작한 개념도이며, 실제 실험 결과 이미지는 아닙니다."
links: []
tags:
  - VLM
  - CLIP
  - SPWVD
  - Open-Set Recognition
  - radar signal processing
---

## 연구 배경과 필요성

기존 레이다 파형 분류기는 학습 단계에서 모든 waveform class가 미리 정의되어 있다는 closed-set assumption을 사용하는 경우가 많습니다. 그러나 실제 비협조적 수신 환경에서는 새로운 waveform, 변형된 modulation, 학습 데이터에 포함되지 않은 radar emission이 언제든 등장할 수 있습니다.

Closed-set classifier는 unknown waveform이 입력되어도 이를 모르는 신호로 판단하지 못하고, 가장 가까운 known class 중 하나로 강제 분류할 수 있습니다. 특히 저 SNR에서는 noise와 channel distortion 때문에 시간·주파수 구조가 흐려져 known class 간 separability뿐 아니라 known과 unknown의 차이도 작아집니다.

따라서 실제 레이다 인식 시스템에는 known waveform은 정확한 class로 분류하고, 학습하지 않은 waveform은 known으로 오분류하지 않고 unknown으로 reject하는 open-set recognition이 필요합니다.

## 문제 정의

연구 2에서는 reconstruction error를 이용해 학습하지 않은 waveform을 Known과 Unknown으로 구분하는 reconstruction-based unknown detection 문제를 다뤘습니다. 하지만 실제 open-set recognition에서는 unknown을 찾는 것만으로는 충분하지 않습니다. 시스템은 known waveform의 class를 정확하게 구분하는 동시에, 학습하지 않은 waveform은 unknown으로 거부해야 합니다.

Radar waveform은 LFM sweep, nonlinear sweep, hopping pattern, phase-coded structure처럼 서로 공유하는 structural primitive를 가질 수 있습니다. 따라서 unknown waveform이 known waveform과 일부 구조를 공유하면 reconstruction error나 단순 feature distance만으로는 경계가 모호해질 수 있습니다.

<div class="research-pipeline" aria-label="Closed-set 분류에서 open-set 레이다 인식으로 확장되는 문제 흐름">
  <span>Closed-set 학습</span><b>→</b><span>Unknown waveform 등장</span><b>→</b><span>Known과 부분적으로 유사한 구조</span><b>→</b><span>저 SNR로 경계 불명확</span><b>→</b><span>Unknown을 Known으로 오분류</span>
</div>

{{< case-figure src="figures/closed_set_vs_open_set.png" alt="Closed-set 분류와 open-set 레이다 인식의 차이" type="Concept" caption="그림 1. Closed-set 분류는 unknown sample을 known class로 오분류할 수 있지만, open-set recognition은 known classification과 unknown rejection을 함께 수행한다." description="학습 단계에서 보지 못한 waveform이 등장할 때 두 문제의 판단 목표가 어떻게 달라지는지 보여준다." >}}

## 연구 목표

본 연구는 저 SNR 환경에서 known radar waveform의 분류 성능을 유지하면서, 학습에서 보지 못한 waveform을 안정적으로 reject하는 open-set radar waveform recognition을 목표로 했습니다. 이를 위해 radar waveform을 단순 class label로 표현하지 않고, 시간·주파수 영상에서 관찰되는 structural pattern과 spectral characteristic을 semantic attribute text로 구성했습니다.

제안한 SAVOR는 SPWVD time-frequency image와 radar semantic attribute text를 shared vision-language embedding space에 정렬한 뒤, Stage 1에서 known semantic reference를 만들고 Stage 2에서 unknown-aware representation을 학습합니다.

<div class="research-pipeline" aria-label="SAVOR open-set 레이다 인식 전체 흐름">
  <span>Raw Radar I/Q</span><b>→</b><span>SPWVD Time-Frequency Image</span><b>+</b><span>Radar Semantic Attribute Text</span><b>→</b><span>Stage 1: Known Semantic Alignment</span><b>→</b><span>Stage 2: Unknown-Aware Learning</span><b>→</b><span>Known Classification + Unknown Rejection</span>
</div>

## 왜 Vision-Language Model을 사용하는가

일반적인 classifier는 LFM, Barker, Costas와 같은 class label을 supervision으로 사용합니다. 하지만 class name 자체에는 waveform이 시간·주파수 영역에서 어떤 구조를 가지는지에 대한 정보가 거의 없습니다. 같은 class라도 SNR과 채널에 따라 영상이 달라지고, 서로 다른 class가 일부 구조적 primitive를 공유할 수도 있습니다.

Vision-language model은 image representation과 text representation을 공통 embedding space에 정렬할 수 있습니다. 따라서 ascending 또는 descending sweep, curved ridge, stepwise hopping, horizontal band, fragmented energy와 같은 waveform의 구조적 의미를 text로 표현해 TFI와 연결할 수 있습니다.

이 연구는 CLIP을 레이다에 그대로 적용해 zero-shot recognition을 수행한 것이 아닙니다. pretrained CLIP embedding을 radar semantic attribute와 open-set learning에 맞게 구성하고, Stage 1과 Stage 2의 학습 전략으로 known classification과 unknown rejection이 함께 가능한 표현 공간을 설계했습니다.

## Semantic Attribute Construction

### Known-Class Attribute Text

Known class의 text는 각 waveform의 structural pattern과 spectral characteristic을 결합해 구성합니다. Structural pattern은 ascending diagonal line, curved trace, stepwise frequency pattern, horizontal band처럼 TFI의 전체적인 형태를 설명하고, spectral characteristic은 continuous energy ridge, fragmented distribution, phase-transition artifact, oscillating frequency characteristic처럼 그 구조 위의 에너지 분포를 설명합니다.

각 class에 대해 여러 candidate phrase를 만들고 training 중 structural pattern과 spectral characteristic을 sampling해 의미적으로 일관되면서도 다양한 text description을 생성합니다. 목적은 특정 문장을 외우게 하는 것이 아니라, 각 waveform class의 구조적 의미와 image embedding을 정렬하는 것입니다.

### Attribute-Aware Base Text

두 번째 text set은 특정 known class에 직접 연결되지 않는 generic time-frequency description으로 구성합니다. Vertical streak, horizontal band, diffuse blob, fragmented trace, broad smear, scattered energy, irregular cluster와 같은 attribute를 사용하고, 이를 “a radar spectrogram showing …” 또는 “a noisy spectrogram with …” 같은 template과 결합합니다.

이 text들은 known class description이 아니라 Stage 2에서 unknown semantic direction을 만들기 위한 semantic basis입니다. 즉 known-class attribute text는 known semantic alignment를 담당하고, attribute-aware base text는 unknown modeling을 위한 semantic diversity를 제공합니다.

## Stage 1 — Known Semantic Alignment

Stage 1의 목적은 unknown을 직접 학습하는 것이 아니라, known radar waveform class를 semantic하게 분리되는 embedding space에 정렬하는 것입니다. Radar waveform을 SPWVD 기반 TFI로 변환하고 CLIP image encoder로 image embedding을 생성합니다.

동시에 해당 waveform의 structural pattern과 spectral characteristic을 포함하는 text를 CLIP text encoder로 embedding합니다. Image-to-text contrastive learning을 통해 각 radar image가 자신의 semantic attribute description과 가까워지도록 학습하고, known class를 단순 class ID가 아닌 waveform의 구조적 의미를 기준으로 정렬합니다.

Stage 1은 unknown을 직접 학습하는 단계가 아니라, 이후 unknown-aware regularization이 작동할 수 있는 known waveform의 semantic reference space를 먼저 만드는 단계입니다.

{{< case-figure src="figures/01_open-set-vlm-overview.png" alt="SAVOR 기반 open-set 레이다 파형 인식 전체 구조" type="Method" caption="그림 2. Radar time-frequency representation과 semantic attribute를 결합한 SAVOR open-set 레이다 파형 인식 전체 구조." description="레이더 시간·주파수 표현과 의미 정보를 Vision-Language embedding space에 정렬해 known classification과 unknown rejection을 함께 수행하는 흐름을 보여준다." >}}

## Stage 2 — Unknown-Aware Representation Learning

Stage 1만으로는 known class가 잘 정렬되더라도 unknown waveform이 embedding space에서 어디에 나타날지를 직접 고려하지 않습니다. 따라서 Stage 2에서는 text side와 image side에서 각각 unknown-related region을 모델링합니다.

Text-Driven Unknown(TDU)은 attribute-aware base text를 이용해 semantic space를 확장하고, Image-space Virtual Unknown(IVU)은 known class 사이의 모호한 image region을 regularize합니다. 두 방법은 같은 unknown prototype을 사용하는 것이 아니라 서로 다른 공간에서 complementary하게 작동합니다.

{{< case-figure src="figures/stage2-unknown-learning.png" alt="Text-Driven Unknown과 Image-space Virtual Unknown의 Stage 2 학습 구조" type="Method" caption="그림 3. Attribute-aware base text와 known class center를 이용해 text side와 image side의 virtual unknown을 구성하는 Stage 2 구조." description="TDU는 semantic direction을 확장하고 IVU는 known class 사이의 ambiguous region을 정리한다." >}}

### TDU — Text-Driven Unknown Modeling

TDU는 attribute-aware base text에서 얻은 embedding으로 known class에 종속되지 않는 semantic basis를 구성합니다. 이 basis에서 text-derived virtual unknown direction을 만들고 known prototype과 함께 training logit에 포함해, image embedding이 known class와 정렬되면서도 known 밖의 semantic direction을 고려하도록 학습합니다.

TDU는 실제 unknown class의 text label을 만들어 학습하는 구조가 아닙니다. 사전에 알 수 없는 실제 unknown waveform 대신, radar-specific generic attribute text에서 virtual unknown semantic direction을 구성해 text-side open-set regularization을 수행합니다.

<div class="research-pipeline" aria-label="TDU text side unknown modeling 흐름">
  <span>Generic Radar Semantic Text</span><b>→</b><span>Semantic Basis</span><b>→</b><span>Virtual Unknown Directions</span><b>→</b><span>Text-side Open-set Regularization</span>
</div>

### IVU — Image-Space Virtual Unknown Modeling

IVU는 image embedding의 class boundary를 직접 regularize합니다. 현재 batch에서 known class center를 계산하고 서로 다른 known class center를 mixing해 inter-class region을 만든 뒤, 그 위치에 작은 Gaussian perturbation을 추가해 image-space virtual unknown prototype을 생성합니다.

생성한 virtual unknown이 known class center와 너무 가까워지지 않도록 margin-based separation을 적용합니다. 따라서 IVU는 실제 unknown image를 수집해 학습하는 단계가 아니라, known class 사이의 ambiguous region을 unknown-aware하게 정리하는 image-side regularization입니다.

<div class="research-pipeline" aria-label="IVU image side unknown modeling 흐름">
  <span>Known Class Centers</span><b>→</b><span>Inter-Class Mixing</span><b>→</b><span>Gaussian Perturbation</span><b>→</b><span>Virtual Unknown</span><b>→</b><span>Margin-based Separation</span>
</div>

## TDU와 IVU를 함께 사용하는 이유

TDU만 사용하면 semantic direction은 다양해지지만 image space의 실제 class boundary를 직접 제어하는 데 한계가 있습니다. 반대로 IVU만 사용하면 inter-class region을 regularize할 수 있지만 radar waveform이 가진 semantic structure를 충분히 활용하지 못할 수 있습니다.

따라서 TDU는 text side에서 semantic space를 넓히고, IVU는 image side에서 known class 사이의 경계를 정리하도록 역할을 나누었습니다. 두 regularization을 함께 사용해 known classification과 unknown rejection 사이의 균형을 개선합니다.

| 구분 | TDU | IVU |
|---|---|---|
| 공간 | Text / semantic embedding | Image embedding |
| 입력 | Attribute-aware base texts | Known class centers |
| 역할 | Unknown semantic direction 생성 | Inter-class virtual unknown 생성 |
| 효과 | Semantic space 확장 | Ambiguous class boundary separation |

## Open-Set Inference

Training 단계에서는 TDU와 IVU를 통해 virtual unknown을 사용하지만, 실제 inference에서 unknown prototype과 직접 matching하지 않습니다. Test waveform을 SPWVD TFI로 변환하고 image encoder로 embedding한 뒤, 각 known class image prototype과 similarity를 계산합니다.

Maximum similarity가 충분히 높으면 가장 가까운 known class로 분류하고, maximum similarity가 낮으면 unknown으로 rejection합니다. 개념적으로는 Unknown Score = 1 − max similarity to known prototypes로 이해할 수 있습니다.

실제 unknown waveform의 종류는 사전에 알 수 없기 때문에, 특정 virtual unknown prototype과 직접 matching하기보다 known distribution과 얼마나 가까운지를 기준으로 판단하도록 설계했습니다. Virtual unknown은 training 중 embedding space를 shaping하기 위한 것이고, inference는 known prototype에 대한 confidence를 이용합니다.

<div class="research-pipeline" aria-label="Open-set inference 결정 흐름">
  <span>Test Radar TFI</span><b>→</b><span>Image Encoder</span><b>→</b><span>Similarity to Known Prototypes</span><b>→</b><span>Maximum Similarity High: Known Class</span><b>/</b><span>Low: Unknown Reject</span>
</div>

## 실제 검증

### Single-Unknown과 Two-Unknown

Single-Unknown protocol에서는 각 waveform class를 한 번씩 unknown으로 제외하고 나머지 known class로 학습합니다. Inference에서 known waveform은 올바른 class로 분류하고, 제외된 waveform은 unknown으로 reject할 수 있는지 평가합니다.

Two-Unknown protocol에서는 두 종류의 waveform을 동시에 unknown으로 제외해 unknown diversity가 증가한 조건을 평가합니다. Single-unknown보다 어려운 조건에서도 특정 unknown waveform 하나에만 맞춘 것이 아니라 일반적인 open-set representation을 학습했는지 확인할 수 있습니다.

### Channel Robustness

채널 조건은 simulated AWGN, simulated Rayleigh fading, GNU Radio와 USRP를 이용한 measured wireless 환경으로 구성했습니다. Rayleigh에서는 multipath와 Doppler 영향을 포함하고, controlled OTA 실험에서는 waveform을 송수신한 뒤 수신 신호를 SPWVD TFI로 변환해 동일한 SAVOR recognition chain을 평가했습니다.

Measured wireless 평가는 대규모 operational radar dataset을 의미하는 것이 아니라, 실제 하드웨어와 무선 채널을 포함한 controlled OTA 검증으로 해석해야 합니다.

{{< case-figure src="figures/channel_auc_oscr.png" alt="AWGN, Rayleigh, measured wireless 조건의 AUC-OSCR 비교" type="Experiment" caption="그림 5. Simulated AWGN, simulated Rayleigh, measured wireless 조건에서 SAVOR의 AUC-OSCR을 비교한 channel robustness 결과." description="채널 왜곡과 실제 hardware impairment가 존재하는 조건에서도 open-set recognition 성능이 어떻게 유지되는지 보여준다." >}}

## 모델 및 입력 설정

본문에서는 결과 해석에 필요한 설정만 유지하고, 세부 loss weight와 noise scale은 생략했습니다.

| 항목 | 설정 |
|---|---|
| Framework | CLIP-based Vision-Language framework |
| Visual encoder | ViT-B/16 |
| Input | SPWVD 224 × 224 TFI |
| SNR evaluation | −16 dB ~ 0 dB |
| Attribute-aware base texts | 1,000 |
| Text-driven virtual unknown prototypes | 20 |
| Semantic basis dimension | 64 |

## 평가 지표

Open-set recognition은 known classification과 unknown rejection을 동시에 평가해야 하므로 Accuracy 하나만으로 판단하지 않았습니다.

- Closed-set Accuracy: known waveform만 대상으로 class recognition 성능을 평가해 open-set 학습으로 known classification이 희생되지 않았는지 확인합니다.
- AUROC / AUPRC / FPR95: known과 unknown의 분리 정도를 평가합니다. AUROC와 AUPRC는 높을수록 좋고, FPR95는 낮을수록 좋습니다.
- AUC-OSCR: threshold를 변화시키면서 known sample을 올바른 class로 인식하는 성능과 unknown sample을 known으로 받아들이는 비율 사이의 trade-off를 함께 평가하는 이 연구의 primary metric입니다.

## 주요 성과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">약 +0.05</strong><span class="research-metric-label">baseline 대비 평균 AUC-OSCR 향상</span></div>
  <div class="research-metric"><strong class="research-metric-value">최대 +0.10</strong><span class="research-metric-label">challenging low-SNR 조건의 AUC-OSCR 향상</span></div>
  <div class="research-metric"><strong class="research-metric-value">−14 ~ −4 dB</strong><span class="research-metric-label">성능 우위가 가장 뚜렷한 저 SNR 구간</span></div>
</div>

Single-Unknown 조건에서는 대부분의 SNR에서 가장 높은 AUC-OSCR을 보였고, 특히 −14 dB에서 −4 dB 사이의 저 SNR 영역에서 baseline CLIP, TCN, DSAE-MAAE와의 차이가 가장 뚜렷했습니다. Two-Unknown 조건에서도 unknown class diversity가 증가했음에도 open-set 성능 우위를 유지했습니다.

Closed-set accuracy도 높은 수준을 유지해 unknown rejection 향상이 known classification 성능을 희생해서 얻은 결과가 아님을 확인했습니다. AUROC와 AUPRC 개선, FPR95 감소를 함께 확인해 unknown rejection 성능도 별도로 평가했습니다.

{{< case-figure src="figures/single_unknown_auc_oscr.png" alt="Single-Unknown 조건의 AUC-OSCR 성능 비교" type="Result" caption="그림 6. Single-Unknown 조건에서 SAVOR와 baseline CLIP, TCN, DSAE-MAAE의 AUC-OSCR을 SNR별로 비교한 결과." description="대부분의 SNR에서 known classification과 unknown rejection을 함께 고려한 SAVOR의 성능을 비교한다." >}}

{{< case-figure src="figures/known-unknown-performance.png" alt="Known waveform classification 성능 비교" type="Result" caption="그림 7. Known waveform classification 성능을 비교해 open-set rejection 성능 향상과 known class recognition 유지 여부를 함께 확인한 결과." description="unknown rejection을 강화하면서 known waveform classification 성능이 유지되는지를 보여준다." >}}

## 연구 2와의 연결 및 연구의 한계

이전 연구에서는 reconstruction error를 이용해 학습하지 않은 waveform을 Known과 Unknown으로 구분했습니다. 하지만 구조적으로 유사한 waveform에서는 unknown도 known pattern으로 재구성될 수 있다는 한계가 있었습니다. [연구 2의 상세 페이지](../../projects/dsae-maae-unknown-radar/)에서 다룬 이 문제를 본 연구에서는 단순 unknown detection에서 open-set recognition으로 확장했습니다.

본 연구는 15종 waveform을 대상으로 한 controlled open-set protocol과 AWGN, simulated Rayleigh, controlled OTA 중심의 평가로 semantic attribute의 효과를 검증했습니다. 대규모 operational radar dataset 전체를 검증한 것은 아니며, full SAVOR를 FPGA에 구현한 연구도 아닙니다. 향후에는 더 다양한 실제 radar waveform과 channel 환경으로 확장하고, 경량화된 open-set recognition 모델의 edge 및 FPGA 적용을 검토할 수 있습니다.

## 결론

저는 이 연구에서 저 SNR open-set radar waveform recognition 문제를 정의하고, radar time-frequency structure를 semantic attribute로 표현하는 text construction 방식을 설계했습니다. Known waveform의 structural pattern과 spectral characteristic을 이용한 Stage 1 semantic alignment를 구성하고, Stage 2에서는 attribute-aware base text를 이용한 Text-Driven Unknown(TDU)과 inter-class image feature를 이용한 Image-space Virtual Unknown(IVU)을 결합했습니다.

또한 Single-Unknown과 Two-Unknown protocol으로 known classification과 unknown rejection을 함께 평가하고, AWGN, Rayleigh fading, GNU Radio·USRP 기반 measured wireless 환경으로 robustness evaluation을 확장했습니다. 이 연구의 의미는 기존의 학습된 class 중 하나를 선택하는 radar classifier와 Known / Unknown만 구분하는 anomaly detector를 넘어, known waveform은 정확하게 분류하고 학습하지 않은 waveform은 unknown으로 거부하는 open-set radar recognition을 semantic attribute와 vision-language representation으로 확장했다는 점입니다.

<div class="case-study-publication">

## Publication

Jaehyeok Yoon and Haewoon Nam, “[SAVOR: Semantic Attribute-Guided Vision-Language Framework for Open-Set Radar Waveform Recognition](../../publications/semantic-attribute-guided-open-set-radar/),” *IEEE Transactions on Aerospace and Electronic Systems*, under revision.

관련 학회 발표: Jaehyeok Yoon, Haewoon Nam, and Jaerock Kwon, “Joint Recognition of LPI Radar Signals Using a VLM with TFD-Text Alignment,” ICNGC, Da Nang, Vietnam, Dec. 2025. Best Paper Award.

</div>
