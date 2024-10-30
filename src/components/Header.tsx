import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useDispatch } from "react-redux";
import {
  EuiHeader,
  EuiText,
  EuiTextColor,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon,
} from "@elastic/eui";
import { signOut } from "firebase/auth";
import lock from "../assets/lock.svg";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";
import { changeTheme } from "../app/slices/AuthSlice";
import { getCreateMeetingBreadCrumbs, getMymeetingsBreadCrumbs, getOneByOneMeetingBreadCrumbs, getVideoConferenceBreadCrumbs } from "../utils/BreadCrumbs";
import { firebaseAuth } from "../utils/FirebaseConfig";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = useAppSelector((zoom) => zoom.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState([{ text: "Dashboard" }]);
  const [isResponsive, setIsResponsive] = useState(false);
  const dispatch = useDispatch();

  const logout = () => {
    signOut(firebaseAuth);
  };

  useEffect(() => {
    const { pathname } = location;
    if (pathname === "/create")
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate));
    else if (pathname === "/1by1")
      setBreadCrumbs(getOneByOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/videoconference")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings")
      setBreadCrumbs(getMymeetingsBreadCrumbs(navigate));
  }, [location, navigate]);

  // 테마 라이트 다크모드 전환
  const invertTheme = () => {
    const theme = localStorage.getItem("zoom-theme");
    localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      dispatch(changeTheme({ isDarkTheme: theme === "dark" }));
    }
  }, []);

  const section = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    {
      items: [
        <>
          {username ? (
            <EuiText>
              <h3>
                <EuiTextColor color="white">Hello, </EuiTextColor>
                <EuiTextColor color="#0b5cff">{username}</EuiTextColor>
              </h3>
            </EuiText>
          ) : null}
        </>,
      ],
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType={sun}
                display="fill"
                aria-label="invert-button"
                color="warning"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType={moon}
                display="fill"
                aria-label="invert-button"
                color="text"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              onClick={logout}
              iconType={lock}
              display="fill"
              aria-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];

  const responsiveSection = [
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
  ];

  useEffect(() => {
    if (window.innerWidth < 480) setIsResponsive(true);
  }, []);

  return (
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[
          {
            breadcrumbs: breadCrumbs,
          },
        ]}
      />
    </>
  );
}

export default Header;
