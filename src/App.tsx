// import React from "react";
// import CrittersPage from "./CrittersPage";
// import styles from "./App.module.css";

// export default function App() {
//   return (
//     <div className={styles.root}>
//       <CrittersPage />
//     </div>
//   );
// }

import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

import styles from "./App.module.css";
import Nav from "./Nav";
import ROUTES from "./Routes";

export default function App() {
  return (
    <HashRouter>
      <div className={styles.root}>
        <Nav />
        <Routes>
          {ROUTES.map((routeConfig) => {
            const Page = routeConfig.page.default;
            return (
              <Route
                key={routeConfig.path}
                path={routeConfig.path}
                element={<Page />}
              />
            );
          })}
        </Routes>
      </div>
    </HashRouter>
  );
}
