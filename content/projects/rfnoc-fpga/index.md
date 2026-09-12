---
layout: project
type: project
title: "저 SNR 레이더 인식을 위한 FPGA 실시간 구현 및 경량 모델 설계"
english_title: "Real-Time FPGA Implementation and Lightweight Radar Model Design for Low-SNR Recognition"
slug: "rfnoc-fpga-radar-detector-classifier"
order: 4
project_number: "04"
project_stage: "RFNoC/FPGA 실시간 구현 · Cross-Resolution KD · 2024–2026"
research_year: "2024–2026"
project_role: "RFNoC/FPGA 구현 · OTA 검증 · 경량 모델 설계"
hero_claim: "저 SNR 레이더 인식을 실제 RFNoC/FPGA 처리 체인으로 구현하고, 고해상도 표현을 저해상도 모델에 전달하는 경량화 방법을 설계했습니다."
research_question: "저 SNR 레이더 인식에서 실시간 하드웨어 처리와 계산 자원을 고려한 경량 분류를 어떻게 함께 설계할 수 있는가?"
result_highlight: "Pcov95 99.25% · RFNoC/FPGA 93.69% · End-to-End 93.14%"
technology_tags:
  - RFNoC
  - FPGA
  - HLS
  - Cross-Resolution KD
  - STFT
  - USRP / OTA
publication_refs:
  - /publications/rfnoc-fpga-lpi-detection/
summary: "저 SNR 레이더 신호의 실시간 처리를 위해 RFNoC/FPGA 검출·분류 체인을 구현하고, Cross-Resolution KD로 경량 분류 모델을 설계한 연구입니다."
image:
  filename: figures/representative.png
  alt_text: "저 SNR 레이더 인식을 위한 FPGA 실시간 구현과 경량 모델 설계 연구 개요"
  caption: "※ 본 이미지는 연구의 전체 흐름을 이해하기 쉽게 설명하기 위해 AI로 제작한 개념도이며, 실제 실험 결과 이미지는 아닙니다."
preview:
  filename: figures/preview.png
  alt_text: "RFNoC/FPGA 기반 실시간 레이더 신호처리와 Cross-Resolution KD 기반 경량 분류"
links: []
tags:
  - RFNoC
  - FPGA
  - HLS
  - Cross-Resolution Knowledge Distillation
  - STFT
  - SDR
  - OTA validation
---

## 공통 연구 배경과 필요성

저 SNR 환경에서는 잡음의 영향으로 레이더 신호의 검출과 파형 분류가 어려워집니다. 시간·주파수 해상도를 높이면 파형의 세부 구조를 더 잘 표현할 수 있지만, STFT 입력 크기와 CNN 연산량이 함께 증가합니다.

실제 SDR/FPGA 시스템에서는 분류 정확도만으로 구현 가능성을 판단하기 어렵습니다. Fixed-point 연산과 quantization, streaming data flow, packet interface, FPGA 자원 사용량, 처리 지연을 함께 고려해야 실제 수신 경로에 적용할 수 있습니다.

따라서 이 페이지는 같은 저 SNR 레이더 인식 문제를 두 가지 관점에서 다룹니다. 첫 번째는 실제 RFNoC/FPGA 기반으로 수신부터 검출·분류까지의 실시간 처리 체인을 구현하는 연구이고, 두 번째는 하드웨어 적용을 고려해 고해상도 모델의 정보를 저해상도 모델에 전달하는 경량 레이더 분류 연구입니다.

<div class="research-pipeline" aria-label="저 SNR 레이더 인식 연구 구성">
  <span>저 SNR 수신 신호</span><b>→</b><span>실시간 FPGA 처리 체인 구현</span><b>+</b><span>계산 자원을 고려한 경량 모델 설계</span>
</div>

## 세부 연구 A — RFNoC/FPGA 기반 실시간 레이더 신호처리 구현

### 문제 정의

소프트웨어에서 동작하는 레이더 검출·분류 알고리즘을 실제 SDR 환경에 적용하려면 연속적으로 입력되는 I/Q stream을 FPGA에서 처리해야 합니다. 단순히 CNN classifier만 FPGA에 구현하는 것이 아니라 다음 전체 processing chain을 하드웨어 제약 안에서 연결해야 합니다.

<div class="research-pipeline" aria-label="RFNoC FPGA 실시간 처리 문제 흐름">
  <span>I/Q 수신</span><b>→</b><span>STFT / FFT</span><b>→</b><span>펄스열 검출</span><b>→</b><span>분류용 feature 생성</span><b>→</b><span>CNN 분류</span>
</div>

Fixed-point 변환과 quantization으로 인해 소프트웨어와 하드웨어의 연산 결과가 달라질 수 있고, packet framing과 block 간 streaming이 끊기면 후단 분류까지 이어지지 않습니다. 따라서 detector부터 classifier까지 전체 data path의 동작을 함께 확인해야 합니다.

### 연구 배경과 필요성

RFNoC는 사용자 정의 FPGA processing block을 USRP의 radio streaming path에 연결할 수 있는 구조를 제공합니다. 이를 이용하면 Radio I/O, custom FPGA processing, host control을 하나의 SDR processing chain으로 구성할 수 있습니다.

RFNoC/FPGA 구현에서는 알고리즘 정확도 외에도 fixed-point arithmetic, quantization, packet framing, block 간 streaming, BRAM·DSP·LUT·FF 사용량을 함께 고려해야 합니다. 따라서 실제 OTA 환경에서 detector와 classifier가 연결된 전체 체인이 정상적으로 동작하는지 검증하는 것이 필요합니다.

### 제안 방법

전체 처리 흐름은 Radar I/Q를 fixed-point FFT/STFT로 변환한 뒤 RFNoC detector에서 펄스 구간을 찾고, 분류용 STFT magnitude feature를 생성해 HLS CNN classifier로 전달하는 구조로 구성했습니다.

<div class="research-pipeline" aria-label="RFNoC FPGA 제안 방법">
  <span>Radar I/Q</span><b>→</b><span>Fixed-Point FFT / STFT</span><b>→</b><span>RFNoC Detector</span><b>→</b><span>STFT Magnitude Feature</span><b>→</b><span>HLS CNN Classifier</span><b>→</b><span>Radar Waveform Class</span>
</div>

수신된 fixed-point I/Q sample은 128-point FFT 기반 STFT로 처리하고, detector는 유효 frequency bin의 power score를 이용해 pulse-train interval을 선택합니다. 검출된 구간에서는 고정 크기의 STFT magnitude feature를 만들고, 이를 uint8 형식으로 packing해 classifier block으로 전달합니다.

Classifier는 1 × 64 × 31 STFT magnitude를 입력으로 사용하고, weight·activation quantization과 HLS 기반 convolution 연산을 적용했습니다. RFNoC block은 AXI4-Stream과 AXI-Lite interface를 통해 연결하고, FPGA 안에서 검출부터 분류까지 packetized streaming이 이어지도록 구성했습니다.

{{< case-figure src="figures/implementation-specification.png" alt="PyTorch reference에서 RFNoC block과 USRP 검증까지 이어지는 구현 사양" type="Method" layout="wide" caption="그림 2. PyTorch reference model, quantization, HLS/C++ design, RFNoC block integration, Vivado synthesis, USRP deployment로 이어지는 구현 흐름." description="소프트웨어 모델을 FPGA에서 실행 가능한 형태로 변환하고 실제 장비에서 검증하는 절차를 보여준다." >}}

### 실험 구성

실제 OTA 수신 데이터를 사용해 RFNoC/FPGA processing chain을 검증했습니다. 실험은 15개 radar waveform class와 −4 dB부터 10 dB까지 2 dB 간격의 SNR 조건으로 구성했으며, waveform·SNR별 기록을 합쳐 총 3,600개 OTA records를 사용했습니다.

검증 항목은 detector interval consistency, classifier input/output packet 처리, Pcov95, RFNoC/FPGA classification accuracy, end-to-end performance, FPGA resource usage입니다. OTA 송수신에는 SDR/USRP 기반 장비를 사용했고, RFNoC target은 Xilinx Kintex-7 계열 FPGA 환경에서 구성했습니다.

<div class="case-study-result-grid case-study-result-grid--two" aria-label="RFNoC FPGA 실제 실험 환경">

{{< case-figure src="figures/03_sdr-test-hardware.jpg" alt="SDR 기반 OTA 송수신 실험 환경" type="Experiment" caption="그림 3. SDR/USRP 기반 OTA 송수신 실험 환경." description="실제 무선으로 수신한 I/Q stream을 RFNoC/FPGA 처리 체인에 입력한 실험 환경이다." >}}

{{< case-figure src="figures/05_fpga-board.jpg" alt="RFNoC FPGA 구현에 사용한 Xilinx Kintex-7 보드" type="Experiment" caption="그림 4. RFNoC/FPGA 구현에 사용한 Xilinx Kintex-7 보드." description="고정소수점 STFT, detector, HLS CNN classifier를 탑재한 FPGA 구현 환경을 보여준다." >}}

</div>

### 실험 결과

3,600개 OTA records에서 RFNoC detector가 software reference와 동일한 detection interval을 출력했고, classifier input/output packet도 정상 처리되었습니다. Pcov95는 99.25%, RFNoC/FPGA classifier accuracy는 93.69%, end-to-end performance는 93.14%로 확인되었습니다.

Python/PyTorch reference와 비교했을 때 classifier accuracy 차이는 0.39%p, end-to-end 차이는 0.36%p였습니다. 이 결과는 FPGA 구현이 소프트웨어 기준보다 높다는 의미가 아니라, fixed-point와 quantized HLS inference를 적용한 뒤에도 detector–classifier 동작 특성이 가깝게 유지되었음을 보여줍니다.

{{< case-figure src="figures/04_classification-performance.png" alt="Python reference와 RFNoC FPGA의 SNR별 레이더 분류 정확도 비교" type="Result" layout="wide" caption="그림 5. Target SNR 변화에 따른 Python reference와 RFNoC/FPGA classification accuracy 비교." description="동일한 OTA 수신 조건에서 소프트웨어 기준과 FPGA 구현의 분류 성능 변화를 비교한다." >}}

{{< case-figure src="figures/resource-table.png" alt="RFNoC detector와 classifier 통합에 따른 FPGA 자원 사용량" type="Result" layout="wide" caption="그림 6. Base RFNoC/USRP image에 detector, classifier, STFT를 추가했을 때의 LUT·FF·BRAM·DSP 사용량." description="FPGA 자원 수치는 원본 resource table에 표시된 누적값과 증가량을 기준으로 제시한다." >}}

### 결론

이 세부 연구에서는 단순한 CNN FPGA 추론이 아니라 STFT 전처리, 펄스열 검출, 분류용 feature 생성, CNN 분류로 이어지는 전체 chain을 RFNoC/FPGA streaming 구조로 구현했습니다.

실제 OTA 환경에서 3,600개 기록의 detection interval consistency와 packet 처리, Pcov95, 분류 정확도, end-to-end performance, FPGA resource usage를 함께 확인했습니다. 이를 통해 소프트웨어에서 동작하던 레이더 처리 흐름을 fixed-point와 quantization을 적용한 실제 SDR/FPGA 수신 경로로 통합할 수 있는지를 검증했습니다.

## 세부 연구 B — Cross-Resolution Knowledge Distillation 기반 경량 레이더 분류

### 문제 정의

고해상도 STFT는 레이더 파형의 세부적인 시간·주파수 특징을 표현하는 데 유리하지만 입력 크기와 CNN 연산량이 증가합니다. 반대로 저해상도 STFT는 연산량을 줄일 수 있지만 분류에 필요한 세부 특징이 손실될 수 있습니다.

따라서 고해상도 모델의 표현력을 학습 단계에서 활용하면서, 추론 단계에서는 저해상도 입력과 경량 Student model만 사용하는 방법이 필요합니다.

### 연구 배경과 필요성

실제 edge/FPGA 환경에서는 classification accuracy뿐 아니라 입력 해상도, 모델 연산량, memory와 FPGA resource 요구량을 함께 고려해야 합니다. 단순히 STFT를 downsampling하는 것만으로는 고해상도 입력이 제공하던 특징을 충분히 보존하기 어렵습니다.

이 연구에서는 128×128 STFT를 사용하는 Teacher model의 정보를 64×64 STFT를 사용하는 Student model에 전달하는 Cross-Resolution Knowledge Distillation을 구성했습니다. 저 SNR에서의 조건 차이를 반영하기 위해 SNR-Weighted CRKD Loss를 사용하고, inference에서는 Teacher나 KD 연산 없이 Student만 사용하도록 설계했습니다.

### 제안 방법

학습 단계에서 Teacher path는 128×128 STFT와 frozen Teacher model로 Teacher logits를 만들고, Student path는 64×64 STFT와 Student model로 Student logits를 만듭니다. 두 logits는 SNR-Weighted CRKD Loss에 사용되며 Student model만 update합니다.

<div class="research-pipeline" aria-label="Cross-Resolution Knowledge Distillation 학습 흐름">
  <span>128×128 STFT</span><b>→</b><span>Frozen Teacher</span><b>→</b><span>Teacher logits</span><b>+</b><span>64×64 STFT</span><b>→</b><span>Student logits</span><b>→</b><span>SNR-Weighted CRKD Loss</span>
</div>

추론 단계에서는 64×64 STFT를 Student model에 입력하고 predicted class를 출력합니다. Teacher model과 KD loss는 학습 단계에서만 사용되므로, 실제 inference에는 Student model의 연산만 남습니다.

{{< case-figure src="figures/01_rfnoc-processing-architecture.png" alt="128×128 Teacher와 64×64 Student를 이용한 Cross-Resolution Knowledge Distillation 구조" type="Method" layout="wide" caption="그림 7. 고해상도 Teacher와 저해상도 Student를 학습 단계에서 함께 사용하고, inference에서는 Student만 사용하는 Cross-Resolution KD 구조." description="SNR-Weighted CRKD Loss로 Student를 update하고 추론 시에는 추가적인 Teacher·KD overhead를 제거하는 흐름을 보여준다." >}}

### 실험 구성

분류 성능은 128×128 Teacher, 64×64 Student CE, 64×64 Proposed CRKD를 비교하는 방식으로 구성했습니다. 또한 32×32 입력 조건을 함께 확인해 입력 해상도 감소가 성능과 계산량에 미치는 영향을 비교했습니다.

효율 비교에서는 STFT resolution, CNN MACs, parameter 수, full-image BRAM analysis를 함께 확인했습니다. 비교 수치는 원본 표와 그래프에 표시된 항목만 사용했으며, 별도의 latency나 resource 감소율은 이미지에 직접 표시된 경우에만 해석했습니다.

{{< case-figure src="figures/resource-comparison.png" alt="SNR weighting과 입력 해상도에 따른 Cross-Resolution Knowledge Distillation 비교 표" type="Result" layout="wide" caption="그림 8. 128×128 Teacher, 64×64 Student, Proposed CRKD, 32×32 조건의 정확도·MACs·BRAM 비교." description="고해상도 Teacher의 성능과 저해상도 Student 및 CRKD 변형의 분류·연산·자원 지표를 표로 비교한다." >}}

{{< case-figure src="figures/throughput-curve.png" alt="Teacher와 Proposed CRKD의 BRAM 사용량 및 SNR별 성능 비교" type="Result" layout="wide" caption="그림 9. Full-image BRAM utilization과 measured SNR에 따른 Teacher·Student·Proposed CRKD 비교." description="저해상도 CRKD가 고해상도 Teacher의 표현을 활용하면서 자원 제약과 SNR 변화에 대응하는 양상을 보여준다." >}}

### 실험 결과

64×64 Student CE는 all-SNR average 96.525%, low-SNR average 87.852%로 표시되었고, 64×64 Proposed CRKD(hard)는 각각 97.051%, 89.926%로 표시되었습니다. 같은 64×64 입력에서 CRKD를 적용한 Student가 기본 Student보다 높은 표 값을 보였습니다.

32×32 조건에서도 Proposed CRKD(hard)는 Student CE보다 all-SNR average와 low-SNR average가 각각 93.616%와 83.407%로 높게 표시되었습니다. 다만 32×32 입력의 절대 성능은 64×64 조건보다 낮게 나타나 입력 해상도와 성능 사이의 trade-off를 확인할 수 있습니다.

연산량과 자원 측면에서는 표에 128×128 Teacher의 CNN MACs가 66.652M, 64×64 Student와 Proposed CRKD가 16.664M, 32×32 조건이 4.168M으로 표시되어 있습니다. 64×64와 32×32 조건의 BRAM analysis도 각각 97.29%와 74.54%로 표시되어 고해상도 Teacher 대비 낮은 해상도 입력의 자원 부담이 줄어드는 방향을 확인할 수 있습니다.

### 결론

이 세부 연구에서는 128×128 고해상도 Teacher의 표현을 64×64 저해상도 Student에 전달하는 Cross-Resolution Knowledge Distillation을 설계했습니다. SNR-Weighted CRKD Loss를 이용해 Student만 update하고, 추론 단계에서는 64×64 STFT와 Student model만 사용하도록 구성했습니다.

고해상도 입력의 정보를 학습 단계에서 활용하면서도 실제 inference는 저해상도 입력과 Student-only 구조로 수행해 분류 성능과 계산 자원 사이의 균형을 조정할 수 있다는 점이 핵심입니다.

<div class="case-study-publication">

## 관련 성과

윤재혁, 남해운 (2026). “[RFNoC/FPGA 기반 LPI 레이다 펄스열 검출 및 분류기 구현](../../publications/rfnoc-fpga-lpi-detection/).” *The Journal of Korean Institute of Communications and Information Science*.

Jaehyeok Yoon and Haewoon Nam (2026). “Cross-Resolution STFT Distillation for FPGA-Efficient Radar Waveform Classification.” *The 31st Asia-Pacific Conference on Communications (APCC).* 발표 예정.

</div>
