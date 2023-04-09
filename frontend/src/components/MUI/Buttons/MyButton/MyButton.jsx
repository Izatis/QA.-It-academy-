import React from "react";
import "./MyButton.css";
import Button from "@mui/material/Button";

const MyButton = ({ children, ...props }) => {
  return (
    <Button className="my_button" {...props}>
      {children}
    </Button>
  );
};

export default MyButton;
