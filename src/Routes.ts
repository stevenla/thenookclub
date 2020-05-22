import { IconProps } from "./icons/BaseIcon";

export interface RouteConfig {
  path: string;
  page: { default: React.FunctionComponent<{}> };
  nav?: {
    color: string;
    name: string;
    icon: { default: React.FunctionComponent<IconProps> };
  };
}

const ROUTES: RouteConfig[] = [
  {
    path: "/",
    page: require("./CrittersPage"),
    nav: {
      color: "--critters",
      name: "Critters",
      icon: require("./icons/CrittersIcon"),
    },
  },
  {
    path: "/fossils",
    page: require("./FossilsPage"),
    nav: {
      color: "--fossils",
      name: "Fossils",
      icon: require("./icons/FossilIcon"),
    },
  },
  {
    path: "/villagers",
    page: require("./VillagersPage"),
    nav: {
      color: "--villagers",
      name: "Villagers",
      icon: require("./icons/VillagersIcon"),
    },
  },
];

export default ROUTES;
