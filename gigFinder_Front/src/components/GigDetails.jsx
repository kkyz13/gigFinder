import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const GigDisplay = (props) => {
  const [debug, showDebug] = useState(false);
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  const [noLink, setNoLink] = useState(false);
  const titleRef = useRef();
  const authorRef = useRef();
  const dateRef = useRef();
  const addressRef = useRef();
  const linkRef = useRef();
  const descriptionRef = useRef();
  const [interestUserArr, setInterestUserArr] = useState([]);
  const [subscribeUserArr, setSubscribeUserArr] = useState([]);

  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const loadGigDetails = async (id) => {
    setIsLoaded(false);
    console.log("attempting to load 1 gig");
    try {
      if (props.entryId.length > 1) {
        const res = await fetchData(
          "/api/gigs/" + id,
          "POST",
          undefined,
          userCtx.accessToken
        );
        if (res.ok) {
          const data = await res.data;
          console.log(data);
          setData(data);
        }
      }
    } catch (error) {
      console.log("failed to load 1 gig");
      console.log(error);
    }
  };

  //useEffect here ensures loadGigDetails only fires off when props.entryId has a change
  useEffect(() => {
    if (props.entryId) {
      loadGigDetails(props.entryId).then(() => {
        setIsLoaded(true);
      });
    }
  }, [props.entryId]);
  //and this waits for IsLoaded to be true to assign all the necessary value for display
  useEffect(() => {
    if (isLoaded) {
      titleRef.current.value = data.title;
      // authorRef.current.value = data.author.name;
      const d = new Date(data.dateTimeStart);
      console.log(d);
      console.log(d.toISOString());
      dateRef.current.value = d.toISOString().slice(0, 10);
      if (data.address !== "") {
        addressRef.current.value = data.address;
      } else {
        addressRef.current.value = "";
      }
      if (data.link !== "") {
        linkRef.current.value = data.link;
        setNoLink(false);
      } else {
        linkRef.current.value = "";
        setNoLink(true);
      }
      descriptionRef.current.value = data.description;
    }
  }, [isLoaded]);

  return (
    <div className="col-6 gigdisplay">
      <button
        onClick={() => {
          showDebug(true);
        }}
      >
        debug
      </button>
      {debug && (
        <>
          <div>accesstoken: {userCtx.accessToken}</div>
          <div>role: {userCtx.role}</div>
          <div>userId: {userCtx.userId}</div>
          <div>EntryId: {props.entryId}</div>
        </>
      )}
      {/* Actual display portion start here: */}
      {data && (
        <div className="detail container">
          <div>
            <img
              className="img-thumbnail rounded float-start"
              src={`${data.pic}`}
            ></img>
          </div>
          <div className="">
            <input
              ref={titleRef}
              className="w-50"
              type="text"
              placeholder="title"
            ></input>
            <textarea
              ref={descriptionRef}
              className="w-50"
              rows={5}
              placeholder="description"
            ></textarea>
            <input ref={dateRef} className="w-50" type="date"></input>
            <input
              ref={addressRef}
              className="w-50"
              type="text"
              placeholder="no location provided"
            ></input>
            <input
              ref={linkRef}
              className="w-75"
              type="text"
              placeholder="no link provided"
            ></input>
            <button disabled={noLink}>open link</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GigDisplay;
