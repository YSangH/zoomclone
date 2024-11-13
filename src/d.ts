// 이미지 파일 선언을 위한 ts파일
  declare module "*.gif" {
    const value: string;
  }
  
  declare module "*.png" {
    const value: string;
  }

  declare module "*.svg" {
    const content: any;
  }
  
  // SingleMeeting.tsx import 경로 오류인식 해결코드
  declare module '@elastic/eui/es/components/icon/assets/calendar';
  declare module '@elastic/eui/es/components/icon/assets/arrow_down';
  declare module '@elastic/eui/es/components/icon/assets/sortLeft';
  declare module '@elastic/eui/es/components/icon/assets/sortRight';
  declare module '@elastic/eui/es/components/icon/assets/warning';
  declare module '@elastic/eui/es/components/icon/assets/empty';
  declare module '@elastic/eui/es/components/icon/assets/cross';
  declare module '@elastic/eui/es/components/icon/assets/copy';
  declare module '@elastic/eui/es/components/icon/icon';