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
import { IoCloseOutline, IoPerson } from "react-icons/io5";
import { IoIosSearch, IoIosCheckmarkCircleOutline } from "react-icons/io";
export const iconLibrary: Record<string, IconType> = {
  rocket: HiOutlineRocketLaunch,
  github: FaGithub,
  linkedin: FaLinkedin,
  dotsVertical: HiOutlineDotsVertical,
  miniPlus: HiMiniPlusSmall,
  trash: IoCloseOutline,
  search: IoIosSearch,
  check: IoIosCheckmarkCircleOutline,
  person: IoPerson,
};

export type IconLibrary = typeof iconLibrary;
export type IconName = keyof IconLibrary;