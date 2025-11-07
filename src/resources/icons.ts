import { IconType } from "react-icons";

import {
  HiOutlineRocketLaunch,
  HiMiniPlusSmall
} from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  github: FaGithub,
  linkedin: FaLinkedin,
  dotsVertical: HiOutlineDotsVertical,
  miniPlus: HiMiniPlusSmall,
  trash: IoCloseOutline,
  search: IoIosSearch
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;