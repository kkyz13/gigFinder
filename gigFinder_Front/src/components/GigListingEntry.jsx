import React from "react";

const GigListingEntry = () => {
  return (
    <div className="entry d-flex">
      <div>
        <img src="../img/gigimg/placeholder.jpg"></img>
      </div>
      <div className="container d-flex-column">
        <div>
          <strong>GigTitle</strong>
        </div>
        <div>Time | Date</div>
        <div className="line-clamp" style={{ Height: "100px" }}>
          I am the description that can be very long so this is delibrately
          making it long so I can see if it breaks I am the description that can
          be very long to break this line and very long shit
        </div>
      </div>
    </div>
  );
};

export default GigListingEntry;
