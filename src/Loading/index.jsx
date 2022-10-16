import { useSelector } from "react-redux";
import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";

const Loading = () => {
  const loading = useSelector((state) => state.app.loading);
  if (loading > 0) {
    return (
      <LinearProgress
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
        }}
        color="success"
      />
    );
  }
  return null;
};
export default Loading;
