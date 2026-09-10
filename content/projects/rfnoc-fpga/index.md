---
layout: project
title: "Implementation of an RFNoC/FPGA-Based LPI Radar Pulse-Train Detector and Classifier"
slug: "rfnoc-fpga-radar-detector-classifier"
order: 4
status: "Manuscript (2026)"
publication:
  name: RFNoC/FPGA implementation study
summary: "STFT 기반 검출기와 CNN 분류기를 RFNoC/FPGA 스트리밍 처리 체인으로 구현하고 OTA 환경에서 소프트웨어 기준 구현과 비교한 연구입니다."
image:
  filename: figures/rfnoc_processing_architecture.png
  alt_text: RFNoC and FPGA radar pulse-train detector and classifier architecture
  caption: Streaming RFNoC/FPGA processing chain for low-SNR radar detection and classification.
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

# Implementation of an RFNoC/FPGA-Based LPI Radar Pulse-Train Detector and Classifier

![RFNoC/FPGA processing architecture](figures/rfnoc_processing_architecture.png)

## Research question

Can a representative low-SNR radar detector-classifier chain preserve software-reference behavior when mapped to a streaming, packetized RFNoC/FPGA processing path under OTA conditions?

## System and implementation

The evaluated chain consists of a USRP transmitter, OTA channel, USRP receiver, fixed-point FFT/STFT processing, an STFT-score-based pulse-train detector, and an HLS-based CNN classifier.

- The detector converts the received I/Q stream into STFT power frames, removes DC-related bins, forms a one-dimensional score stream, and selects a candidate pulse-train interval through thresholding.
- The classifier receives a fixed **1 × 64 × 31** STFT magnitude feature generated from a **2,048-sample** interval using **128-point FFT frames** and a **64-sample hop**.
- The CNN produces one of **15 waveform classes**.
- Quantization uses int8/int32/uint8 representations for weights, biases, and activations; the HLS path uses 4-way parallel time-multiplexed MAC operations.

![Classification accuracy versus target SNR](figures/classification_accuracy_by_snr.png)

[Open the accuracy Figure PDF](figures/classification_accuracy_by_snr.pdf) · [Classifier structure](../../research-tables/rfnoc-fpga-radar-detector-classifier/tables/ch6_classifier_architecture/)

## OTA evaluation protocol

- **Evaluation set:** 3,600 received OTA records.
- **Waveform classes:** 15.
- **Target SNR settings:** −4 to 10 dB in 2 dB increments.
- **Reference:** Python/PyTorch implementation evaluated on the same records.
- **Metrics:** interval match, 95%-coverage rate (`P_cov,95`), packet success, classification accuracy, conditional accuracy, end-to-end success (`E2E@P_cov,95`), and FPGA LUT/FF/BRAM/DSP usage.

## Key results

| Category | Metric | Python reference | RFNoC/FPGA | Difference |
| --- | --- | ---: | ---: | ---: |
| Evaluation set | RX records | 3,600 | 3,600 | — |
| Detector | Interval match | — | 3,600 / 3,600 | — |
| Detector | `P_cov,95` | 99.25% | 99.25% | 0.00 percentage points |
| Classifier | Packet success | — | 3,600 / 3,600 | — |
| Classifier | Classification accuracy | 94.08% | 93.69% | −0.39 percentage points |
| Integrated | Accuracy | `P_cov,95` | 94.21% | 93.84% | −0.36 percentage points |
| Integrated | `E2E@P_cov,95` | 93.50% | 93.14% | −0.36 percentage points |

The integrated design adds **26,041 LUTs, 37,519 FFs, 157 BRAM tiles, and 106 DSP blocks** relative to the base RFNoC/USRP image in the reported resource analysis.

| Configuration | LUT | FF | BRAM | DSP |
| --- | ---: | ---: | ---: | ---: |
| Base RFNoC/USRP | 139,216 | 215,511 | 484 | 369 |
| Base + detector | 148,537 (+9,321) | 229,490 (+13,979) | 495.5 (+11.5) | 369 (+0) |
| Base + detector + classifier | 162,621 (+14,084) | 249,444 (+19,954) | 615.5 (+120) | 462 (+93) |
| Base + STFT + detector + classifier | 165,257 (+2,636) | 253,030 (+3,586) | 641 (+25.5) | 475 (+13) |

## Scope note

This is an implementation-feasibility study for a representative STFT-detector–CNN-classifier chain. It does **not** claim a full hardware implementation of the parameter-estimation framework, DSAE–MAAE unknown detector, or SAVOR open-set recognizer.

## Publication status

Jaehyeok Yoon and Haewoon Nam, “Implementation of an RFNoC/FPGA-Based LPI Radar Pulse-Train Detector and Classifier,” manuscript, 2026. The current dissertation source marks this work as a manuscript.
