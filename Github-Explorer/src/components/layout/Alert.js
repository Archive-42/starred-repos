import React from "react";

const Alert = ({ alert }) => {
  return alert !== null && <div>{alert.message}</div>;
};

export default Alert;
