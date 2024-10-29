// 이미지 파일 선언을 위한 ts파일
  declare module "*.gif" {
    const value: string;
    export default value;
  }
  
  declare module "*.png" {
    const value: string;
    export default value;
  }

  declare module "*.svg" {
    const content: any;
    export default content;
  }
  
  // SingleMeeting.tsx import 경로 오류인식 해결코드
  declare module '@elastic/eui/es/components/icon/assets/calendar';
  declare module '@elastic/eui/es/components/icon/assets/arrow_down';
  declare module '@elastic/eui/es/components/icon/assets/sortLeft';
  declare module '@elastic/eui/es/components/icon/assets/sortRight';
  declare module '@elastic/eui/es/components/icon/icon';