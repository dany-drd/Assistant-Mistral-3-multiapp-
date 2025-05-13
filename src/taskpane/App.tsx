import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { makeStyles } from "@fluentui/react-components";
import Assistant from "./pages/AI-Assistant";
import Home from "./components/Home";
const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Assistant" element={<Assistant />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
