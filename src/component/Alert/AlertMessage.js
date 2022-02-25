import React, { useState, useEffect } from "react";

function AlertMessage({ alert }) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHide(true);
    });

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className={hide ? "alert-message hide" : "alert-message"}>{alert}</div>
  );
}

export default AlertMessage;
