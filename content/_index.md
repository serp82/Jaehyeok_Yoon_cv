---
title: ''
summary: ''
date: 2026-09-10
type: landing

sections:
  - block: resume-biography-3
    content:
      username: me
      show_education: false
      show_interests: false
      text: |-
        저 SNR·비협조 수신 환경에서 레이더 신호를 검출하고 제원을 추정하며,
        학습되지 않은 파형까지 인식하는 AI 기반 신호처리 알고리즘을 연구합니다.
        개발한 알고리즘을 USRP/RFNoC/FPGA 기반 실환경 시스템으로 구현하고 검증합니다.

        **Research focus**
        - Low-SNR Radar
        - Unknown / Open-Set Recognition
        - Vision-Language Model
        - RFNoC / FPGA
      headings:
        about: Research identity
    design:
      background:
        gradient_mesh:
          enable: false
      name:
        size: md
      avatar:
        size: medium
        shape: rounded

  - block: research-overview
    id: research-overview
    content:
      title: Research Overview
      text: Detection → Estimation → Unknown / Open-Set Recognition → Real-System Implementation
      stages:
        - eyebrow: "01 · Environment"
          title: Low-SNR Radar
          detail: "Weak and non-cooperative radar signals"
        - eyebrow: "02 · Front end"
          title: Detection
          detail: "Find pulse presence and boundaries"
        - eyebrow: "03 · Inference"
          title: Estimation
          detail: "Recover physical radar parameters"
        - eyebrow: "04 · Recognition"
          title: Unknown / Open-Set
          detail: "Reject or recognize unseen waveforms"
        - eyebrow: "05 · Deployment"
          title: SDR / RFNoC / FPGA
          detail: "Validate the chain in real systems"
      mission: "저 SNR 환경에서 신호를 찾아내고, 제원을 추정하고, 처음 보는 파형까지 판단하며, 이를 실제 SDR/FPGA 수신 시스템으로 구현합니다."

  - block: research-projects
    id: featured-research-projects
    content:
      title: Featured Research Projects
      text: 문제, 연구 발전, 대표 결과, 구현 환경을 중심으로 정리한 핵심 연구 프로젝트입니다.
      projects:
        - projects/unknown-open-set
        - projects/pandas
        - projects/rfnoc-fpga
        - projects/coexisting-spectrum

  - block: collection
    id: selected-publications
    content:
      title: Selected Publications
      text: 대표 논문과 현재 진행 중인 핵심 연구를 상태와 함께 표시합니다.
      count: 4
      sort_by: Date
      sort_order: desc
      filters:
        folders:
          - publications
        featured_only: true
    design:
      view: citation
      columns: 1
      show_date: true

  - block: markdown
    id: publications-link
    content:
      title: ''
      text: |-
        [View all publications and conference papers](research/)
    design:
      columns: '1'

  - block: resume-experience
    id: experience
    content:
      title: 연구자 이력
      username: me
    design:
      date_format: '2006년 1월'
      is_education_first: false

  - block: markdown
    id: selected-rd-projects
    content:
      title: Selected R&D Projects
      text: |-
        - **Low-SNR Signal Detection & Parameter Estimation** · 한국연구재단 / LIG · 2022–2024
        - **Spectrum Sharing & Signal Identification** · 한국전자통신연구원 (ETRI) · 2021–2023
        - **OFDM Drone Signal Processing** · 엘아이지넥스원 (LIG) · 2024–현재

        [View all R&D projects](rd-projects/)
    design:
      columns: '1'

  - block: resume-skills
    id: skills
    content:
      title: Skills & Capabilities
      username: me

  - block: research-paired-sections
    id: supporting-records
    content:
      patents:
        block: research-patents
        content:
          title: 특허
          summary_badges:
            - label: 등록 1건
              class: registered
            - label: 출원 2건
              class: filed
          items:
            - title: 사람의 동작에 대한 정확한 인체 모션 감지를 위한 RGB-D 카메라 데이터와 레이더 포인트 클라우드를 활용한 스켈레톤 추출 기술
              status: 등록
              number: 등록번호 10-2842830
              date: 2025.08.01
            - title: 딥러닝 기반 저피탐 레이더 신호의 잡음 제거 및 파라미터 추출 방법, 이를 수행하는 장치 및 컴퓨터 프로그램
              status: 출원
              number: 출원번호(대한민국) 10-2024-0092816
              date: 2024.07.15
            - title: 레이더를 통해 레이더 시스템의 간섭을 제거하는 OFDM 기반 드론 신호처리 장치 및 방법
              status: 출원
              number: 출원번호(대한민국) 10-2025-0191251
              date: 2025.12.05
      software:
        block: markdown
        content:
          title: 소프트웨어 등록
          text: |-
            - 파이썬 기반 Radar-Vision-Language(레이더-비전-언어) 구축, C-2025-005640
        design:
          columns: '1'
      awards:
        block: markdown
        content:
          title: 수상 실적
          text: |-
            - ICNGC 2025 Best Paper Award, 2025.12.19
            - 한국통신학회 국내논문지 우수논문상, 한국통신학회, 2025.11.20.
            - 제 4회 ERICA 해동창업경진대회(대상), 한양대학교, 2024.12.04.
            - 2023 4D 이미징 레이다 시스템 부트캠프(우수상), 한국전자파학회, 2023.08.24.
        design:
          columns: '1'
      overseas:
        block: markdown
        content:
          title: 해외 경험
          text: |-
            - **미국 Univ. of Michigan-Dearborn 자율주행 연구실 파견**: 2024.10–2025.02
            - **인도 IIT Guwahati 연구 인턴**: 2020.01–2020.02
        design:
          columns: '1'
      languages:
        block: markdown
        content:
          title: 외국어 역량
          text: |-
            - **OPIC**: Intermediate High (IH), 2025.07.26
        design:
          columns: '1'
      skills:
        block: resume-skills
        content:
          title: R&D 역량
          username: me
      academics:
        block: markdown
        content:
          title: GPA
          text: |-
            - **학부 GPA**: 3.8 / 4.5 (전공 3.85)
            - **대학원 석·박사통합과정 GPA**: 4.21 / 4.5
        design:
          columns: '1'
    design:
      columns: '1'

  - block: markdown
    id: additional-research
    content:
      title: Additional Research
      text: |-
        UWB NLOS detection, FMCW radar motion recognition, radar-camera / skeleton research, autonomous driving and other communication-signal research are separated from the four main research lines.

        [View additional research](additional-research/)
    design:
      columns: '1'

  - block: markdown
    id: full-cv
    content:
      title: Full CV / Additional Information
      text: |-
        [Research records](research/) · [연구자 이력](experience/) · [All R&D projects](rd-projects/)
    design:
      columns: '1'
---
