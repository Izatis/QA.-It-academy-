import React from "react";
import s from "./MyInput.module.scss";

const MyInput = ({ children, alt, img, classes, ...props }) => {
  return (
    <div className={s.inputBlock}>
      {children}
      <input {...props} />
    </div>
  );
};

export default MyInput;
