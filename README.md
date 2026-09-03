# JaeHyeok CV Website

HugoBlox Academic CV 템플릿을 기반으로 만든 개인 CV/포트폴리오 사이트입니다.

## 빠르게 수정할 곳

- `data/authors/me.yaml`: 이름, 소개, 링크, 관심 분야, 경력, 기술, 언어
- `content/_index.md`: 홈 화면 섹션과 소개 문구
- `content/experience.md`: 경험/기술 상세 페이지 구성
- `content/projects/*/index.md`: 프로젝트 카드와 상세 설명
- `static/uploads/resume.pdf`: PDF 이력서를 추가할 때 사용할 경로

## 로컬 실행

이 템플릿은 Hugo Extended와 Go가 필요합니다.

```bash
pnpm install
pnpm dev
```

정적 빌드는 아래 명령을 사용합니다.

```bash
pnpm build
```

## 원본 템플릿

- HugoBlox Academic CV: https://github.com/HugoBlox/hugo-theme-academic-cv
- HugoBlox Kit: https://github.com/HugoBlox/kit
