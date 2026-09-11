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
result_highlight: "3,600개 OTA records · Pcov,95 99.25% · End-to-End accuracy 93.14%"
technology_tags:
  - RFNoC
  - FPGA
  - HLS
  - USRP / OTA
publication_refs:
  - /publications/rfnoc-fpga-lpi-detection/
summary: "STFT 기반 detector와 CNN classifier를 RFNoC/FPGA streaming processing chain으로 구현하고 OTA 환경에서 소프트웨어 기준 구현과 비교한 연구입니다."
image:
  filename: figures/rfnoc-processing-architecture.png
  alt_text: "RFNoC와 FPGA 기반 레이다 펄스 검출·분류 스트리밍 아키텍처"
  caption: "Radar TX부터 OTA 수신, RFNoC/FPGA 검출, CNN 분류까지 연결한 전체 스트리밍 구조"
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

딥러닝 기반 레이다 신호처리 연구는 대부분 GPU나 CPU 환경에서 성능을 검증합니다. 하지만 실제 RF 수신기에서는 데이터가 연속적인 I/Q stream으로 입력되고, 실시간 데이터 이동, fixed-point computation, FPGA memory, packet framing, latency와 FPGA resource를 함께 고려해야 합니다.

실제 수신 시스템에서 알고리즘을 사용하려면 소프트웨어 성능뿐 아니라 하드웨어 자원과 실시간 처리 가능성까지 함께 검증해야 합니다.

## 문제 정의

레이다 처리에서는 detector가 선택한 구간이 후단 CNN 입력 자체를 결정합니다. 따라서 CNN 정확도만 FPGA에서 구현하는 것으로는 전체 시스템을 검증할 수 없고, 실제 OTA 수신부터 검출·특징 생성·분류까지 전체 처리 체인을 연결해야 합니다.

<div class="research-pipeline" aria-label="RFNoC FPGA 구현 문제 흐름">
  <span>Software algorithm</span><b>→</b><span>Continuous I/Q stream</span><b>→</b><span>Fixed-point·latency·resource 제약</span><b>→</b><span>End-to-End hardware validation 필요</span>
</div>

## 연구 목표

저 SNR OTA 레이다 펄스열을 실시간 스트림 형태로 처리하는 RFNoC/FPGA 검출·분류 체인을 구현하고, Python/PyTorch 기준 구현과의 동작 일치성을 검증하는 것을 목표로 했습니다.

분류기 하나의 정확도만 확인하는 것이 아니라, 수신·STFT·pulse detection·feature generation·CNN classification이 연속적인 streaming pipeline으로 이어지는지 평가했습니다.

## 핵심 방법

<div class="research-pipeline" aria-label="RFNoC FPGA 레이다 신호처리 흐름">
  <span>Radar TX</span><b>→</b><span>OTA Channel</span><b>→</b><span>USRP RX</span><b>→</b><span>FPGA / RFNoC</span><b>→</b><span>STFT</span><b>→</b><span>Pulse Detector</span><b>→</b><span>Feature Generation</span><b>→</b><span>CNN Classifier</span><b>→</b><span>15-Class Output</span>
</div>

실제 RFNoC 구조에서는 fixed-point FFT 기반 STFT, STFT-score detector, HLS CNN classifier를 순차적으로 연결했습니다. Detector와 classifier를 하나의 streaming pipeline으로 구성해 OTA 수신 I/Q부터 최종 classification result까지 같은 데이터 경로에서 처리했습니다.

{{< case-figure src="figures/rfnoc-processing-architecture.png" alt="Radar TX부터 RFNoC FPGA detector와 CNN classifier까지 연결한 스트리밍 아키텍처" type="Method" caption="그림 1. Radar TX부터 OTA 수신, RFNoC/FPGA 기반 STFT, pulse detection, feature generation, CNN classification까지 연결한 전체 스트리밍 아키텍처." description="분류기만 FPGA에 올린 것이 아니라 실제 수신부터 결과 출력까지 종단간 처리 체인을 구현했다." >}}

## 핵심 아이디어

1. **Detector와 classifier를 하나의 streaming pipeline으로 구현했습니다.** OTA 수신 I/Q부터 최종 classification result까지 전 과정을 연결해 detector가 후단 CNN 입력을 어떻게 결정하는지 함께 검증했습니다.
2. **목적에 따라 STFT 해상도를 분리했습니다.** 검출기는 세밀한 시간 위치 추정을 위해 16-sample hop을 사용하고, 분류기는 고정 CNN 입력을 위해 64-sample hop을 사용했습니다.
3. **Hardware-aware quantization을 적용했습니다.** CNN weight는 int8, bias는 int32, activation은 uint8 형식으로 양자화하고 HLS 연산 구조로 구현했습니다.
4. **End-to-End consistency를 평가했습니다.** FPGA classifier accuracy뿐 아니라 detection interval, packet processing, classifier accuracy, end-to-end accuracy와 FPGA resource를 함께 비교했습니다.

{{< case-figure src="figures/cross-resolution-stft-framework.png" alt="검출과 분류 단계에 서로 다른 STFT 시간 해상도를 적용한 구조" type="Method" caption="그림 2. 검출 단계와 분류 단계에서 서로 다른 STFT 시간 해상도를 사용해 실시간 검출 정밀도와 CNN 입력 구성을 동시에 만족시킨 구조." description="하나의 해상도를 모든 단계에 강제하지 않고 각 처리 목적에 맞춰 시간 해상도를 분리했다." >}}

## 실제 검증

- **OTA data:** USRP 송수신기로 직접 수집한 15종 레이다 파형
- **SNR conditions:** −4–10 dB, 2 dB 간격의 8개 조건
- **Records:** 30 records, 총 3,600개 OTA records
- **Reference:** 동일 기록에 대한 Python/PyTorch implementation
- **Evaluation:** interval match, Pcov,95, packet success, classification accuracy, end-to-end success

USRP 송·수신기와 OTA channel을 포함한 실제 수신 체인에서 detector와 classifier의 동작을 확인하고, software reference와 FPGA 결과의 차이를 비교했습니다.

{{< case-figure src="figures/sdr-test-hardware.jpg" alt="USRP 송수신기와 RFNoC FPGA 처리를 포함한 SDR 실험 환경" type="Experiment" caption="그림 3. USRP 기반 OTA 송수신과 RFNoC/FPGA 처리를 검증하기 위해 구성한 실제 SDR 실험 환경." description="소프트웨어 입력이 아니라 실제 무선으로 수집한 I/Q stream을 하드웨어 처리 체인에 통과시켰다." >}}

## 주요 성과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">3,600 / 3,600</strong><span class="research-metric-label">RFNoC 검출 구간과 software reference 일치</span></div>
  <div class="research-metric"><strong class="research-metric-value">99.25%</strong><span class="research-metric-label">Pcov,95 · OTA detector coverage</span></div>
  <div class="research-metric"><strong class="research-metric-value">93.14%</strong><span class="research-metric-label">End-to-End accuracy · 15 waveforms</span></div>
</div>

- RFNoC/FPGA classifier accuracy는 **93.69%**였습니다.
- Python/PyTorch 기준 구현과의 classifier 성능 차이는 **0.39%p**, End-to-End 성능 차이는 **0.36%p**였습니다.
- 대상 플랫폼에서 FPGA resource를 사용해 전체 구현이 가능함을 확인했습니다.

{{< case-figure src="figures/classification-performance.png" alt="Python/PyTorch와 RFNoC FPGA 구현의 레이다 분류 성능 비교" type="Result" caption="그림 4. Python/PyTorch 기준 구현과 RFNoC/FPGA 구현의 분류 및 End-to-End 성능을 비교한 결과." description="하드웨어 구현 후에도 software reference와 가까운 분류 성능과 종단간 처리 결과를 유지했는지 보여준다." >}}

## 나의 기여 및 연구의 의미

Software reference를 기준으로 fixed-point STFT, RFNoC pulse detector, feature generation과 HLS CNN classifier를 연결했습니다. USRP OTA 데이터를 직접 수집하고 15종 waveform, 8개 SNR 조건, 3,600개 records에서 detection interval과 classifier·end-to-end 결과를 비교했습니다.

이 연구는 단순히 CNN을 FPGA에 포팅한 작업이 아니라, 저 SNR 레이다 신호가 실제 수신기에서 검출되고 분류되는 전체 데이터 경로를 검증한 독립적인 SDR/FPGA 구현 연구입니다.

<div class="case-study-contribution"><strong>연구의 의미</strong>저 SNR 레이다 신호처리 알고리즘을 실제 OTA 수신과 RFNoC/FPGA 스트리밍 체인으로 구현하고 종단간 일치성을 검증했습니다.</div>

<div class="case-study-publication">

## Publication

[RFNoC/FPGA 기반 LPI 레이다 펄스열 검출 및 분류기 구현](../../publications/rfnoc-fpga-lpi-detection/) · 한국통신학회 국내논문지 · 게재 확정

</div>
