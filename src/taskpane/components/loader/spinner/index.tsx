import React from "react";
import { Spinner, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  loaderoverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "whitesmoke",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    opacity: ".7",
    zIndex: "10099",
  },
});
const SpinnerLoader = () => {
  const styles = useStyles();

  return (
    <div>
      <div className={styles.loaderoverlay}>
        <Spinner size="extra-large" />
        <p
          style={{
            fontWeight: "bold",
            color: "black",
          }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default SpinnerLoader;
