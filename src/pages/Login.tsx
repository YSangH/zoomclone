import React from "react";
// Elastic UI 불러오기
import {
  EuiProvider,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiButton,
} from "@elastic/eui";
// 애니메이션 경로 불러오기
import animation from '../assets/animation.gif';
// 로고 경로 불러오기
import logo from "../assets/logo.png";
// 구글 로그인 인증과 팝업
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
// 파이어베이스 인증 접근 권한
import { firebaseAuth, userRef } from "../utils/FirebaseConfig";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";

// 로그인 컴포넌트
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 현재 인증된 사용자를 확인하고, 인증되었으면 메인 페이지로 이동
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  // 구글 로그인 함수
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);
    if (email) {
      const firestoreQuery = query(userRef, where("uid", "==", uid));
      const fetchedUsers = await getDocs(firestoreQuery);
      if (fetchedUsers.docs.length === 0) {
        await addDoc(userRef, {
          uid,
          name: displayName,
          email,
        });
      }
    }
    dispatch(setUser({ uid, name: displayName, email }));
    navigate("/");
  };

  return (
    <EuiProvider colorMode="dark">
      {/* Elastic UI 로그인 영역 전체적인 틀 */}
      <EuiFlexGroup
        alignItems="center"
        justifyContent="center"
        style={{ width: "100vw", height: "100vh" }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="xl">
            <EuiFlexGroup justifyContent="center" alignItems="center">
        {/* 왼쪽 애니메이션 이미지 */}
        <EuiFlexItem>
          <EuiImage src={animation} alt="animation" />
        </EuiFlexItem>

        {/* 오른쪽 로고와 로그인 버튼 */}
        <EuiFlexItem>
          <EuiImage src={logo} alt="logo" size="230px" />
          <EuiSpacer size="xs" />
          <EuiText textAlign="center" grow={false}>
            <h3>
              <EuiTextColor>One Platform to</EuiTextColor>
              <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
            </h3>
          </EuiText>
          <EuiSpacer size="l" />
          <EuiButton fill onClick={login}>
            Login with Google
          </EuiButton>
              </EuiFlexItem>
              </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  );
};

export default Login;
