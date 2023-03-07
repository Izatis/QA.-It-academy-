import React from "react";
import "./MyButton.css";
import Button from "@mui/material/Button";

const MyButton = ({ children, ...props }) => {
  return (
    <Button className="myButton" {...props}>
      {children}
    </Button>
  );
};

export default MyButton;
