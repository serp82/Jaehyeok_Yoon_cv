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
      title: 주요 연구 개요
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
      image:
        filename: home-research-flow.png
        alt_text: "주요 연구 개요: 저 SNR 레이다 신호 입력, 신호 검출, 제원 추정, 미확인 파형 인식, SDR 및 FPGA 시스템 구현"
        caption: "레이더 신호처리 연구의 전체 개요: 저 SNR 수신부터 신호 검출·제원 추정·파형 인식·시스템 구현까지"

  - block: research-projects
    id: core-research-projects
    content:
      shared_group: core
      show_images: true

  - block: research-projects
    id: extended-research-projects
    content:
      shared_group: extended

  - block: research-publications
    id: selected-publications
    content:
      title: 주요 논문
      link:
        label: 전체 논문·학회 발표 보기
        url: research/

  - block: experience-capabilities
    id: capabilities
    content:
      title: 기술 스택
      shared_profile: true
      languages:
        title: 외국어 역량
        username: me

  - block: research-supporting
    id: supporting-records
    content:
      title: 수상·특허·소프트웨어
      shared_records: true

  - block: markdown
    id: education-cv
    content:
      title: 학력 및 CV
      text: |-
        **한양대학교 대학원 전자공학과** · 석·박사통합과정

        **한양대학교 ERICA캠퍼스 전자공학과** · 학사

        <a class="cv-text-link" href="experience/">연구자 이력 보기 <span aria-hidden="true">→</span></a>
        <a class="cv-text-link" href="research/">연구 실적 보기 <span aria-hidden="true">→</span></a>
    design:
      columns: '1'
---
