---
title: ''
summary: ''
date: 2026-09-03
type: landing

sections:
  - block: resume-biography-3
    content:
      username: me
      text: |-
        한양대학교 전자공학과 지능통신시스템연구실에서 레이더 신호 처리 R&D를 수행하는 연구자입니다.
        저 SNR·저피탐 레이더 신호를 대상으로 신호처리 알고리즘, 딥러닝 모델, SDR/FPGA 기반 실환경 시스템을 개발합니다.

        **주요 R&D**
        - 저 SNR 환경 레이더 신호 검출·복원 및 제원추정
        - 레이더 신호 분류, 미확인 신호 탐지와 Vision-Language 기반 파형 인식
        - SDR/FPGA 기반 실환경 신호처리 시스템 구현
        - 이종신호 중첩·주파수 공유 환경의 전파 식별 및 간섭 제거

        **연구 성과**: 국제저널(SCI) 3편, 국내저널(KCI) 2편, 학회 9건, 특허 3건, 소프트웨어 등록 1건, 연구과제 10건
      headings:
        about: '소개'
        education: '학력'
        interests: '연구 분야'
    design:
      background:
        gradient_mesh:
          enable: false
      name:
        size: md
      avatar:
        size: medium
        shape: rounded
  - block: markdown
    content:
      title: 연구 실적 요약
      subtitle: ''
      text: |-
        **국제저널(SCI) 3편** · **국내저널(KCI) 2편** · **학회 9건** · **특허 3건** · **소프트웨어 등록 1건** · **연구과제 10건**

        레이더 신호 검출·복원·제원추정, 미확인 신호 탐지, 이종신호 중첩·주파수 공유 환경의
        전파 식별 문제를 중심으로 연구하고 있습니다.
    design:
      columns: '1'
  - block: research-highlights
    id: publications
    content:
      publications:
        block: collection
        content:
          title: 논문
          text: '총 5건 (SCI 3건, KCI 2건)'
          count: 5
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
          summary: 총 9건 (국내 6건, 해외 3건)
          items:
            - authors: 윤재혁, 서동호, 김동현, 남해운
              title: Comparison of CNN Performance According to Weight Initialization Method when Classifying Signals Through Spectrogram
              venue: 한국통신학회 동계종합학술발표회, 용평리조트
              date: 2021.02
            - authors: Jaehyeok Yoon, Hyeongyun Kim, Dongho Seo, Haewoon Nam
              title: Performance Comparison of NLOS Detection Methods in UWB
              venue: International Conference on ICT Convergence (ICTC), Jeju, Korea
              date: 2021.10
            - authors: 윤재혁, 윤우진, 김형윤, 남해운
              title: 오토엔코더 기반 미확인 저피탐 레이더 파형 탐지 기술
              venue: 한국통신학회 동계종합학술발표회, 평창 알펜시아 리조트
              date: 2022.02
            - authors: 조재연, 윤재혁, 남해운
              title: FMCW 레이더 스펙트로그램 기반 동작 인식 기법
              venue: 한국통신학회 하계종합학술발표회, 제주 그랜드하얏트호텔
              date: 2022.06
              badge:
                label: 학술논문우수상
                class: award
            - authors: 정석현, 윤재혁, 남해운
              title: Multi-Moving Average filter 기반 저피탐 레이더 신호 검출
              venue: 한국통신학회 동계종합학술발표회, 용평리조트
              date: 2023.02
            - authors: 윤재혁, 남해운
              title: LPI 레이더 중첩 신호 인지를 위한 ResNeXt 기반 다중 라벨 분류
              venue: 한국통신학회 하계종합학술발표회, 제주
              date: 2023.06
            - authors: Jaehyeok Yoon, Haewoon Nam, Jaerock Kwon
              title: Joint Recognition of LPI Radar Signals Using a VLM with TFD-Text Alignment
              venue: ICNGC, Da Nang, Vietnam
              date: 2025.12
              badge:
                label: 우수논문상
                class: award
            - authors: 윤재혁, 남해운
              title: 지도 학습 기반 CLIP을 활용한 레이더 신호 스펙트로그램 식별
              venue: 2026년도 한국통신학회 동계종합학술발표회, 용평
              date: 2026.02.04
            - authors: Jaehyeok Yoon, Haewoon Nam
              title: Cross-Resolution STFT Distillation for FPGA-Efficient Radar Waveform Classification
              venue: The 31st Asia-Pacific Conference on Communications (APCC)
              date: 2026
              badge:
                label: 발표 예정
                class: pending
  - block: research-paired-sections
    id: research-paired-sections
    content:
      patents:
        block: research-patents
        content:
          title: 특허
          summary: 총 3건
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
          title: 학업 성과
          text: |-
            - **학부 GPA**: 3.8 / 4.5 (전공 3.85)
            - **대학원 석·박사통합과정 GPA**: 4.21 / 4.5
            - **전문연구요원**: 2024년 2월 22일 – 2027년 2월 21일 (복무 종료 예정), 한양대학교 공학기술연구소
        design:
          columns: '1'
    design:
      columns: '1'
  - block: markdown
    content:
      title: 수행 과제
      text: |-
        **총 10건 · 산학 과제 3건 · 정부기관 과제 7건**

        1. **GPS 비의존적 군집 무인기용 고정밀 자율 위치 측위 기술 연구** · 책임연구원: 남해운 · 2019.11.29–2021.12.31 · 한국연구재단 (NRF) · **[연구참여]**
        2. **페이딩 기반의 전파식별 방법과 주파수 공유 방법에 대한 평가 연구** · 책임연구원: 남해운 · 2021.04.16–2021.11.30 · 한국전자통신연구원 (ETRI)
        3. **이종 신호 중첩 환경 전파식별 방법과 주파수 공유방법에 대한 평가 연구** · 책임연구원: 남해운 · 2022.01.01–2022.12.31 · 한국전자통신연구원 (ETRI)
        4. **개인화된 주행스타일 및 인지예측 기반 딥러닝 자율주행 기술 연구** · 책임연구원: 남해운 · 2022.03.01–2025.02.29 · 한국연구재단 (NRF) · **[연구참여]**
        5. **머신러닝 기반 미약신호 검출 및 제원 추정 모델 연구** · 책임연구원: 남해운 · 2022.05.01–2024.04.30 · 엘아이지넥스원 (LIG)
        6. **이종 신호 중첩 환경 전파식별 방법과 주파수 공유방법에 대한 평가 연구** · 책임연구원: 남해운 · 2023.01.01–2023.12.31 · 한국전자통신연구원 (ETRI)
        7. **DJI OcuSync 프로토콜 기반의 OFDM 드론 신호 복조 구현** · 책임연구원: 남해운 · 2024.03.01–현재 · 엘아이지넥스원 (LIG) · **[연구참여]**
        8. **자율주행 자동 체화인지 및 제어 시스템을 위한 능동추론 기반의 인간형 기계학습 기술 개발** · 책임연구원: 남해운 · 2024.04.01–현재 · 정보통신기획평가원 (IITP)
        9. **불완전 수신신호 환경에서의 신속 자동 다중표적 추적기술 연구** · 책임연구원: 최지웅 · 2024.09.13–현재 · 국방기술진흥연구소 · **[연구참여]**
        10. **위성신호 수집 및 분석 테스트베드** · 책임연구원: 남해운 · 2025.07.01–현재 · 엘아이지넥스원 (LIG) · **[연구참여]**
    design:
      columns: '1'
  - block: resume-experience
    content:
      title: 경험
      username: me
    design:
      date_format: '2006년 1월'
      is_education_first: false
  - block: collection
    id: projects
    content:
      title: 연구 프로젝트
      text: 레이더·통신 신호 처리 연구를 문제 영역별로 정리했습니다.
      filters:
        folders:
          - projects
    design:
      view: article-grid
      columns: 3
      show_date: false
      show_read_time: false
      show_read_more: false
---
