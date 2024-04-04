import React, { useContext } from "react";
import UserContext from "../context/user";

const GigDisplay = (props) => {
  const userCtx = useContext(UserContext);
  return (
    <div className="col-6 gigdisplay">
      <div>accesstoken: {userCtx.accessToken}</div>
      <div>role: {userCtx.role}</div>
      <div>userId: {userCtx.userId}</div>
      <div>EntryId: {props.entryId}</div>
    </div>
  );
};

export default GigDisplay;
