import React, { useContext } from "react";
import UserContext from "../context/user";

const GigDisplay = () => {
  const userCtx = useContext(UserContext);
  return (
    <div className="col-6 eventdisplay">
      <div>accesstoken: {userCtx.accessToken}</div>
      <div>role: {userCtx.role}</div>
      <div>userId: {userCtx.userId}</div>
    </div>
  );
};

export default GigDisplay;
