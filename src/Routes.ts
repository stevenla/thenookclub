import { IconProps } from "./icons/BaseIcon";

interface RouteConfig {
  path: string;
  page: { default: React.FunctionComponent<{}> };
  nav?: {
    name: string;
    icon: { default: React.FunctionComponent<IconProps> };
  };
}

const ROUTES: RouteConfig[] = [
  {
    path: "/",
    page: require("./CrittersPage"),
    nav: {
      name: "Critters",
      icon: require("./icons/CrittersIcon"),
    },
  },
  {
    path: "/fossils",
    page: require("./FossilsPage"),
    nav: {
      name: "Fossils",
      icon: require("./icons/FossilIcon"),
    },
  },
];

export default ROUTES;
