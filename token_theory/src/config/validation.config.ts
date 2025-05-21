export const validationConfig = {
  transform: true, // 요청 데이터를 타입에 맞게 자동 변환
  whitelist: true, // DTO에 정의되지 않은 속성은 제거
  forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러 발생
};
