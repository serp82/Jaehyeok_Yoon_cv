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
summary: "저 SNR 환경에서 펄스를 검출하고 시간·주파수 구조를 복원해 레이더 신호의 주요 제원을 추정한 연구입니다."
image:
  filename: figures/preview.png
  alt_text: "저 SNR 레이다 신호 검출과 제원 추정 연구 개요"
  caption: "※ 본 이미지는 연구의 전체 흐름을 이해하기 쉽게 설명하기 위해 AI로 제작한 개념도이며, 실제 실험 결과 이미지는 아닙니다."
preview:
  filename: figures/radar-parameters-concept.png
  alt_text: "시간 영역과 주파수 영역에서 추정하는 레이다 파라미터"
links: []
tags:
  - pulse detection
  - parameter estimation
  - STFT
  - UNet
  - CCA
  - USRP/GNU Radio
---

## 연구 배경과 필요성

레이더 수신기는 단순히 신호가 존재한다는 사실만 알아서는 수신 신호를 충분히 분석할 수 없습니다. Radar pulse train을 분석하려면 pulse가 언제 도착했는지, 얼마나 지속되는지, 어떤 간격으로 반복되는지, 어느 주파수 범위를 점유하는지, 중심 주파수가 어디인지를 함께 추정해야 합니다.

| Parameter | 의미 |
|---|---|
| ToA | Time of Arrival, pulse가 도착한 시점 |
| PW | Pulse Width, pulse가 지속되는 시간 |
| PRI | Pulse Repetition Interval, 인접 pulse 사이의 반복 간격 |
| BW | Bandwidth, 신호가 점유하는 주파수 범위 |
| Fc | Carrier Frequency, 점유 대역의 중심 주파수 |

이 parameter들은 pulse timing과 frequency occupation을 정량화하며, 이후 radar signal analysis, waveform recognition, deinterleaving, emitter identification으로 이어지는 기본 정보입니다. 하지만 비협조적 수신 환경에서는 전파 거리, 낮은 송신 전력, interference, multipath, receiver impairment 때문에 수신 SNR이 매우 낮아질 수 있습니다.

특히 LPI radar는 낮은 송신 전력과 넓은 bandwidth, frequency agility, phase coding 등을 사용해 피탐 가능성을 낮춥니다. 저 SNR에서는 시간 영역 pulse가 noise와 거의 구분되지 않고, time-frequency image에서도 radar ridge와 pulse boundary가 scattered noise에 의해 흐려져 ToA, PW, PRI, BW, Fc의 추정 오차로 이어집니다.

<div class="research-pipeline" aria-label="저 SNR 레이다 파라미터 추정 문제 흐름">
  <span>Pulse 존재 위치 불명확</span><b>→</b><span>시간·주파수 경계 왜곡</span><b>→</b><span>Edge 추출 불안정</span><b>→</b><span>ToA · PW · PRI · BW · Fc 오차 증가</span>
</div>

## 문제 정의

### Wigner-Hough Transform 기반 방법

Wigner-Hough Transform 계열 방법은 time-frequency representation의 강한 성분이나 선형 구조를 이용해 radar signal을 추출합니다. 그러나 SNR이 매우 낮아지면 noise peak가 실제 radar component보다 강하게 나타날 수 있고, column maximum이나 line detection 과정에서 noise를 signal로 잘못 선택할 수 있습니다.

### Change Point Detection 기반 방법

Change Point Detection 기반 방법은 signal이 존재하는 frequency band를 먼저 좁힌 뒤 time-domain change point를 찾습니다. Moderate SNR에서는 효과적일 수 있지만 extremely low SNR에서는 frequency band를 정확하게 찾는 것 자체가 어려워집니다.

Band를 너무 좁히면 실제 radar component까지 제거하고, 충분히 좁히지 못하면 noise가 그대로 남아 pulse edge가 불명확해집니다. Direct learning 방식도 parameter를 직접 예측할 수 있지만, 저 SNR pulse-train structure를 충분히 보존하지 못하면 시간·주파수 경계가 무너진 상태의 오차를 그대로 학습하게 됩니다.

따라서 본 연구에서는 모든 문제를 하나의 estimator에 맡기지 않고, pulse가 어디에 있는지 찾고, 구조를 복원하고, 실제 경계를 추출한 뒤, 물리 parameter를 계산하는 단계별 처리 체계로 문제를 분리했습니다.

<div class="research-pipeline" aria-label="저 SNR 레이다 파라미터 추정의 세부 문제 흐름">
  <span>저 SNR 수신 신호</span><b>→</b><span>펄스 존재 구간 식별 어려움</span><b>→</b><span>시간·주파수 경계 왜곡</span><b>→</b><span>신호 경계 추출 실패</span><b>→</b><span>ToA · PW · PRI · BW · Fc 추정 오차 증가</span>
</div>

{{< case-figure src="figures/problem-low-snr-pulse-train.png" alt="잡음에 묻힌 저 SNR 레이다 펄스열" type="Concept" caption="그림 1. 저 SNR 환경에서 pulse train이 noise에 묻혀 pulse 존재 구간과 시간 경계가 불명확해지는 상황." description="후속 parameter estimation 전에 먼저 해결해야 하는 pulse visibility 문제를 보여준다." >}}

## Pulse Presence Detection과 Interval Localization

두 단계는 비슷해 보이지만 서로 다른 문제를 해결합니다. Pulse Presence Detection은 미리 나눈 time slot이 noise only인지 radar pulse를 포함하는지 판단하는 coarse-level binary detection입니다. 이 단계의 질문은 어느 구간을 후속 처리할 것인가입니다.

Pulse Interval Localization은 pulse가 존재한다고 판단된 구간 안에서 실제 pulse의 시작과 끝 sample 위치를 찾는 fine-level boundary estimation입니다. 이 단계의 결과가 ToA와 PW의 계산에 직접 연결되고, 인접 pulse의 경계를 이용해 PRI를 계산할 수 있게 합니다.

Pulse presence detection은 어느 구간을 볼 것인가를 결정하고, pulse interval localization은 그 안에서 실제 경계가 어디인가를 결정합니다. 따라서 처음부터 정확한 edge를 찾으려 하기보다 coarse detection과 fine localization을 분리하는 것이 저 SNR 처리에 적합합니다.

## 연구 목표

본 연구는 저 SNR 환경에서도 레이다 pulse의 존재 구간과 실제 시간·주파수 경계를 안정적으로 추출하고, 이를 바탕으로 ToA, PW, PRI, Bandwidth, Carrier Frequency를 정확하게 추정하는 것을 목표로 했습니다.

신호 전체를 하나의 network에 입력해 parameter를 직접 regression하는 대신, Pulse Presence Detection, Pulse Interval Localization, STFT Representation, UNet Denoising, CCA-based Edge Detection, Edge-based Parameter Computation으로 처리 단계를 분리했습니다. 각 단계가 검출, 복원, 구조 추출, 물리 parameter 계산이라는 서로 다른 역할을 담당하도록 설계한 것이 핵심입니다.

<div class="research-pipeline" aria-label="저 SNR 레이다 파라미터 추정 단계 흐름">
  <span>Pulse Presence Detection</span><b>→</b><span>Pulse Interval Localization</span><b>→</b><span>STFT Representation</span><b>→</b><span>UNet Denoising</span><b>→</b><span>CCA-based Edge Detection</span><b>→</b><span>Edge-based Parameter Computation</span>
</div>

{{< case-figure src="figures/radar-parameters-concept.png" alt="레이다 펄스에서 추정하는 시간과 주파수 파라미터" type="Concept" caption="그림 2. Radar pulse train에서 추정하는 시간 영역 parameter ToA, PW, PRI와 주파수 영역 parameter BW, Fc를 정리한 개념도." description="연구가 최종적으로 계산하는 시간·주파수 parameter의 의미와 물리적 관계를 보여준다." >}}

## 전체 처리 구조

전체 pipeline은 Received I/Q에서 시작해 Frequency-Domain Pulse Detection, Pulse-Relevant Time Slots, STFT, UNet Denoising, Binarization, CCA-Based Edge Detection, Edge-Based Parameter Computation으로 이어집니다.

수신 I/Q signal을 바로 parameter estimation에 사용하지 않고 먼저 짧은 time slot으로 나누어 pulse가 존재할 가능성이 높은 구간을 선별합니다. 선별된 구간만 STFT로 변환하고, UNet으로 noise를 억제하면서 radar structure를 복원합니다. Denoised STFT는 binarization과 Connected Component Analysis를 거쳐 noise component와 radar component가 분리됩니다.

Deep learning은 signal structure를 복원하는 데 사용하고, 최종 radar parameter는 복원된 구조의 물리적 경계에서 계산했습니다. 따라서 모델 하나가 ToA, PW, PRI, BW, Fc를 직접 출력하는 구조가 아니라 detection, localization, denoising, edge extraction, physical computation이 연결된 hybrid processing chain입니다.

<div class="research-pipeline" aria-label="저 SNR 레이다 파라미터 추정 전체 processing chain">
  <span>Received I/Q</span><b>→</b><span>Frequency-Domain Pulse Detection</span><b>→</b><span>Pulse-Relevant Time Slots</span><b>→</b><span>STFT</span><b>→</b><span>UNet Denoising</span><b>→</b><span>Binarization</span><b>→</b><span>CCA Edge Detection</span><b>→</b><span>Parameter Computation</span>
</div>

{{< case-figure src="figures/processing_framework.png" alt="저 SNR 수신 I/Q 신호를 파라미터 추정으로 연결하는 처리 흐름" type="Method" caption="그림 3. 수신 I/Q를 frequency-domain pulse detection, STFT, UNet denoising, binarization, CCA edge detection, parameter computation으로 연결한 전체 processing chain." description="딥러닝과 신호처리의 역할을 분리해 복원된 구조에서 물리 parameter를 계산하는 흐름을 보여준다." >}}

## 왜 주파수 영역에서 Pulse를 먼저 찾았는가

저 SNR에서는 time-domain waveform을 보면 signal amplitude가 noise와 거의 구분되지 않을 수 있습니다. 하지만 radar signal은 전체 observation bandwidth에 균일하게 퍼진 noise와 달리, frequency domain에서 상대적으로 특정 frequency range에 energy가 집중되는 특성이 남을 수 있습니다.

따라서 수신 signal을 짧은 time slot으로 나눈 뒤 각 slot의 frequency-domain amplitude를 이용해 pulse presence를 판단합니다. 이 단계의 목적은 정확한 edge를 바로 찾는 것이 아니라 후속 STFT, UNet, CCA 처리를 수행할 필요가 있는 구간만 선별하는 것입니다.

이를 통해 noise-only region을 줄이고 불필요한 time-frequency processing을 감소시키며, 후단 edge detection이 pulse-containing region에 집중하도록 합니다.

## Frequency-Domain Pulse Detection

Frequency-Domain Pulse Detector(FPD)는 단순 threshold detector가 아니라, 수신 pulse train을 여러 non-overlapping time slot으로 나눈 뒤 각 slot의 amplitude spectrum을 lightweight 1D CNN 기반 detector에 입력하는 구조입니다. Detector는 Pulse-containing slot과 Noise-only slot을 구분합니다.

Time-domain amplitude만 이용하는 것보다 저 SNR에서 남아 있는 spectral concentration을 활용하는 것이 핵심입니다. FPD의 출력은 pulse가 존재할 가능성이 높은 slot과 edge-inclusive region이며, 이 결과가 후속 STFT와 denoising의 입력 범위를 결정합니다.

즉 FPD는 최종 parameter를 계산하는 단계가 아니라, 분석할 구간을 먼저 좁혀 후속 처리의 안정성과 효율을 높이는 coarse detection 단계입니다.

## 왜 STFT를 사용했는가

Parameter estimation에서는 pulse 시작·종료 시점, pulse duration, pulse 간 시간 간격, occupied frequency range, center frequency를 함께 관찰해야 합니다. STFT는 time axis와 frequency axis를 동시에 표현하므로 pulse의 시간적 boundary와 frequency occupation을 하나의 representation에서 분석할 수 있습니다.

본 연구에서 STFT는 딥러닝 classifier용 이미지가 아니라, 물리적 시간·주파수 경계를 추출하기 위한 중간 representation입니다. 따라서 이후 UNet이 radar ridge와 pulse boundary를 복원할 수 있을 정도로 구조가 보존되는지가 중요합니다.

## UNet-Based Denoising

저 SNR STFT에서는 signal ridge 주변뿐 아니라 image 전체에 random noise component가 나타납니다. 이 상태에서 threshold나 CCA를 바로 적용하면 noise component가 radar structure로 남거나, 실제 pulse edge가 여러 조각으로 끊길 수 있습니다. 따라서 edge extraction 전에 time-frequency representation을 먼저 복원해야 합니다.

UNet은 noisy STFT image를 입력으로 받아 clean reference STFT를 target으로 학습하고, radar structure는 유지하면서 noise component를 억제하도록 사용했습니다. Encoder-decoder 구조와 skip connection을 통해 전체적인 time-frequency structure를 복원하면서도 fine boundary information을 보존할 수 있다는 점이 장점입니다.

UNet의 output은 ToA나 PW 같은 parameter 값이 아니라 denoised time-frequency representation입니다. 최종 parameter는 이 복원 결과에 대해 후단 signal processing을 적용해 계산합니다.

## CCA-Based Edge Detection

UNet output을 그대로 parameter 계산에 사용하지 않는 이유는 denoising 후에도 일부 scattered noise component가 남을 수 있기 때문입니다. Radar pulse structure는 noise에 비해 time-frequency domain에서 더 연속적인 component를 형성하는 경향이 있으므로, 복원 결과에서 연결 구조를 추가로 확인해야 합니다.

Denoised STFT를 Otsu thresholding 등으로 binarization한 뒤 Connected Component Analysis(CCA)를 적용합니다. CCA는 연결된 pixel group을 component로 labeling하고, 너무 작은 component를 제거해 random noise와 radar structure를 분리합니다.

Frequency hopping이나 Costas처럼 구조가 불연속적으로 보일 수 있는 waveform에는 time·frequency axis의 작은 gap을 보완해 실제 radar structure가 끊기지 않도록 처리합니다. UNet이 noise를 약화시키고 CCA가 남은 구조 중 연속적인 radar component를 선택하는 방식으로 두 단계의 역할을 분리했습니다.

## Edge-Based Parameter Computation

복원된 radar structure에서 추출한 time-axis와 frequency-axis edge를 물리 parameter로 변환합니다. AI가 ToA나 BW를 직접 생성하는 것이 아니라, AI로 복원한 signal structure에서 해석 가능한 edge를 찾고 그 관계를 이용해 계산합니다.

| 영역 | Parameter | 계산 기준 |
|---|---|---|
| Time | ToA | pulse의 시작 edge 위치 |
| Time | PW | 동일 pulse의 end edge − start edge |
| Time | PRI | 인접 pulse의 기준 edge 간 시간 차이 |
| Frequency | BW | upper frequency edge − lower frequency edge |
| Frequency | Fc | upper·lower frequency edge의 중심 |

{{< case-figure src="figures/edge_based_parameter_estimation.png" alt="복원된 레이다 구조에서 펄스 경계와 파라미터를 계산하는 과정" type="Method" caption="그림 4. 복원된 time-frequency structure에서 pulse의 시간·주파수 경계를 추출하고 ToA, PW, PRI, BW, Fc를 계산하는 과정." description="edge label과 frequency structure를 이용해 물리 parameter를 직접 계산하는 후단 signal-processing 흐름을 보여준다." >}}

## 핵심 아이디어

1. Pulse 존재 구간을 먼저 찾았습니다. 전체 I/Q stream을 모두 time-frequency processing하지 않고, 저 SNR에서도 상대적으로 남아 있는 frequency-domain 특징을 이용해 pulse-containing slot을 선별했습니다.
2. Pulse detection과 실제 edge localization을 분리했습니다. “pulse가 이 구간에 있다”는 coarse 판단과 “실제 시작·끝 위치가 어디인가”라는 fine estimation을 분리해 후속 ToA, PW, PRI 계산과 연결했습니다.
3. 딥러닝은 구조 복원에 집중시켰습니다. UNet이 ToA나 PW를 직접 예측하게 하지 않고, noise에 묻힌 STFT structure를 clean reference에 가깝게 복원하도록 사용했습니다.
4. 최종 parameter는 signal processing으로 계산했습니다. CCA와 edge-based computation으로 복원된 radar structure의 물리적 경계를 추출하고 이를 ToA, PW, PRI, BW, Fc로 변환했습니다.

## 실험 파형 및 파라미터 구성

<div class="experiment-config">
  <p class="experiment-config-lead">500 kHz sampling의 pulse train을 기반으로 17개 intrapulse-modulation(IPM) waveform을 구성했습니다. 각 파형을 여러 생성 조건에서 변화시키고 SNR −20~10 dB 범위에서 pulse boundary와 주요 parameter 추정 성능을 평가했습니다.</p>
  <div class="experiment-config-table-wrap" tabindex="0">
    <table class="experiment-config-table">
      <caption>연구 1 시뮬레이션 파형 구성</caption>
      <thead>
        <tr>
          <th scope="col">파형군</th>
          <th scope="col">사용 파형</th>
          <th scope="col">주요 생성 파라미터</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>FM</td>
          <td>LFM</td>
          <td><code>B: fs/10–fs/8</code> · <code>Sweep: Up / Down / Triangle</code></td>
        </tr>
        <tr>
          <td>FM</td>
          <td>NLFM</td>
          <td><code>B: fs/10–fs/8</code> · <code>Pattern: Sine / 2nd / 3rd</code></td>
        </tr>
        <tr>
          <td>FSK</td>
          <td>FSK2, FSK4</td>
          <td><code>M: 2 / 4</code> · <code>fmin: fs/32–fs/25</code></td>
        </tr>
        <tr>
          <td>Frequency Hopping</td>
          <td>Costas (COS6, COS10)</td>
          <td><code>M: 6 / 10</code> · <code>fmin: fs/32–fs/25</code></td>
        </tr>
        <tr>
          <td>Phase Code</td>
          <td>Barker</td>
          <td><code>Code length: 7 / 11 / 13</code></td>
        </tr>
        <tr>
          <td>Polyphase</td>
          <td>Frank, P1–P4</td>
          <td><code>Ncpp</code>, code size, compression ratio 등 파형별 변화</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="experiment-config-note">모든 파형의 carrier frequency는 <code>fc: fs/6–2fs/5</code> 범위에서 생성했습니다. P1–P4의 세부 조합은 파형군 수준으로 압축해 표시했으며, 원 논문의 Table 1을 기준으로 구성했습니다.</p>
  <div class="experiment-config-target"><strong>추정 대상</strong><span><code>ToA · PW · PRI · Bandwidth · Carrier Frequency</code></span></div>
  <div class="experiment-config-summary" aria-label="연구 1 실험 요약">
    <span class="experiment-config-chip">17 waveform types</span>
    <span class="experiment-config-chip">fs 500 kHz</span>
    <span class="experiment-config-chip">PW 1–10 ms</span>
    <span class="experiment-config-chip">Duty cycle 20%</span>
    <span class="experiment-config-chip">SNR −20~10 dB</span>
  </div>
</div>

## Experiments(시뮬레이션)

Simulation은 17종 intrapulse-modulation waveform, pulse width 1–10 ms, SNR −20–10 dB 조건으로 구성했습니다. Waveform·SNR별 100개 pulse train을 사용해 총 52,700 samples를 구성했고, train·validation·test split은 8:1:1로 유지했습니다.

다양한 modulation type과 parameter variation을 포함해 특정 waveform에만 맞춰진 estimator가 되지 않도록 했습니다. 특히 SNR을 −20 dB까지 낮춰 기존 방법이 불안정해지는 영역에서도 pulse detection과 parameter estimation을 평가했습니다.

평가는 noise-only slot과 pulse-containing slot을 구분하는 Detection 성능과 ToA, PW, PRI, BW, Fc의 RMSE를 비교하는 Parameter Estimation 성능으로 나누어 진행했습니다.

## 왜 AUC를 Detection Metric으로 사용했는가

FPD의 첫 번째 역할은 time slot을 Pulse와 Noise로 구분하는 것입니다. 따라서 특정 threshold 하나에서의 accuracy만 보기보다 decision threshold 전체에서 pulse-containing slot과 noise-only slot을 얼마나 잘 분리하는지 확인하기 위해 ROC-AUC를 사용했습니다.

대표 결과는 AUC 0.912 at −18 dB, AUC 0.964 at −15 dB입니다. 이 수치는 최종 ToA, PW, PRI의 정확도가 아니라 후속 parameter estimation에 필요한 pulse 구간을 얼마나 안정적으로 찾는지를 보여주는 detection metric입니다.

{{< case-figure src="figures/pulse_detection_auc.png" alt="SNR에 따른 frequency-domain pulse detection AUC 비교" type="Result" layout="wide" caption="그림 5. SNR 변화에 따른 pulse detection AUC 비교. FPD는 저 SNR에서도 후속 parameter estimation에 필요한 pulse-containing slot을 안정적으로 선별한다." description="AUC는 parameter RMSE가 아니라 Pulse와 Noise slot을 threshold 전반에서 분리하는 detection metric이다." >}}

### 파라미터 추정 결과

시뮬레이션에서 다섯 parameter의 추정 결과를 각각 확인했습니다. ToA, PW, PRI, BW, Fc는 모두 SNR이 높아질수록 오차가 감소하며, 제안 방법은 비교 방법과 denoising ablation보다 저 SNR에서 안정적인 경향을 보입니다.

<div class="case-study-result-grid case-study-result-grid--five" aria-label="시뮬레이션 기반 ToA, PW, PRI, BW, Fc parameter estimation results">

{{< case-figure src="figures/result-toa.jpg" alt="저 SNR 조건에서 ToA를 추정한 시뮬레이션 결과" type="Result" caption="ToA 추정 결과" description="제안 방법과 비교 방법의 ToA RMSE를 비교합니다." >}}

{{< case-figure src="figures/result-pw.jpg" alt="저 SNR 조건에서 PW를 추정한 시뮬레이션 결과" type="Result" caption="PW 추정 결과" description="제안 방법과 비교 방법의 PW RMSE를 비교합니다." >}}

{{< case-figure src="figures/result-pri.jpg" alt="저 SNR 조건에서 PRI를 추정한 시뮬레이션 결과" type="Result" caption="PRI 추정 결과" description="제안 방법과 비교 방법의 PRI RMSE를 비교합니다." >}}

{{< case-figure src="figures/result-bw.jpg" alt="저 SNR 조건에서 BW를 추정한 시뮬레이션 결과" type="Result" caption="BW 추정 결과" description="제안 방법과 비교 방법의 BW RMSE를 비교합니다." >}}

{{< case-figure src="figures/result-fc.jpg" alt="저 SNR 조건에서 Fc를 추정한 시뮬레이션 결과" type="Result" caption="Fc 추정 결과" description="제안 방법과 비교 방법의 Fc RMSE를 비교합니다." >}}

</div>

## Measurements(실측)

Simulation 이후 GNU Radio와 USRP-2920 두 대로 TX/RX test-bed를 구성해 실제 무선 수신 환경을 평가했습니다. Center frequency는 910 MHz, sampling rate는 500 kHz이며, 기존 설정에 따라 송신 waveform을 OTA로 전달한 뒤 수신 I/Q에 동일한 detection, denoising, edge extraction, parameter computation chain을 적용했습니다.

실제 OTA 환경에는 ideal AWGN만 있는 것이 아니라 fading, interference, oscillator mismatch, DC component, receiver hardware impairment가 함께 포함될 수 있습니다. 따라서 이 실험의 목적은 simulation accuracy를 그대로 재현하는 것이 아니라, 실제 wireless distortion이 존재해도 동일한 processing chain이 끝까지 동작하는지 확인하는 데 있습니다.

<div class="research-pipeline" aria-label="USRP GNU Radio 저 SNR 검증 흐름">
  <span>Radar Signal Generation</span><b>→</b><span>USRP TX</span><b>→</b><span>Wireless Channel</span><b>→</b><span>USRP RX</span><b>→</b><span>DC Removal</span><b>→</b><span>Power / SNR Measurement</span><b>→</b><span>Parameter Estimation Chain</span>
</div>

{{< case-figure src="figures/usrp-testbed-photo.png" alt="GNU Radio와 두 대의 USRP-2920으로 구성한 저 SNR 송수신 실험 장비" type="Experiment" caption="그림 6. GNU Radio와 두 대의 USRP-2920을 이용해 구성한 저 SNR radar pulse-train OTA test-bed." description="시뮬레이션을 넘어 실제 wireless channel과 receiver hardware 영향이 포함된 환경에서 전체 처리 체인을 검증한 구성이다." >}}

### 실측 결과

실환경 OTA에서는 시뮬레이션과 같은 처리 체인을 적용한 뒤, 각 parameter의 Simulation/Test-bed RMSE를 비교했습니다. 무선 채널과 수신기 hardware 영향으로 test-bed 오차가 더 크게 나타날 수 있지만, SNR이 높아질수록 다섯 parameter 모두 안정적으로 감소하는 경향을 확인할 수 있습니다.

<div class="case-study-result-grid case-study-result-grid--five" aria-label="Simulation과 실환경 Test-bed의 parameter estimation results">

{{< case-figure src="figures/testbed-result-toa.jpg" alt="ToA simulation과 test-bed RMSE 비교" type="Result" caption="ToA · Simulation / Test-bed" description="실환경 무선 수신에서 ToA RMSE가 SNR에 따라 감소하는 경향을 비교합니다." >}}

{{< case-figure src="figures/testbed-result-pw.jpg" alt="PW simulation과 test-bed RMSE 비교" type="Result" caption="PW · Simulation / Test-bed" description="실환경 무선 수신에서 PW RMSE가 SNR에 따라 감소하는 경향을 비교합니다." >}}

{{< case-figure src="figures/testbed-result-pri.jpg" alt="PRI simulation과 test-bed RMSE 비교" type="Result" caption="PRI · Simulation / Test-bed" description="실환경 무선 수신에서 PRI RMSE가 SNR에 따라 감소하는 경향을 비교합니다." >}}

{{< case-figure src="figures/testbed-result-bw.jpg" alt="BW simulation과 test-bed RMSE 비교" type="Result" caption="BW · Simulation / Test-bed" description="실환경 무선 수신에서 BW RMSE가 SNR에 따라 감소하는 경향을 비교합니다." >}}

{{< case-figure src="figures/testbed-result-fc.jpg" alt="Fc simulation과 test-bed RMSE 비교" type="Result" caption="Fc · Simulation / Test-bed" description="실환경 무선 수신에서 Fc RMSE가 SNR에 따라 감소하는 경향을 비교합니다." >}}

</div>

## 연구의 한계

본 연구는 simulation과 controlled USRP/GNU Radio test-bed를 이용해 저 SNR parameter estimation을 검증했습니다. 실제 measured environment에서는 extremely low SNR에서 fading, interference, hardware impairment로 인해 simulation 대비 performance degradation이 나타날 수 있습니다.

또한 2D STFT와 UNet processing은 전통적인 lightweight estimator보다 연산량이 증가할 수 있습니다. 향후에는 더 다양한 실제 radar data, simulation-to-measurement domain gap 감소, lightweight denoising, embedded implementation으로 확장할 수 있습니다.

## 결론

저는 이 연구에서 저 SNR radar pulse train의 parameter estimation 문제를 Pulse Presence Detection, Pulse Interval Localization, Time-Frequency Denoising, Edge Extraction, Parameter Computation의 단계로 분해하고 전체 processing chain을 설계했습니다.

주파수 영역의 spectral concentration을 이용해 pulse-containing slot을 선별하고, 검출된 구간을 STFT로 변환한 뒤 UNet denoising과 CCA-based edge extraction으로 noise에 묻힌 radar structure를 복원했습니다. 복원된 time·frequency edge에서 ToA, PW, PRI, BW, Fc를 물리적인 관계로 계산하고, 다양한 waveform과 SNR 조건의 simulation dataset에서 WHT, CPD, DAT-Net과 비교했습니다.

또한 GNU Radio와 USRP-2920 기반 OTA test-bed를 구성해 실제 wireless channel과 hardware impairment가 포함된 환경에서도 동일한 detection–restoration–estimation chain을 검증했습니다. 이 연구의 의미는 하나의 AI model이 parameter를 직접 출력하도록 하는 것이 아니라, 저 SNR 신호에서 분석 가능한 구간을 찾고 noise에 묻힌 구조를 복원한 뒤 물리적 경계를 해석 가능한 radar parameter로 변환하는 end-to-end signal-processing framework를 설계했다는 점입니다.

<div class="case-study-publication">

## 관련 성과

Jaehyeok Yoon, Siho Lee, Woojin Yun, and Haewoon Nam, “[High-Accuracy Radar Parameter Estimation Under Low SNR Environments](../../publications/lpi-radar-parameter-estimation/),” *IEEE Access*, vol. 13, pp. 171170–171184, 2025.

윤재혁, 정재연, 김규한, 이원진, 백지현, 서동호, 윤우진, 남해운 (2024). “[Carrier Frequency Estimation of Low SNR Radar Signal Based on Denoising Autoencoder and DBSCAN](../../publications/carrier-frequency-estimation/).” *The Journal of Korean Institute of Communications and Information Sciences*, 49(7), 923-926.

딥러닝 기반 저피탐 레이더 신호의 잡음 제거 및 파라미터 추출 방법, 이를 수행하는 장치 및 컴퓨터 프로그램, 출원번호(대한민국) 10-2024-0092816 · 2024.07.15.

</div>
