import React from "react";
import CrittersPage from "./CrittersPage";
import styles from "./App.module.css";
// import Nav from "./Nav";

export default function App() {
  return (
    <div className={styles.root}>
      {/* <Nav /> */}
      <CrittersPage />
    </div>
  );
}
