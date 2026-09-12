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
      quick_links:
        - label: 연구자 이력 보기
          url: experience/
        - label: 연구 실적 보기
          url: research/
      research_overview:
        image:
          filename: home-research-flow.png
          alt_text: "주요 연구 개요: 저 SNR 레이다 신호 입력, 신호 검출, 제원 추정, 미확인 파형 인식, SDR 및 FPGA 시스템 구현"
    design:
      background:
        gradient_mesh:
          enable: false
      name:
        size: xs
      avatar:
        size: medium
        shape: rounded

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
      exclude_titles:
        - Carrier Frequency Estimation of Low SNR Radar Signal Based on Denoising Autoencoder and DBSCAN
      link:
        label: 전체 논문·학회 발표 보기
        url: research/

  - block: research-supporting
    id: supporting-records
    content:
      title: 수상·특허·소프트웨어
      shared_records: true

  - block: experience-capabilities
    id: capabilities
    content:
      title: 기술 스택
      shared_profile: true
      languages:
        title: 외국어 역량
        username: me

---
