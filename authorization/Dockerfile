# node 20버전 먼저 설치
FROM node:20-alpine AS builder
# app 폴더 생성 후 들어가기
WORKDIR /app
# package를 app 폴더에 복사
COPY package*.json ./
# 라이브러리 설치
RUN npm install
# 모든 파일을 app 폴더에 복사
COPY . .
# 빌드화
RUN npm run build

# 실행문
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
# 위에 빌드한 결과에 있는 dist를 현재 ./dist에 복사(없으면 알아서 만들어줌)
COPY --from=builder /app/dist ./dist
# 포트번호 3000번 열어줌
EXPOSE 3000
# 컨테이너 시작 커맨드
CMD ["npm","run","start:prod"]
