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
