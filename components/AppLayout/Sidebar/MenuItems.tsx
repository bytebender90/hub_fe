import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import * as _ from "lodash";

const Menuitems = [

  {
    id: _.uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    id: _.uniqueId(),
    title: "Track",
    icon: IconTypography,
    href: "/track",
  },
  
];

export default Menuitems;