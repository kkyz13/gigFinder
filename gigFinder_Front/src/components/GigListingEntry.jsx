import React from "react";

const GigListingEntry = (props) => {
  const d = new Date(props.dateTime);
  const handleGigSelect = () => {
    console.log("click!");
    props.setGigSelect(props.id);
  };
  return (
    <div
      className="entry d-flex"
      onClick={() => {
        console.log("CLICKSSSS!");
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
        <button
          onClick={() => {
            console.log("button clicked");
          }}
        >
          help me
        </button>
      </div>
    </div>
  );
};

export default GigListingEntry;
