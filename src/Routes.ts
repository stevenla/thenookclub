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
  {
    path: "/villagers",
    page: require("./VillagersPage"),
    nav: {
      name: "Villagers",
      icon: require("./icons/VillagersIcon"),
    },
  },
  {
    path: "/flowers",
    page: require("./FlowersPage"),
    nav: {
      name: "Flowers",
      icon: require("./icons/FlowerIcon"),
    },
  },
];

export default ROUTES;
