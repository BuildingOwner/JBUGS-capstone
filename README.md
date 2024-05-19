<h1 align="center">
      <span>Eclass+</span>
      <span>한성대 캡스톤 팀 JBUGS</span>
</h1>
<div align="center"><h3>GPT4-turbo 기반 PDF 강의 자료와 이미지를 활용한 문제 생성 및 해설이 가능한 AI 강화 스마트 온라인 교육 플랫폼</h3></div>
<div align="center"><h3>AI-Enhanced Smart Online Education Platform Capable of Generating Questions and Explanations Using PDF Lecture Materials and Images Based on GPT4-turbo</h3></div><br>



## 🔔 작품 소개
E class+는 코로나 19 이후 대학 교육 환경에서 급속히 증가하는 블렌디드 수업과 온라인 학습의 필요성을 고려하여 개발된 혁신적인 교육 플랫폼입니다.

이 프로젝트는 한성대학교의 기존 eclass 플랫폼에서 발생한 불편함을 해소하고 학생들의 학습 경험을 향상시키기 위해 개발되었습니다.

## 🚨기존 Eclass에 대한 학생들의 불편 사항
* __메인페이지__
1. 과제 확인이 어렵다.
2. UI가 깔끔하지만 불필요한 기능이 많아보인다.
  
* __강의페이지__
1. 주차가 거듭될수록 마우스 드래그의 횟수가 늘어난다.
2. 불필요한 기능이 많아보인다.
3. 강의와 과제가 섞여 나오는 경우가 있어 불편하다.

## 📄주요 기능 및 특징

* __수업 진도율 표시__
  * E class+는 진행도를 시각적으로 표시하여 학생들이 수업 진행 상황을 한눈에 파악할 수 있도록 지원합니다. 이를 통해 개인의 학습 현황을 더욱 효과적으로 관리할 수 있습니다.

* __과제의 남은 일수 표시__
  * 프로젝트는 과제의 제출 기한을 나타내어 학생들이 어떤 과제가 더 시급하게 처리되어야 하는지 알려줍니다. 이를 통해 과제 미제출을 방지하고 학업 성취도를 높일 수 있습니다.

* __UI/UX 사용자 경험 개선__
  *  E class+는 사용자 경험을 개선하기 위한 진보된 사용자 인터페이스를 제공합니다. 직관적이고 사용하기 쉬운 디자인을 통해 학생들이 플랫폼을 보다 편리하게 이용할 수 있습니다.

* __AI 기반 강의 자료 추출 및 연습문제 생성__
  * E class+는 구글 클라우드 비전 OCR 및 구글 비디오 인텔리전스와 같은 첨단 기술을 활용하여 강의 자료를 텍스트로 추출합니다. 그 후, OpenAI GPT API를 활용하여 추출된 텍스트를 기반으로 연습 문제를 자동으로 생성합니다. 이를 통해 학생들은 수업 이해도를 높일 수 있으며, 효율적인 학습을 지원합니다.

## ✔개선된 페이지
* __메인 페이지__
<div>
 <img src="/images/메인 페이지.png" width="800"/>
 <p>
  <strong>캘린더 추가</strong> -> 날짜 확인 간편화 및 개인 일정 등록 가능
  <br> 
  <strong>미제출 과제 표시</strong> -> 미제출 과제 확인 가능
  <br> 
  <strong>미응시 퀴즈 표시</strong> -> 미응시 퀴즈 확인 가능
  <br> 
  <strong>UI 간결화</strong> -> 불필요한 기능 축소화
  </p>
</div>
<br>
<br>
 
* __강의 페이지__
<div>
<img src="/images/강의 홈.png" width="800" />
<p>
  <strong>유연한 내비게이션</strong> -> 사이드바를 통한 다양한 메뉴 접근 가능성(홈, AI 채팅, 강의 활동, Q&A 등)
  <br> 
  <strong>진도율 트래킹 및 시각화</strong> -> 강의 진행 상태를 시각적으로 표시하는 진도율 바 제공
  <br> 
  <strong>주차별 강의 내용 접근</strong> -> 중앙의 주차별 접근 바를 사용하여 각 주차의 강의 콘텐츠에 쉽게 접근
  <br>
  <strong>자료 및 과제 관리</strong> -> 강의 자료 및 과제 파일을 직관적으로 정리하고 관리, 세부 정보 표시(파일 크기, 타입, 업로드 날짜)
</p>
</div>
<br>
<br>

* __퀴즈 페이지__
<div>
<img src="./image/quiz.png" width="800" height="450" />
  <p>
  <strong>모듈을 통한 키워드 추출</strong> -> 강의 및 강의 자료 중 중요 키워드 추출
  <br> 
  <strong>추출한 키워드 퀴즈 생성</strong> -> 퀴즈 생성을 통한 개별적 학습 가능
</p>
</div>


## ⚙퀴즈 생성 모듈 구조
<div align="center">
<img src="./image/module.png" width="800" height="500" />
</div>

## 📄Domain 다이어그램
<div align="center">
<img src="./image/diagram.png"/>
</div>

## ⌨주요 적용 기술 및 특이 사항
* __개발 도구__ : Visual Studio Code, Intellij IDEA 23.2, Spring Boot, Mysql
* __개발 언어__ : HTML5, CSS3, JavaScript, Node.js, Java


## ✋개발자

|Frontend|Frontend|Backend|Module|
|------|---|---|---|
|최재완|이영재|장주찬|김정훈|
