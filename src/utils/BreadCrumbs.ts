import { NavigateFunction } from "react-router-dom";
import { BreadCrumbType } from "./Types";

export const getCreateMeetingBreadCrumbs = (
  navigate: NavigateFunction,
): Array<BreadCrumbType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
  },
];

export const getOneByOneMeetingBreadCrumbs = (
  navigate: NavigateFunction,
): Array<BreadCrumbType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    text: "Create 1 by 1 Meeting",
  },
  ];

  export const getVideoConferenceBreadCrumbs = (
  navigate: NavigateFunction,
): Array<BreadCrumbType> => [
  {
    text: "Dashboard",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "Create Meeting",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    text: "videoconference",
  },
];