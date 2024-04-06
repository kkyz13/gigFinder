import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import UploadWidget from "./UploadWidget";

const GigCanvas = (props) => {
  //------------required----------------//
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);

  //-------------------display variables-----------------//
  const [linkUrl, setlinkUrl] = useState("");
  const titleRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const addressRef = useRef();
  // const linkRef = useRef();
  const descriptionRef = useRef();
  const [imgUrl, setImgUrl] = useState("");
  const [message, setMessage] = useState("");
  //--------------------on mount------------------------//
  const [entryId, setEntryId] = useState("");
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);

  //---date handler---//

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

  const putNewGig = async () => {
    try {
      const res = await fetchData(
        "/api/gigs/p/" + userCtx.userId,
        "PUT",
        {
          pic: imgUrl,
          title: titleRef.current.value,
          dateTimeStart: dateRef.current.value + "T" + timeRef.current.value,
          address: addressRef.current.value,
          description: descriptionRef.current.value,
          link: linkUrl,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        setMessage("Add Gig Successful!");
        props.getProviderGigs();
        newGigInit();
      } else {
        setMessage("Something wrong has happened!");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const patchNewGig = async () => {
    try {
      const res = await fetchData(
        "/api/gigs/" + props.entryId,
        "PATCH",
        {
          pic: imgUrl,
          title: titleRef.current.value,
          dateTimeStart: dateRef.current.value + "T" + timeRef.current.value,
          address: addressRef.current.value,
          description: descriptionRef.current.value,
          link: linkUrl,
        },
        userCtx.accessToken
      );
      if (res.ok) {
        setMessage("Update Gig Successful!");
        props.getProviderGigs();
      } else {
        setMessage("Something wrong has happened!");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const delGig = async () => {
    try {
      const res = await fetchData(
        "/api/gigs/" + props.entryId,
        "Delete",
        undefined,
        userCtx.accessToken
      );
      if (res.ok) {
        setMessage("Gig Deleted!");
        props.getProviderGigs();
        newGigInit();
      } else {
        setMessage("Something wrong has happened!");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const newGigInit = () => {
    setMessage("You are making a new Gig");
    setIsLoaded(false);
    setEntryId("");
    console.log("initializing new Gig");
    setImgUrl("../img/gigimg/placeholder.jpg");
    titleRef.current.value = "";
    dateRef.current.value = "";
    timeRef.current.value = "";
    addressRef.current.value = "";
    descriptionRef.current.value = "";
    setlinkUrl("");
  };

  useEffect(() => {
    newGigInit();
  }, []);
  useEffect(() => {
    if (props.entryId) {
      console.log("loading Gig");
      loadGigDetails(props.entryId).then(() => {
        setIsLoaded(true);
      });
    }
  }, [props.entryId]);

  useEffect(() => {
    if (isLoaded) {
      setEntryId(props.entryId);
      setMessage("You are updating a gig");
      setImgUrl(data.pic);
      titleRef.current.value = data.title;
      // authorRef.current.value = data.author.name;
      const d = new Date(data.dateTimeStart);

      dateRef.current.value = d.toISOString().slice(0, 10);
      timeRef.current.value = d.toLocaleTimeString([], {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      console.log(dateRef.current.value);
      console.log(timeRef.current.value);
      if (data.address !== "") {
        addressRef.current.value = data.address;
      } else {
        addressRef.current.value = "";
      }
      if (data.link !== "") {
        setlinkUrl(data.link);
      } else {
      }
      descriptionRef.current.value = data.description;
    }
  }, [isLoaded]);

  return (
    <div className="col-6 gigcanvas">
      {userCtx.role === "provider" && (
        <button
          onClick={() => {
            newGigInit();
          }}
          className="newgigbtn"
        >
          +
        </button>
      )}

      <div className="detail container row mt-1">
        <div className="col-4">
          <img
            className="img-thumbnail rounded float-start"
            src={`${imgUrl}`}
          ></img>
          <UploadWidget setImgUrl={setImgUrl}></UploadWidget>
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
            value={linkUrl}
            onChange={(e) => {
              setlinkUrl(e.target.value);
            }}
            className="w-75"
            type="text"
            placeholder="no link provided"
          ></input>
          <button disabled={linkUrl === "" ? true : false} className="">
            Test link
          </button>
        </div>
        {entryId === "" ? (
          <div className="container centered">
            <button
              className="putgigbtn"
              onClick={() => {
                putNewGig();
              }}
            >
              Add New Gig
            </button>
          </div>
        ) : (
          <div className="container d-flex justify-content-end">
            <button
              className="patchgigbtn"
              onClick={() => {
                patchNewGig();
              }}
            >
              Update Gig
            </button>
            <button
              className="delgigbtn"
              onClick={() => {
                delGig();
              }}
            >
              Delete Gig
            </button>
          </div>
        )}
      </div>
      <div className="centered">{message}</div>
      {isLoaded ? (
        <>
          <div className="d-flex interest container">
            {data.interestUserList.length}{" "}
            {data.interestUserList.length === 1 ? "person " : "people "}
            interested!
          </div>
          <div className="d-flex subscribe container">
            {data.subscribeUserList.length}{" "}
            {data.subscribeUserList.length === 1 ? "person " : "people "}
            going!
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default GigCanvas;
