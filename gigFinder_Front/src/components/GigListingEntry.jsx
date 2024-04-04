import React from "react";

const GigListingEntry = (props) => {
  const d = new Date(props.dateTime);
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
          <strong>{props.title}</strong>
        </div>
        <div>{d.toLocaleString("en-SG", { timeZone: "Asia/Singapore" })}</div>
        <div className="line-clamp" style={{ Height: "100px" }}>
          {props.description}
        </div>
      </div>
    </div>
  );
};

export default GigListingEntry;
