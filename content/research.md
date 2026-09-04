---
title: '연구실적'
date: 2026-09-04
type: landing

design:
  spacing: '5rem'

sections:
  - block: markdown
    content:
      title: 주요 연구분야
      text: |-
        **전공분야: 레이더 신호 처리**

        레이더와 통신 신호를 실제 무선 환경에서 분석하고, 신호처리·딥러닝·SDR/FPGA 기술을 연결해 연구개발합니다.

        1. **저 SNR 환경의 레이더 신호 검출·복원 및 제원추정**: 저피탐(LPI) 파형 검출·제원 추정, 잡음 제거, 신호 복원, SDR/FPGA 기반 실환경 신호처리 시스템
        2. **레이더 신호 분류 및 미확인 신호 탐지**: 딥러닝 기반 레이더 파형 분류, 비지도 학습 기반 미확인 신호 탐지, Vision-Language 기반 미확인 파형 인식, SDR/FPGA 기반 구현
        3. **이종신호 중첩·주파수 공유 환경의 전파 식별**: 주파수 공유 환경 신호 식별, 중첩신호 인지 및 간섭 신호 제거, 전파 식별·주파수 공유 평가 체계 설계
  - block: research-highlights
    id: research-publications
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
        block: markdown
        content:
          title: 학회 발표
          text: |-
            **총 7건 (국내 5건, 해외 2건)**

            - 윤재혁, 서동호, 김동현, 남해운, “Comparison of CNN Performance According to Weight Initialization Method when Classifying Signals Through Spectrogram,” 한국통신학회 동계종합학술발표회, 용평리조트, 2021.02
            - Jaehyeok Yoon, Hyeongyun Kim, Dongho Seo, Haewoon Nam, “Performance Comparison of NLOS Detection Methods in UWB,” International Conference on ICT Convergence (ICTC), Jeju, Korea, 2021.10
            - 윤재혁, 윤우진, 김형윤, 남해운, “오토엔코더 기반 미확인 저피탐 레이더 파형 탐지 기술,” 한국통신학회 동계종합학술발표회, 평창 알펜시아 리조트, 2022.02
            - 조재연, 윤재혁, 남해운, “FMCW 레이더 스펙트로그램 기반 동작 인식 기법,” 한국통신학회 하계종합학술발표회, 제주 그랜드하얏트호텔, 2022.06 · 학술논문우수상
            - 정석현, 윤재혁, 남해운, “Multi-Moving Average filter 기반 저피탐 레이더 신호 검출,” 한국통신학회 동계종합학술발표회, 용평리조트, 2023.02
            - 윤재혁, 남해운, “LPI 레이더 중첩 신호 인지를 위한 ResNeXt 기반 다중 라벨 분류,” 한국통신학회 하계종합학술발표회, 제주, 2023.06
            - Jaehyeok Yoon, Haewoon Nam, Jaerock Kwon, “Joint Recognition of LPI Radar Signals Using a VLM with TFD-Text Alignment,” ICNGC, Da Nang, Vietnam, 2025.12 · 우수논문상
        design:
          columns: '1'
  - block: research-paired-sections
    id: research-paired-sections
    content:
      patents:
        block: markdown
        content:
          title: 특허
          text: |-
            **총 3건 (출원 2건, 등록 1건)**

            - 사람의 동작에 대한 정확한 인체 모션 감지를 위한 RGB-D 카메라 데이터와 레이더 포인트 클라우드를 활용한 스켈레톤 추출 기술, 등록번호 10-2842830, 2025.08.01
            - 딥러닝 기반 저피탐 레이더 신호의 잡음 제거 및 파라미터 추출 방법, 이를 수행하는 장치 및 컴퓨터 프로그램, 출원번호(대한민국) 10-2024-0092816, 2024.07.15
            - 레이더를 통해 레이더 시스템의 간섭을 제거하는 OFDM 기반 드론 신호처리 장치 및 방법, 출원번호(대한민국) 10-2025-0191251, 2025.12.05
        design:
          columns: '1'
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
---
