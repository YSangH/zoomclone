## ZoomClone Coding

---

![login](https://github.com/user-attachments/assets/425c2cee-788b-4dff-8ff4-3dec9c17bd36)
![dashboard](https://github.com/user-attachments/assets/ecbcdb21-c4d3-442b-9f33-90e55ea413b2)
![meeting](https://github.com/user-attachments/assets/cd7cd22a-aeba-45b7-bc21-54e05f8a4838)

## 개요

---

- 다크/라이트 테마 전환
- Firebase를 이용한 실시간 인증과 구글 로그인 기능
- React + Vite + Typescript 구성
- Elastic UI를 이용한 인터페이스
- ZegoCloud를 이용한 화상채팅
- 전체 채팅방 목록
- 자신이 생성한 채팅방 목록

## How To Use

---

```
bash
# 레포지토리 복사
$ git clone https://github.com/YSangH/zoomclone.git

# 레포지토리 경로
$ cd zoomclone

# 의존성 설치
$ npm install

# 사용한 라이브러리
react
@reduxjs/toolkit
redux
react-router-dom
firebase
vite
@elastic/eui
@elastic/datemath
@emotion/css
@emotion/react
@emotion/styled
moment
@zegocloud/zego-uikit-prebuilt

# 실행 명령어
$ npm run dev
```

# 기술스택

---

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/Firebase-%23039BE5.svg?style=for-the-badge&logo=firebase&logoColor=white">
<img src="https://img.shields.io/badge/GitHub-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Elastic%20UI-%23005571.svg?style=for-the-badge&logo=elastic&logoColor=white">
<img src="https://img.shields.io/badge/ZegoCloud-%2300B4FF.svg?style=for-the-badge&logo=Zego&logoColor=white">
<img src="https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/VS%20Code-%23007ACC.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white">
<img src="https://img.shields.io/badge/Redux-%23764ABC.svg?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/Replit-%230077B5.svg?style=for-the-badge&logo=Replit&logoColor=white">

# 폴더 구조와 기능

---

```
src
├── app	 - 재사용 가능한 컴포넌트
│    ├── slices  - 애플리케이션의 특정 상태를 관리
│    │     ├── AuthSlice.ts - 인증 상태와 테마 설정을 관리
│    │     └── MeetingSlice.ts  - Meeting 관련 알림 상태 관리
│    ├── hooks.ts   - React-Redux 커스텀 훅을 정의하는 파일
│    └── store.ts   - Redux 스토어를 설정하는 파일
│
├── assets	 - 이미지 관련 파일 모음
│
├── components	- 컴포넌트 모음
│    ├── form	-   폼 관련 컴포넌트 모음
│    │     ├── DateField.tsx    - 채팅 생성 날짜 필드 컴포넌트
│    │     ├── MeetingButton.tsx    - 채팅 버튼 컴포넌트
│    │     ├── MeetingMaximum.tsx   - 채팅 최대 인원 컴포넌트
│    │     ├── NameField.tsx    - 채팅 이름 필드 컴포넌트
│    │     └── UserField.tsx    - 유저 입력 필드 컴포넌트
│    ├── themes - 테마 관련 컴포넌트
│    │     ├── DarkTheme.tsx    - 다크 테마 컴포넌트
│    │     └── LightTheme.tsx   - 라이트 테마 컴포넌트
│    ├── EditFlyout.tsx - 채팅방 수정 컴포넌트
│    ├── Header.tsx - 헤더영역 컴포넌트
│    └── ThemeSelector.tsx  - 테마 전환 컴포넌트
│
├── hooks	- 커스텀 훅 모음
│    ├── UseAuth.tsx    - 사용자 인증 상태 관리 커스텀 훅
│    ├── UseFetchUsers.tsx  - 다른 사용자들의 데이터를 반환하는 커스텀 훅
│    └── UseToast.tsx   - 토스트 알림을 생성하고 관리하는 커스텀 훅
│
├── pages	- 전체 페이지 또는 경로
│    ├── CreateMeeting.tsx	- 채팅 생성 페이지
│    ├── Dashboard.tsx		- 컨텐츠 선택 페이지
│    ├── JoinMeeting.tsx	- 채팅 참여 페이지
│    ├── Login.tsx		- 로그인 페이지
│    ├── Meeting.tsx		- 다른 사람의 채팅 페이지
│    ├── MyMeeting.tsx	- 내가 생성했던 채팅 목록 페이지
│    ├── SingleMeeting.tsx	- 1:1 개인 채팅 생성 페이지
│    └── VideoConference.tsx	- 다중 화상 채팅 생성 페이지
│
├── utils   - 유틸 및 재사용 가능 함수 모음
│    ├── BreadCrumbs.ts - 브레드크럼 네비게이션을 설정하는 함수
│    ├── FirebaseConfig.ts  - firebase에 대한 설정
│    ├── generateMeetingId.ts   - 채팅방 생성시 해당하는 ID를 부여
│    └── Types.ts   - TypeScript 인터페이스 및 타입 선언
│
├── d.ts	- 이미지 파일 선언 및 Elastic UI의 아이콘 오류 방지 파일
├── vite-env.d.ts   - Meeting.Tsx의 import.meta.env 오류 방지 파일
├── App.tsx	- 전체 앱 컴포넌트
└── index.tsx	- 엔트리 포인트
```

# Troubleshooting

---

[click] (https://ysh0129.tistory.com/48) CommonJS (CJS) Warning
[click] (https://ysh0129.tistory.com/47) process is not defined 해결
[click] (https://ysh0129.tistory.com/42) Localhost ERR_CONNECTION_REFUSED 오류
[click] (https://ysh0129.tistory.com/36) Vite+React(npm)에서 Eui(ElasticUI) 사용 시 아이콘 불러오는 방법
