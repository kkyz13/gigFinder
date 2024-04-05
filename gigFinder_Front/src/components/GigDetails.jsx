import React, { useContext } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const GigDisplay = (props) => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const loadGigDetails = () => {
    if (props.entryId) {
      // const res = await FetchData()
    }
  };
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
