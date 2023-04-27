import React from "react";
import s from "./MyButton.module.scss";
import Button from "@mui/material/Button";

const MyButton = ({ children, ...props }) => {
  return (
    <Button {...props}>
      {children}
    </Button>
  );
};

export default MyButton;
