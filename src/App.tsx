import React from "react";
import CrittersPage from "./CrittersPage";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.root}>
      <CrittersPage />
    </div>
  );
}

// import React from "react";
// import styles from "./App.module.css";

// import Nav from "./Nav";
// import { HashRouter } from "react-router-dom";
// import { Routes, Route } from "react-router";
// import { IconProps } from "./icons/BaseIcon";

// interface RouteConfig {
//   path: string;
//   page: { default: React.FunctionComponent<{}> };
//   nav?: {
//     name: string;
//     icon: { default: React.FunctionComponent<IconProps> };
//   };
// }

// export const ROUTES: RouteConfig[] = [
//   {
//     path: "/",
//     page: require("./CrittersPage"),
//     nav: {
//       name: "Critters",
//       icon: require("./icons/CrittersIcon"),
//     },
//   },
//   {
//     path: "/fossils",
//     page: require("./FossilsPage"),
//     nav: {
//       name: "Fossils",
//       icon: require("./icons/FossilIcon"),
//     },
//   },
// ];

// export default function App() {
//   return (
//     <HashRouter>
//       <div className={styles.root}>
//         <Nav />
//         <Routes>
//           {ROUTES.map((routeConfig) => {
//             const Page = routeConfig.page.default;
//             return (
//               <Route
//                 key={routeConfig.path}
//                 path={routeConfig.path}
//                 element={<Page />}
//               />
//             );
//           })}
//         </Routes>
//       </div>
//     </HashRouter>
//   );
// }
