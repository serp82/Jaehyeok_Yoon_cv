---
layout: project
type: project
title: "SDR/RFNoC/FPGA 기반 레이다 검출·분류 시스템 구현"
english_title: "Implementation of an RFNoC/FPGA-Based LPI Radar Pulse-Train Detector and Classifier"
slug: "rfnoc-fpga-radar-detector-classifier"
order: 3
project_number: "03"
project_stage: "알고리즘 → 하드웨어 구조 → OTA 검증 · 2024–2026"
research_year: "2024–2026"
hero_claim: "소프트웨어에서 검증한 레이다 처리 알고리즘을 fixed-point STFT, RFNoC detector, HLS CNN 기반 SDR/FPGA 수신 체인으로 확장했습니다."
research_question: "대표적인 레이다 detector–classifier 체인을 fixed-point STFT, RFNoC detector, HLS CNN으로 구현하고 OTA 환경에서 종단간 검증할 수 있는가?"
result_highlight: "3,600개 OTA 기록 · P_cov,95 99.25% · 종단간 정확도 93.14%"
technology_tags:
  - RFNoC
  - FPGA
  - HLS
  - USRP / OTA
publication_refs:
  - /publications/rfnoc-fpga-lpi-detection/
summary: "STFT 기반 detector와 CNN classifier를 RFNoC/FPGA streaming processing chain으로 구현하고 OTA 환경에서 소프트웨어 기준 구현과 비교한 연구입니다."
image:
  filename: figures/rfnoc_processing_architecture.png
  alt_text: RFNoC and FPGA radar pulse-train detector and classifier architecture
  caption: "Streaming RFNoC/FPGA processing chain for low-SNR radar detection and classification"
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

## 연구 질문

대표적인 레이다 detector–classifier 체인을 fixed-point STFT, RFNoC detector, HLS CNN으로 구현하고 OTA 환경에서 종단간 검증할 수 있는가?

## 구현 개요

소프트웨어에서 검증한 레이다 처리 알고리즘을 실제 SDR/FPGA 수신 체인으로 확장했습니다. fixed-point STFT, RFNoC pulse-train detector, HLS CNN classifier를 streaming 구조로 구현하고, 15종 레이다 파형과 8개 SNR 조건에서 수집한 3,600개의 OTA 기록을 이용해 software reference와 end-to-end 동작을 비교했습니다.

## 시스템 구조

<div class="research-pipeline" aria-label="RFNoC FPGA 시스템 구조">
  <span>USRP TX</span><b>↓</b><span>OTA channel</span><b>↓</b><span>USRP RX</span><b>↓</b><span>Fixed-point STFT</span><b>↓</b><span>RFNoC detector</span><b>↓</b><span>1 × 64 × 31 STFT feature</span><b>↓</b><span>HLS CNN</span><b>↓</b><span>15-class output</span>
</div>

![RFNoC/FPGA processing architecture](figures/rfnoc_processing_architecture.png)

[처리 구조 PDF](figures/rfnoc_processing_architecture.pdf)

## 구현 세부 정보

- **STFT:** 128-point FFT, 64-sample hop, 2,048-sample interval에서 1 × 64 × 31 feature 생성
- **Detector:** STFT power frame에서 DC 관련 bin을 제거하고 score stream을 구성해 pulse-train interval을 thresholding
- **Classifier:** HLS 기반 CNN으로 15종 waveform class 출력
- **Quantization:** weight·bias·activation에 int8·int32·uint8 표현 사용
- **Hardware:** 4-way parallel time-multiplexed MAC, RFNoC streaming path, Vivado 기반 구현

## OTA 실험 구성

- **OTA records:** 3,600개 수신 기록
- **Waveform classes:** 15종
- **Target SNR:** −4–10 dB, 2 dB 간격의 8개 조건
- **Reference:** 동일 기록에 대한 Python/PyTorch implementation
- **Metrics:** interval match, P_cov,95, packet success, classification accuracy, end-to-end success

## 대표 결과

<div class="research-metric-grid">
  <div class="research-metric"><strong class="research-metric-value">3,600</strong><span class="research-metric-label">OTA records</span></div>
  <div class="research-metric"><strong class="research-metric-value">99.25%</strong><span class="research-metric-label">P_cov,95</span></div>
  <div class="research-metric"><strong class="research-metric-value">93.14%</strong><span class="research-metric-label">End-to-End accuracy</span></div>
</div>

RFNoC/FPGA classifier accuracy는 **93.69%**였으며, integrated end-to-end 성능은 **93.14%**였습니다.

![Classification accuracy versus target SNR](figures/classification_accuracy_by_snr.png)

[정확도 결과 PDF](figures/classification_accuracy_by_snr.pdf) · [Classifier structure](../../research-tables/rfnoc-fpga-radar-detector-classifier/tables/ch6_classifier_architecture/)

## 실제 환경 검증

USRP 송·수신기와 OTA channel을 포함한 수신 체인에서 detector와 classifier의 동작을 확인하고, software reference와 FPGA 결과의 차이를 비교했습니다. P_cov,95는 99.25%, RFNoC/FPGA classification accuracy는 93.69%로 측정되었습니다.

## 연구 범위

이 연구는 대표적인 STFT detector–CNN classifier 체인의 하드웨어 구현 가능성을 검증한 것입니다. 저 SNR parameter-estimation framework, DSAE-MAAE unknown detector, SAVOR Open-Set Recognizer 자체를 FPGA에 구현했다고 주장하지 않습니다.

## 관련 논문

[RFNoC/FPGA 기반 LPI 레이다 펄스열 검출 및 분류기 구현](../../publications/rfnoc-fpga-lpi-detection/) · 한국통신학회 국내논문지 · 게재 확정
