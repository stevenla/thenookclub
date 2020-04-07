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
import CrittersPage from "./CrittersPage";
import styles from "./App.module.css";

import Nav from "./Nav";
import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router";

export default function App() {
  return (
    <HashRouter>
      <div className={styles.root}>
        <Nav />
        <Routes>
          <Route path="/" element={<CrittersPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
