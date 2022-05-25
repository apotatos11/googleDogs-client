## GOOGLE DOGS 프로젝트(클라이언트)

### 작업물의 구조 설명(라우팅을 했다면 아래와 같은 구조였을겁니다.)

- Home
  - DocumentList
  - MyDocumentList
  - DocumentDetail(/:id)
- Login

### 과제 관련 코멘트

- 사용자 인증 및 로그인 정보는 firebase에서 관리합니다.
- 문서에 관련된 정보는 MongoDB에서 관리합니다.

(인증서버와 DB서버가 나눠져 있습니다.)

### 과제중 하지 못한 부분

- 문서별 URL 부여 실패

  - 리액트 라우터 사용을 해본적이 없어 사용에 어려움을 겪었습니다.
  - 결과적으로 처음 화면에서 로그인 여부에 따른 라우터 구성만 완료하였습니다.

- 이외에는 모든 요구 사항을 구현하였습니다.

### 라이브러리 사용 관련 코멘트

- 커서위치를 자력으로 계산하는 로직 구성에 어려움을 겪어 "textarea-caret" npm 모듈을 이용하였습니다.

- axios를 한번도 사용해본적이 없어 이번에 일부러 사용하였습니다.
- 정확하게 20초 간격으로 저장하는 기능을 구현하기 위해서 node-schedule을 사용하였습니다.

### 환경 변수 내용 정리

#### .env.development

REACT_APP_FIREBASE_API_KEY=AIzaSyAD9l6l0h2J3NB-nSsMI9nshUaT0J-0aP0
REACT_APP_FIREBASE_AUTH_DOMAIN=dogs-414ec.firebaseapp.com
REACT_APP_FIREBASE_DB_URL=https://dogs-414ec.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=dogs-414ec
REACT_APP_DOCUMENT_DB_URL=http://localhost:4000/api/document/

#### .env.production

REACT_APP_FIREBASE_API_KEY=AIzaSyAD9l6l0h2J3NB-nSsMI9nshUaT0J-0aP0
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DB_URL
REACT_APP_FIREBASE_PROJECT_ID=dogs-414ec
REACT_APP_DOCUMENT_DB_URL=http://localhost:4000/api/document/
