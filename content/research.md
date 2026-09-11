---
title: '연구 실적'
date: 2026-09-04
type: landing

design:
  spacing: '5rem'

sections:
  - block: research-field
    id: research-field
    content:
      title: 연구 분야
      text: |-
        **전공분야: 레이더 신호처리**

        저 SNR·비협조 수신 환경에서 레이더 신호를 검출·복원하고 주요 제원을 추정합니다. 학습되지 않은 파형과 공존 신호를 인식하는 AI 기반 방법을 설계하고, SDR·USRP·RFNoC·FPGA 구현을 통해 실제 수신 환경의 적용 가능성을 검증합니다.
  - block: research-highlights
    id: research-publications
    content:
      publications:
        block: collection
        content:
          title: 논문
          count: 0
          sort_by: Date
          sort_order: desc
          filters:
            folders:
              - publications
        design:
          view: citation
          columns: 1
          show_date: true
      conferences:
        block: research-conferences
        content:
          title: 학회 발표
          items:
            - authors: Jaehyeok Yoon, Haewoon Nam
              title: Cross-Resolution STFT Distillation for FPGA-Efficient Radar Waveform Classification
              venue: The 31st Asia-Pacific Conference on Communications (APCC)
              date: 2026
              badge:
                label: 발표 예정
                class: pending
            - authors: 윤재혁, 남해운
              title: 지도 학습 기반 CLIP을 활용한 레이더 신호 스펙트로그램 식별
              venue: 2026년도 한국통신학회 동계종합학술발표회, 용평
              date: 2026.02.04
            - authors: Jaehyeok Yoon, Haewoon Nam, Jaerock Kwon
              title: Joint Recognition of LPI Radar Signals Using a VLM with TFD-Text Alignment
              venue: ICNGC, Da Nang, Vietnam
              date: 2025.12
              badge:
                label: Best Paper Award
                class: award
            - authors: 윤재혁, 남해운
              title: LPI 레이더 중첩 신호 인지를 위한 ResNeXt 기반 다중 라벨 분류
              venue: 한국통신학회 하계종합학술발표회, 제주
              date: 2023.06
            - authors: 정석현, 윤재혁, 남해운
              title: Multi-Moving Average filter 기반 저피탐 레이더 신호 검출
              venue: 한국통신학회 동계종합학술발표회, 용평리조트
              date: 2023.02
            - authors: 조재연, 윤재혁, 남해운
              title: FMCW 레이더 스펙트로그램 기반 동작 인식 기법
              venue: 한국통신학회 하계종합학술발표회, 제주 그랜드하얏트호텔
              date: 2022.06
              badge:
                label: 학술논문우수상
                class: award
            - authors: 윤재혁, 윤우진, 김형윤, 남해운
              title: 오토엔코더 기반 미확인 저피탐 레이더 파형 탐지 기술
              venue: 한국통신학회 동계종합학술발표회, 평창 알펜시아 리조트
              date: 2022.02
            - authors: Jaehyeok Yoon, Hyeongyun Kim, Dongho Seo, Haewoon Nam
              title: Performance Comparison of NLOS Detection Methods in UWB
              venue: International Conference on ICT Convergence (ICTC), Jeju, Korea
              date: 2021.10
            - authors: 윤재혁, 서동호, 김동현, 남해운
              title: Comparison of CNN Performance According to Weight Initialization Method when Classifying Signals Through Spectrogram
              venue: 한국통신학회 동계종합학술발표회, 용평리조트
              date: 2021.02
  - block: research-supporting
    id: research-supporting
    content:
      title: 수상·특허·소프트웨어
      shared_records: true
  - block: research-tasks
    id: research-tasks
    content:
      title: 수행 과제
      shared_tasks: true
---
