---
layout: project
type: project
title: "FPGA/RFNoC 기반 레이더 신호처리 구현"
english_title: "Implementation of an RFNoC/FPGA-Based LPI Radar Pulse-Train Detector and Classifier"
slug: "rfnoc-fpga-radar-detector-classifier"
order: 4
project_number: "04"
project_stage: "Software → RFNoC/FPGA → OTA 검증 · 2024–2026"
research_year: "2024–2026"
project_role: "RFNoC/FPGA 구현 · OTA 실험 · 소프트웨어 기준 비교"
hero_claim: "소프트웨어에서 검증한 저 SNR 레이다 처리 알고리즘을 fixed-point STFT, RFNoC detector, HLS CNN 기반 SDR/FPGA 수신 체인으로 확장했습니다."
research_question: "레이다 detector–classifier 체인을 실시간 FPGA streaming 구조로 구현하고 OTA 환경에서 종단간 일치성을 검증할 수 있는가?"
result_highlight: "3,600개 OTA records · Pcov95 99.25% · End-to-End accuracy 93.14%"
technology_tags:
  - RFNoC
  - FPGA
  - HLS
  - USRP / OTA
publication_refs:
  - /publications/rfnoc-fpga-lpi-detection/
summary: "STFT 기반 detector와 CNN classifier를 RFNoC/FPGA streaming processing chain으로 구현하고 OTA 환경에서 소프트웨어 기준 구현과 비교한 연구입니다."
image:
  filename: figures/preview.png
  alt_text: "RFNoC와 FPGA 기반 레이다 펄스 검출·분류 스트리밍 아키텍처"
  caption: "※ 본 이미지는 연구의 전체 흐름을 이해하기 쉽게 설명하기 위해 AI로 제작한 개념도이며, 실제 실험 결과 이미지는 아닙니다."
links: []
tags:
  - RFNoC
  - FPGA
  - HLS
  - SDR
  - STFT
  - CNN
  - OTA validation
---

## 연구 배경과 필요성

딥러닝 기반 레이다 신호처리 알고리즘은 Python이나 PyTorch 환경에서 높은 성능을 보여도, 실제 SDR/FPGA 수신기에 적용하려면 별도의 구현 문제가 발생합니다. 실제 수신기에서는 I/Q sample이 연속적인 stream으로 입력되고, 제한된 FPGA resource와 memory 안에서 데이터 이동과 연산을 streaming 방식으로 처리해야 합니다.

Floating-point software algorithm을 fixed-point hardware로 옮기면 quantization과 arithmetic 차이로 인해 검출 위치나 classification output이 달라질 수 있습니다. 따라서 실제 시스템 적용 가능성을 확인하려면 CNN 분류 정확도만 볼 것이 아니라 I/Q stream 처리, pulse-train interval, packet 전달, hardware accuracy, end-to-end 성능과 FPGA resource를 함께 검증해야 합니다.

## 문제 정의

저 SNR LPI radar에서는 detector와 classifier를 독립적으로 평가하기 어렵습니다. 분류기의 입력은 detector가 선택한 pulse-train interval에서 만들어지기 때문에, 검출 구간이 조금만 달라져도 후단 STFT feature와 CNN classification 결과가 달라질 수 있습니다.

즉, 이 연구는 software CNN 하나를 FPGA로 옮기는 문제가 아니라 OTA I/Q stream에서 STFT, pulse detection, feature generation, CNN classification으로 이어지는 전체 data path의 동작을 일관되게 유지하는 문제입니다.

<div class="research-pipeline" aria-label="RFNoC FPGA 구현 문제 흐름">
  <span>Software Algorithm</span><b>→</b><span>Fixed-point / Quantization</span><b>→</b><span>Packetized Streaming</span><b>→</b><span>FPGA Resource Constraints</span><b>→</b><span>Detection / Classification 결과 변화 가능</span>
</div>

검증의 기준은 Software Reference와 RFNoC/FPGA Implementation을 서로 다른 데이터로 비교하는 것이 아니라, 동일한 OTA 수신 기록에 두 구현을 적용해 algorithm behavior가 얼마나 보존되는지를 직접 확인하는 것입니다.

## 연구 목표

본 연구는 저 SNR OTA 레이다 펄스열을 대상으로 STFT 기반 pulse detection과 CNN 기반 waveform classification을 RFNoC/FPGA processing chain으로 구현하고, Python/PyTorch reference implementation과의 결과 일치성을 검증하는 것을 목표로 했습니다.

단순히 CNN 하나를 FPGA에 올리는 것이 아니라 OTA received I/Q부터 fixed-point STFT, RFNoC pulse detector, STFT feature generation, HLS CNN classifier, 15-class output으로 이어지는 전체 처리 흐름을 구성했습니다. 검증에서는 detector interval consistency, packet reliability, classification accuracy, end-to-end performance, FPGA resource usage를 함께 평가했습니다.

<div class="research-pipeline" aria-label="RFNoC FPGA 레이다 신호처리 전체 흐름">
  <span>OTA Received I/Q</span><b>→</b><span>Fixed-point STFT</span><b>→</b><span>RFNoC Pulse Detector</span><b>→</b><span>STFT Feature Generation</span><b>→</b><span>HLS CNN Classifier</span><b>→</b><span>15-Class Output</span>
</div>

## 전체 시스템 구조

USRP transmitter에서 생성한 radar waveform을 OTA channel로 송신하고, receiver에서 획득한 I/Q stream을 FPGA/RFNoC processing chain으로 전달합니다. FPGA 내부에서는 fixed-point STFT 생성, pulse-train interval detection, detected interval 기반 classifier feature 생성, HLS CNN inference가 순차적으로 수행됩니다.

Host에서 신호를 저장한 뒤 별도로 처리하는 구조가 아니라, RFNoC의 packetized streaming 구조 안에서 검출과 분류에 필요한 데이터가 단계별로 전달되도록 구현했습니다. 다만 이 결과를 완전한 standalone embedded radar system이나 상용 real-time receiver의 완성으로 표현하기보다, 평가한 OTA 조건에서 target RFNoC/FPGA platform에 processing chain을 통합하고 software reference의 동작을 가깝게 재현한 검증으로 해석합니다.

{{< case-figure src="figures/rfnoc_processing_architecture.png" alt="Radar TX부터 RFNoC FPGA detector와 CNN classifier까지 연결한 스트리밍 아키텍처" type="System" caption="그림 1. Radar TX, OTA channel, RX를 거쳐 FPGA/RFNoC의 STFT, pulse detection, CNN classification, 15-class output으로 이어지는 전체 processing chain." description="Host에서 분리 처리하지 않고 RFNoC streaming path 안에서 수신부터 결과 출력까지 연결한 시스템 구조를 보여준다." >}}

## 왜 RFNoC를 사용했는가

USRP의 RFNoC는 사용자 정의 FPGA processing block을 radio receive path와 host software에 연결할 수 있는 streaming framework입니다. 본 연구에서는 RFNoC를 이용해 STFT processing, detector, classifier 사이의 data flow를 packet 단위로 연결했습니다.

RFNoC를 사용하는 이유는 단순히 FPGA에서 연산하기 위해서가 아니라 Radio I/O, Custom FPGA Processing, Host Control을 하나의 SDR processing chain 안에서 연결하기 위해서입니다. 따라서 algorithm result뿐 아니라 packet framing, block 간 stream 전달, classifier input packet 생성, output packet 반환이 정상적으로 유지되는지도 함께 확인해야 합니다.

## STFT 기반 Pulse-Train Detection

수신된 fixed-point I/Q sample은 128-sample window 단위로 처리하고 Xilinx 128-point FFT 기반 STFT를 생성합니다. Detector 경로에서는 각 STFT frame의 유효 frequency bin에서 maximum power를 추출해 전체 영상을 저장하지 않고 1차원 detection score stream으로 축약합니다.

기본 detector 설정은 FFT 128-point, 16-sample hop, 64 frequency bins, 4-bin DC notch입니다. 3-frame smoothing으로 단일 frame noise의 영향을 완화하고 threshold를 넘는 연속 구간을 candidate로 추적한 뒤, 그중 maximum score를 갖는 구간을 선택해 pulse-train detection interval을 계산합니다.

Detector는 detection 여부, raw start/end, expanded start/end, maximum score를 후단으로 전달합니다. Expanded interval은 후단 classifier가 pulse train 전체를 충분히 포함하는 fixed-size feature를 만들 수 있도록 사용됩니다. 따라서 detector의 출력은 단순 binary result가 아니라 후단 CNN input 위치를 결정하는 metadata입니다.

## CNN 입력용 64 × 31 STFT Feature

Detector STFT와 classifier STFT는 같은 설정을 반복하는 것이 아니라 서로 다른 목적에 맞게 분리했습니다. Detector는 pulse 위치를 정밀하게 찾는 것이 목적이므로 16-sample hop을 사용하고, classifier는 CNN에 입력할 고정 크기 representation을 만드는 것이 목적이므로 별도의 STFT configuration을 사용합니다.

Detector가 전달한 expanded interval에서 2,048-sample fixed interval을 구성한 뒤 128-point FFT, 64-sample hop, 64 frequency bins, 31 time frames를 사용해 1 × 64 × 31 STFT magnitude feature를 생성합니다. 이 feature는 uint8 형식으로 packing되어 RFNoC CNN classifier에 전달됩니다.

즉 작은 hop의 detector와 고정 크기의 classifier input을 분리해, 시간 위치 검출의 정밀도와 CNN 입력 형식의 일관성을 동시에 확보했습니다.

## CNN Classifier의 FPGA 구현

Classifier는 1 × 64 × 31 STFT magnitude를 입력으로 받아 15개 radar waveform class를 분류합니다. 모델 구조는 Conv1 1→16, Conv2 16→32, Conv3 32→64, Conv4 64→96, Global Average Pooling, Fully Connected 15-class output 수준으로 구성했습니다.

이 연구의 핵심은 새로운 CNN 구조를 제안하는 것이 아니라, floating-point PyTorch network를 FPGA arithmetic과 resource constraint에 맞는 hardware-friendly representation으로 변환하는 데 있습니다. Weight는 int8, bias는 int32, activation은 uint8로 양자화하고, Batch Normalization parameter는 convolution weight와 bias에 folding해 별도의 normalization 경로를 제거했습니다.

CNN inference는 HLS 기반으로 구현했으며, convolution 연산은 4-way channel parallel과 time-multiplexed MAC 구조를 사용했습니다. 따라서 software network를 단순히 복사한 것이 아니라 quantization, operation folding, parallelism을 적용해 FPGA에서 실행 가능한 형태로 변환했습니다.

## Software Reference와 Hardware 비교

Python/PyTorch reference와 RFNoC/FPGA implementation은 정확히 같은 OTA RX record를 사용했습니다. 따라서 두 결과의 차이를 dataset 차이가 아니라 STFT, fixed-point arithmetic, packetized streaming, quantized CNN 구현에서 발생하는 implementation 차이로 해석할 수 있습니다.

비교 항목은 detector의 interval match와 Pcov95, classifier의 packet success와 classification accuracy, 통합 chain의 Accuracy at Pcov95와 E2E at Pcov95, 그리고 FPGA의 LUT·FF·BRAM·DSP resource입니다.

| 단계 | 비교 지표 |
|---|---|
| Detector | Interval Match, Pcov95 |
| Classifier | Packet Success, Classification Accuracy |
| Integrated chain | Accuracy at Pcov95, E2E at Pcov95 |
| Hardware | LUT, FF, BRAM, DSP |

## Pcov95와 End-to-End 평가

이 연구에서 detector의 목적은 pulse train의 시작과 끝을 pixel 또는 sample 단위로 완벽하게 맞히는 것 자체가 아닙니다. 후단 CNN classification을 위해 실제 pulse train이 충분히 포함된 interval을 제공하는 것이 더 중요합니다.

Pcov95는 전체 ground-truth pulse-train interval의 95% 이상을 detected interval이 포함한 record의 비율입니다. 즉 detector output이 후단 classifier input을 만들기에 충분한 signal interval을 확보했는지를 평가하는 지표입니다.

Detector가 잘 동작해도 classifier가 틀리면 전체 radar processing chain은 실패합니다. 반대로 classifier accuracy가 높아도 detector가 pulse interval을 충분히 포함하지 못하면 실제 pipeline에서는 정상 분류가 불가능합니다. 따라서 E2E at Pcov95는 충분한 pulse interval 검출과 올바른 waveform classification을 동시에 만족한 비율을 나타내는 system-level metric으로 사용했습니다.

## 실제 검증 환경

OTA evaluation은 15개 radar waveform class, −4·−2·0·2·4·6·8·10 dB의 8개 target SNR 조건, waveform·SNR별 30 records, 총 3,600개 RX records로 구성했습니다. Center frequency는 920 MHz, sampling rate는 500 kS/s이며, OTA 송수신에는 NI USRP-2944의 RIO0와 RIO1을 TX와 RX로 사용했습니다.

RFNoC/FPGA 검증은 X300/X310 계열 RFNoC image 환경에서 수행했고, target FPGA는 Xilinx Kintex-7 XC7K410T입니다. Custom RFNoC processing block의 reference clock은 214.286 MHz로 설정했습니다. OTA collection 장비와 RFNoC target platform을 혼동해 모든 실험이 하나의 X310에서 이루어졌다고 단순화하지 않았습니다.

{{< case-figure src="figures/sdr-test-hardware.jpg" alt="USRP 송수신기와 RFNoC FPGA 처리를 포함한 SDR 실험 환경" type="Experiment" caption="그림 2. USRP 기반 OTA 송수신과 RFNoC/FPGA 처리를 검증하기 위해 구성한 실제 SDR 실험 환경." description="실제 무선으로 수집한 I/Q stream을 software reference와 hardware processing chain에 동일하게 입력했다." >}}

## 주요 성과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">99.25%</strong><span class="research-metric-label">Pcov95 · OTA detector coverage</span></div>
  <div class="research-metric"><strong class="research-metric-value">93.69%</strong><span class="research-metric-label">RFNoC/FPGA classification accuracy</span></div>
  <div class="research-metric"><strong class="research-metric-value">93.14%</strong><span class="research-metric-label">E2E at Pcov95 · 15 waveforms</span></div>
</div>

3,600개 OTA RX record 모두에서 RFNoC detector가 software reference와 동일한 detection interval을 출력했습니다. Pcov95도 software와 FPGA 모두 99.25%로 동일했고, classifier input/output packet 역시 전체 3,600개 record에서 정상 처리되었습니다.

Python/PyTorch classification accuracy는 94.08%, RFNoC/FPGA classification accuracy는 93.69%로 차이는 −0.39%p였습니다. Python/PyTorch E2E at Pcov95는 93.50%, RFNoC/FPGA는 93.14%로 차이는 −0.36%p였습니다. 따라서 이 결과는 FPGA가 software보다 우수했다는 의미가 아니라, quantization과 hardware inference를 적용한 뒤에도 software reference의 detector–classifier behavior를 가깝게 보존했다는 의미로 해석합니다.

{{< case-figure src="figures/classification-performance.png" alt="Python/PyTorch와 RFNoC FPGA 구현의 레이다 분류 및 종단간 성능 비교" type="Result" caption="그림 3. 동일한 OTA 수신 기록에서 Python/PyTorch reference와 RFNoC/FPGA implementation의 classification 및 end-to-end 성능을 비교한 결과." description="하드웨어 구현 후에도 software reference와 가까운 분류 성능과 종단간 처리 결과를 유지했는지 보여준다." >}}

## SNR별 Classification 결과

−4 dB부터 10 dB까지의 OTA 조건에서 Python/PyTorch reference와 RFNoC/FPGA classifier는 대부분 유사한 accuracy curve를 보였습니다. 저 SNR에서 두 구현의 accuracy가 함께 떨어지는 현상은 FPGA implementation 자체의 오류라기보다 OTA channel condition과 STFT magnitude representation의 한계가 함께 반영된 결과로 해석할 수 있습니다.

전체 classification difference가 0.39%p에 그쳤고, SNR이 증가할수록 두 구현의 결과가 가까워지는 경향을 확인했습니다. 이는 fixed-point와 quantized HLS inference를 적용한 뒤에도 SNR 변화에 따른 software algorithm의 성능 추세가 hardware에서 유지되었음을 보여줍니다.

## FPGA Resource 사용량

Resource 결과는 숫자를 나열하는 데 그치지 않고, base RFNoC/USRP image에 detector·classifier·STFT processing block을 단계적으로 추가했을 때 어떤 자원이 증가하는지로 해석했습니다.

| 구성 | LUT | FF | BRAM | DSP |
|---|---:|---:|---:|---:|
| 최종 통합 image | 165,257 | 253,030 | 641 | 475 |
| Base RFNoC/USRP 대비 전체 증가 | +26,041 | +37,519 | +157 | +106 |
| Detector 추가 | +9,321 | +13,979 | +11.5 | +0 |
| Classifier 추가 | +14,084 | +19,954 | +120 | +93 |
| STFT 추가 | +2,636 | +3,586 | +25.5 | +13 |

BRAM과 DSP 증가의 대부분은 CNN classifier 구현에서 발생했고, STFT processing stage의 추가 resource는 classifier 대비 상대적으로 제한적이었습니다. 이 결과는 STFT → Detector → Classifier chain이 target RFNoC/FPGA image 안에 통합 가능한 수준임을 보여주지만, 다른 대규모 모델도 충분히 탑재할 수 있다는 의미로 확대 해석하지 않았습니다.

## 핵심 아이디어

1. Detector만 또는 CNN만 FPGA에 구현하는 대신 OTA I/Q 입력부터 STFT, pulse interval detection, feature generation, CNN classification으로 이어지는 전체 streaming chain을 RFNoC block으로 연결했습니다.
2. Fixed-point FFT와 quantized CNN을 사용하면서도 동일한 3,600개 OTA record에서 detection interval과 classification result를 Python/PyTorch reference와 직접 비교해 software behavior preservation을 확인했습니다.
3. Classification accuracy뿐 아니라 interval match, Pcov95, packet success, end-to-end accuracy, FPGA resource usage를 함께 평가해 system-level reliability를 검증했습니다.

## 연구 1~3과의 연결

앞선 연구에서는 저 SNR 레이다 신호의 검출·파라미터 추정, 미지 파형 탐지, open-set recognition 알고리즘을 중심으로 연구했습니다. 본 연구에서는 그와 별도로 실제 수신기 구현 관점에서 STFT 기반 detector와 CNN classifier를 선택해 RFNoC/FPGA processing chain으로 구현하고, software에서 검증한 신호처리 알고리즘이 hardware에서도 일관된 동작을 유지할 수 있는지를 평가했습니다.

따라서 연구 1의 UNet·CCA 전체 구조, 연구 2의 DSAE-MAAE, 연구 3의 SAVOR 전체 network를 FPGA에 구현한 연구는 아닙니다. 이 프로젝트의 구현 대상은 STFT 기반 pulse-train detector와 CNN waveform classifier로 이어지는 별도의 hardware-oriented processing chain입니다.

## 연구의 한계

본 연구는 15개 waveform과 −4~10 dB의 controlled OTA dataset을 이용해 implementation consistency를 평가했습니다. 따라서 결과는 해당 waveform library와 OTA test condition에서의 RFNoC/FPGA implementation feasibility를 보여주는 것이며, 모든 operational radar environment에서의 완전한 system readiness를 의미하지는 않습니다.

또한 연구 2의 DSAE-MAAE나 연구 3의 SAVOR 전체 network를 FPGA에 탑재한 것은 아닙니다. 향후에는 더 다양한 waveform과 wireless environment, 그리고 lightweight unknown/open-set recognition model까지 hardware processing chain으로 확장할 수 있습니다.

## 결론

저는 이 연구에서 저 SNR OTA radar pulse train을 대상으로 STFT 기반 detection과 CNN classification을 RFNoC/FPGA streaming 구조로 연결하는 전체 processing chain을 구현했습니다. Fixed-point FFT 기반 STFT processing, frame score 기반 RFNoC detector, 검출 metadata를 이용한 64 × 31 STFT feature generation, quantized HLS CNN classifier를 구성하고 block 간 packetized data flow가 유지되도록 통합했습니다.

또한 동일한 3,600개 OTA RX record를 이용해 Python/PyTorch reference와 hardware implementation의 detection interval, packet processing, classification accuracy, end-to-end result, FPGA resource usage를 직접 비교했습니다. 이 연구의 의미는 software simulation에서 높은 정확도를 얻는 데 그치지 않고 OTA 수신 → FPGA 신호처리 → pulse detection → CNN classification으로 이어지는 hardware-oriented processing chain을 구성한 뒤, fixed-point와 quantization을 적용해도 software algorithm의 동작 특성이 가깝게 유지되는지를 정량적으로 검증했다는 점입니다.

<div class="case-study-publication">

## Publication

Jaehyeok Yoon and Haewoon Nam, “[RFNoC/FPGA 기반 LPI 레이다 펄스열 검출 및 분류기 구현](../../publications/rfnoc-fpga-lpi-detection/),” *The Journal of Korean Institute of Communications and Information Sciences*, 2026, accepted for publication.

</div>
