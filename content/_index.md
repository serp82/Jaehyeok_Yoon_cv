---
title: ''
summary: ''
date: 2026-09-11
type: landing

sections:
  - block: resume-biography-3
    content:
      username: me
      show_education: false
      show_interests: false
      text: |-
        저 SNR·비협조 수신 환경에서 약한 레이다 신호를 검출하고
        주요 제원을 추정하며, 학습되지 않은 파형을 탐지·거부하는
        AI 기반 신호처리 방법을 연구합니다.

        시간–주파수 분석과 딥러닝·Vision-Language Model을 결합하고,
        USRP 기반 OTA 실험과 RFNoC/FPGA 구현을 통해
        실제 환경에서 검증해 왔습니다.

        **연구 분야**
        - 저 SNR 레이다 신호처리
        - Open-Set Recognition
        - Vision-Language Model
        - SDR / RFNoC / FPGA
      headings:
        about: 연구 소개
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
      title: 연구 흐름
      text: 저 SNR 레이다 신호를 검출·추정하고, 미확인 파형을 판단해 실제 SDR/FPGA 시스템으로 검증합니다.
      stages:
        - eyebrow: "01 · 입력 환경"
          title: 저 SNR 레이다
          detail: "약한 비협조 신호"
        - eyebrow: "02 · 신호 검출"
          title: 신호 검출
          detail: "펄스 존재와 경계 탐지 · FPD"
        - eyebrow: "03 · 제원 추정"
          title: 제원 추정
          detail: "ToA · PW · PRI · BW · Fc · STFT · UNet · CCA"
        - eyebrow: "04 · 파형 인식"
          title: 미확인 / Open-Set
          detail: "DSAE-MAAE · Semantic VLM · SAVOR"
        - eyebrow: "05 · 시스템 구현"
          title: SDR / RFNoC / FPGA
          detail: "USRP · OTA · HLS 기반 검증"
      mission: 저 SNR 환경에서 신호를 찾아내고, 제원을 추정하고, 처음 보는 파형을 거부하며, 별도의 하드웨어 구현 연구로 실제 수신 시스템 적용 가능성을 검증했습니다.

  - block: research-projects
    id: featured-research-projects
    content:
      title: 대표 연구
      projects:
        - projects/dsae-maae
        - projects/savor-open-set
        - projects/pandas
        - projects/rfnoc-fpga

  - block: research-publications
    id: selected-publications
    content:
      title: 주요 논문
      link:
        label: 전체 논문·학회 발표 보기
        url: research/

  - block: research-additional
    id: additional-research
    content:
      title: 기타 연구
      text: |-
        대표 연구 외에 수행한 프로젝트를 공식 연구과제명으로 정리했습니다.

        - **위성신호 수집 및 분석 테스트베드** · 엘아이지넥스원 (LIG) · 2025.07.01–현재
        - **불완전 수신신호 환경에서의 신속 자동 다중표적 추적기술 연구** · 국방기술진흥연구소 · 2024.09.13–현재
        - **자율주행 자동 체화인지 및 제어 시스템을 위한 능동추론 기반의 인간형 기계학습 기술 개발** · 정보통신기획평가원 (IITP) · 2024.04.01–현재
        - **DJI OcuSync 프로토콜 기반의 OFDM 드론 신호 복조 구현** · 엘아이지넥스원 (LIG) · 2024.03.01–현재
        - **이종 신호 중첩 환경 전파식별 방법과 주파수 공유방법에 대한 평가 연구** · 한국전자통신연구원 (ETRI) · 2023.01.01–2023.12.31

        <a class="cv-text-link" href="additional-research/">추가 프로젝트 보기 <span aria-hidden="true">→</span></a>

        <a class="cv-text-link" href="rd-projects/">전체 수행 과제 보기 <span aria-hidden="true">→</span></a>
    design:
      columns: '1'

  - block: experience-capabilities
    id: capabilities
    content:
      title: 기술 스택
      skills:
        - name: Programming
          tools: 'Python · MATLAB · C/C++'
        - name: AI
          tools: 'PyTorch · TensorFlow'
        - name: SDR
          tools: 'GNU Radio · USRP'
        - name: FPGA
          tools: 'Vivado · RFNoC · HLS · Verilog HDL'
        - name: Environment
          tools: 'Linux · Docker'
      languages:
        title: 외국어 역량
        username: me
      international_experience:
        title: 해외 연구 경험
        items:
          - name: 미국 Univ. of Michigan-Dearborn 자율주행 연구실 파견
            period: 2024.10–2025.02
          - name: 인도 IIT Guwahati 연구 인턴
            period: 2020.01–2020.02

  - block: research-supporting
    id: supporting-records
    content:
      title: 수상·특허·소프트웨어
      patents:
        - title: 사람의 동작에 대한 정확한 인체 모션 감지를 위한 RGB-D 카메라 데이터와 레이더 포인트 클라우드를 활용한 스켈레톤 추출 기술
          status: 등록
          number: 등록번호 10-2842830
          date: 2025.08.01
        - title: 레이더를 통해 레이더 시스템의 간섭을 제거하는 OFDM 기반 드론 신호처리 장치 및 방법
          status: 출원
          number: 출원번호(대한민국) 10-2025-0191251
          date: 2025.12.05
        - title: 딥러닝 기반 저피탐 레이더 신호의 잡음 제거 및 파라미터 추출 방법, 이를 수행하는 장치 및 컴퓨터 프로그램
          status: 출원
          number: 출원번호(대한민국) 10-2024-0092816
          date: 2024.07.15
      software:
        - name: 파이썬 기반 Radar-Vision-Language(레이더-비전-언어) 구축
          registration: 등록번호 C-2025-005640
      awards:
        - name: ICNGC 2025 Best Paper Award
          awarder: ICNGC
          date: 2025.12.19
        - name: 한국통신학회 국내논문지 우수논문상
          awarder: 한국통신학회
          date: 2025.11.20
        - name: 제 4회 ERICA 해동창업경진대회 (대상)
          awarder: 한양대학교
          date: 2024.12.04
        - name: 2023 4D 이미징 레이다 시스템 부트캠프 (우수상)
          awarder: 한국전자파학회
          date: 2023.08.24

  - block: markdown
    id: education-cv
    content:
      title: 학력 및 CV
      text: |-
        **한양대학교 대학원 전자공학과** · 석·박사통합과정

        **한양대학교 ERICA캠퍼스 전자공학과** · 학사

        상세 경력과 GPA·전공 이수 과목은 연구자 이력에서 확인할 수 있습니다.

        <a class="cv-text-link" href="experience/">연구자 이력 보기 <span aria-hidden="true">→</span></a>
        <a class="cv-text-link" href="research/">연구 실적 보기 <span aria-hidden="true">→</span></a>
    design:
      columns: '1'
---
