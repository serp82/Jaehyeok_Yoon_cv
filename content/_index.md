---
title: ''
summary: ''
date: 2026-09-03
type: landing

sections:
  - block: resume-biography-3
    content:
      username: me
      text: '문제 정의부터 화면 구현까지, 읽기 쉬운 구조와 안정적인 사용자 경험을 우선하는 개발자입니다.'
      headings:
        about: 'Profile'
        education: 'Education'
        interests: 'Focus'
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
      title: '채용 포커스'
      subtitle: ''
      text: |-
        - **명확한 UI 구현**: 화면의 목적과 사용자 흐름을 먼저 정리하고, 필요한 인터랙션을 단순하고 견고하게 만듭니다.
        - **유지보수 가능한 구조**: 콘텐츠와 설정을 분리해 이력, 프로젝트, 링크를 빠르게 갱신할 수 있게 구성합니다.
        - **실행 중심의 문서화**: 프로젝트에서 맡은 역할, 선택한 기술, 결과를 짧고 구체적으로 남기는 방식을 선호합니다.
    design:
      columns: '1'
  - block: resume-experience
    content:
      username: me
    design:
      date_format: '2006년 1월'
      is_education_first: false
  - block: collection
    id: projects
    content:
      title: 대표 프로젝트
      text: 문제와 역할, 구현 결과를 중심으로 정리한 작업입니다.
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
