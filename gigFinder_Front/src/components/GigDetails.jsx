import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import ProviderProfileModal from "./ProviderProfileModal";

const GigDisplay = (props) => {
  //------------required----------------//
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  //-------------------display variables-----------------//
  const [noLink, setNoLink] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showProviderProfForUser, setShowProviderProfForUser] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const titleRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const addressRef = useRef();
  const linkRef = useRef();
  const descriptionRef = useRef();

  //--------------------on mount------------------------//
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  const loadGigDetails = async (id) => {
    setFirstLoad(true);
    setIsLoaded(false);
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
          setData(data);
          setIsLoaded(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const putInterest = async () => {
    try {
      const res = await fetchData(
        "/api/gigs/usermod/" + props.entryId,
        "PUT",
        {
          access: userCtx.accessToken,
          id: userCtx.userId,
          list: "interestUserList",
        },
        userCtx.accessToken
      );
      if (res.ok) {
        loadGigDetails(props.entryId);
        console.log("successful PUT");
        setIsInterested(true);
        props.allGigsGet();
      }
    } catch (error) {
      console.log("failed to register interest");
      console.log(error);
    }
  };

  const delInterest = async () => {
    try {
      const res = await fetchData(
        "/api/gigs/usermod/" + props.entryId,
        "DELETE",
        {
          access: userCtx.accessToken,
          id: userCtx.userId,
          list: "interestUserList",
        },
        userCtx.accessToken
      );
      if (res.ok) {
        loadGigDetails(props.entryId);
        console.log("successful DELETE");
        setIsInterested(false);
        props.allGigsGet();
      }
    } catch (error) {
      console.log("failed to remove interest");
      console.log(error);
    }
  };

  const putSubscribe = async () => {
    try {
      const res = await fetchData(
        "/api/gigs/usermod/" + props.entryId,
        "PUT",
        {
          access: userCtx.accessToken,
          id: userCtx.userId,
          list: "subscribeUserList",
        },
        userCtx.accessToken
      );
      if (res.ok) {
        loadGigDetails(props.entryId);
        console.log("successful PUT");
        setIsSubscribed(true);
        props.allGigsGet();
      }
    } catch (error) {
      console.log("failed to subscribe");
      console.log(error);
    }
  };

  const delSubscribe = async () => {
    try {
      const res = await fetchData(
        "/api/gigs/usermod/" + props.entryId,
        "DELETE",
        {
          access: userCtx.accessToken,
          id: userCtx.userId,
          list: "subscribeUserList",
        },
        userCtx.accessToken
      );
      if (res.ok) {
        loadGigDetails(props.entryId);
        console.log("successful DEL");
        setIsSubscribed(false);
        props.allGigsGet();
      }
    } catch (error) {
      console.log("failed to unsubscribe");
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
      dateRef.current.value = d.toISOString().slice(0, 10);
      timeRef.current.value = d.toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
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

      //check if user is already inside the interest/subscribe list
      if (data.interestUserList.includes(userCtx.userId)) {
        setIsInterested(true);
      } else {
        setIsInterested(false);
      }
      if (data.subscribeUserList.includes(userCtx.userId)) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    }
  }, [isLoaded]);
  //---------------------------------RENDER BLOCK--------------------------------------------------//
  return (
    <div className="col-6 gigdisplay">
      {showProviderProfForUser && (
        <ProviderProfileModal
          // id={props.id}
          // name={props.name}
          // bio={props.bio}
          // phoneNumber={props.phoneNumber}
          // email={props.email}

          handleLogOut={props.handleLogOut}
          // setShowUserProf={props.setShowUserProf}
          setGigSelect={props.setGigSelect}
          setShowProviderProfForUser={setShowProviderProfForUser}
          updateDisabled={updateDisabled}
        ></ProviderProfileModal>
      )}

      {firstLoad ? (
        isLoaded ? (
          ""
        ) : (
          <div className="centered display-6">Loading...</div>
        )
      ) : (
        <div className="centered display-6">{`No gig selected. :(`}</div>
      )}
      {isLoaded ? (
        <div className="detail container row mt-1">
          <div className="col-4">
            <img
              className="img-thumbnail rounded float-start"
              src={`${data.pic}`}
            ></img>
          </div>
          <div className="col-8">
            <input
              readOnly={userCtx.role === "user" ? true : false}
              ref={titleRef}
              className="w-100"
              type="text"
              style={{ fontWeight: "bold" }}
              placeholder="title"
            ></input>
            <textarea
              readOnly={userCtx.role === "user" ? true : false}
              ref={descriptionRef}
              className="w-100"
              rows={6}
              placeholder="description"
            ></textarea>
            <div>
              <input
                readOnly={userCtx.role === "user" ? true : false}
                ref={dateRef}
                className="g-0"
                type="date"
              ></input>
              <input
                readOnly={userCtx.role === "user" ? true : false}
                ref={timeRef}
                className="g-0"
                type="time"
              ></input>
            </div>
            <input
              readOnly={userCtx.role === "user" ? true : false}
              ref={addressRef}
              className="w-100"
              type="text"
              placeholder="no location provided"
            ></input>
            <input
              readOnly={userCtx.role === "user" ? true : false}
              ref={linkRef}
              className="w-75"
              type="text"
              placeholder="no link provided"
            ></input>
            <button disabled={noLink} className="">
              open link
            </button>
          </div>
          <div className="authorbio">
            About the organizer:
            <div className="container">
              <p>
                Name: <strong>{data.author.name}</strong>
              </p>
              <p>email: {data.author.email}</p>
              <p>
                Contact: <u>{data.author.phoneNumber}</u>
              </p>
              <p>Bio:</p>{" "}
              <div className="d-inline-flex">{data.author.biography}</div>
              <button
                className="seeMoreButton"
                onClick={() => {
                  console.log(data.author._id);
                  userCtx.setProviderId(data.author._id);
                  setShowProviderProfForUser(true);
                  setUpdateDisabled(true);
                }}
              >
                See more
              </button>
            </div>
          </div>
          <div className="d-flex interest container">
            {data.interestUserList.length} number of people are interested!
            {isInterested ? (
              <button
                className="interestbtn"
                onClick={() => {
                  delInterest();
                }}
              >
                Remove interest
              </button>
            ) : (
              <button
                className="interestbtn"
                onClick={() => {
                  putInterest();
                }}
              >
                I'm Interested!
              </button>
            )}
          </div>
          <div className="d-flex subscribe container">
            {data.subscribeUserList.length} number of people are going!
            {isSubscribed ? (
              <button
                className="subscribebtn"
                onClick={() => {
                  delSubscribe();
                }}
              >
                I don't wanna go
              </button>
            ) : (
              <button
                className="subscribebtn"
                onClick={() => {
                  putSubscribe();
                }}
              >
                I'm going!
              </button>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GigDisplay;
