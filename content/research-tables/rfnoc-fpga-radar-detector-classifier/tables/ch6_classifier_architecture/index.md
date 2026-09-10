---
title: "PyTorch and RFNoC/HLS classifier structure"
layout: project
---

# PyTorch and RFNoC/HLS classifier structure

| Component | Format | Operation |
| --- | --- | --- |
| Input | 1 × 64 × 31 uint8 | STFT magnitude |
| Conv1 | 1 → 16 | 3 × 3 convolution + normalization + ReLU + pooling |
| Conv2 | 16 → 32 | 3 × 3 convolution + normalization + ReLU + pooling |
| Conv3 | 32 → 64 | 3 × 3 convolution + normalization + ReLU |
| Conv4 | 64 → 96 | 3 × 3 convolution + normalization + ReLU |
| Output | 96 → 15 | Global average pooling + fully connected layer |
| Quantization | int8 / int32 / uint8 | Weight / bias / activation |
| HLS path | 4-way parallel | Time-multiplexed MAC |

Source: `thesis/chapters/06_rfnoc_fpga_implementation/tables/classifier_architecture.tex`.
