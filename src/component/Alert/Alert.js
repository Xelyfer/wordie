import React from "react";
import "./Alert.css";

import AlertMessage from "./AlertMessage";

function Alert({ alerts }) {
  return (
    <div className="alert-container">
      {alerts.map((alert, index) => {
        return <AlertMessage alert={alert} key={index} />;
      })}
    </div>
  );
}

export default Alert;
