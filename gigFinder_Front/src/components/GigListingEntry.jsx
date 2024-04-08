import React, { useContext } from "react";
import UserContext from "../context/user";

const GigListingEntry = (props) => {
  //------------required----------------//
  const userCtx = useContext(UserContext);

  const d = new Date(props.dateTime);

  const isInterested = props.interestList.includes(userCtx.userId);
  const isSubscribed = props.subscribeList.includes(userCtx.userId);
  const handleGigSelect = (e) => {
    // e.target.classList.add("selected");
    props.setGigSelect(props.id);
  };
  return (
    <div
      className="entry d-flex"
      onClick={(e) => {
        handleGigSelect(e);
      }}
    >
      <div>
        <img src={`${props.pic}` || `../img/gigimg/placeholder.jpg`}></img>
      </div>
      <div className="container d-flex-column">
        <div>
          <div className="d-flex justify-content-between">
            <strong>{props.title}</strong>
            <div className="useris">
              {userCtx.role === "provider" &&
                `${props.interestList.length}⭐ | ${props.subscribeList.length}✅`}
              {isInterested && `⭐`}
              {isSubscribed && `✅`}
            </div>
          </div>
        </div>
        <div>
          {new Intl.DateTimeFormat("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
            timeZone: "Asia/Singapore",
          }).format(d)}
        </div>
        {/* <div>{d.toLocaleString("en-SG", { timeZone: "Asia/Singapore" })}</div> */}
        <div className="description line-clamp" style={{ Height: "100px" }}>
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default GigListingEntry;
